"""IPython extension: a %%cpp cell magic that compiles the cell with g++ and runs it.

Lets one Python notebook mix Python and C++ cells. Loaded automatically by the
"blog" kernel (see tools/nb setup); elsewhere run `%load_ext cppmagic`.

    %%cpp                      # defaults: -std=c++20 -O2 -Wall
    %%cpp -O0 -g -fsanitize=address
    %%cpp -lgmp -- 10 20       # flags, then program arguments after --
"""

import os
import shlex
import subprocess
import sys
import tempfile

DEFAULT_FLAGS = ["-std=c++20", "-O2", "-Wall"]


def _split(line):
    args = shlex.split(line)
    if "--" in args:
        i = args.index("--")
        return args[:i], args[i + 1 :]
    return args, []


def cpp(line, cell):
    flags, prog_args = _split(line)
    if not any(f.startswith("-std=") for f in flags):
        flags.insert(0, DEFAULT_FLAGS[0])
    if not any(f.startswith("-O") for f in flags):
        flags.insert(1, DEFAULT_FLAGS[1])
    if "-Wall" not in flags and "-w" not in flags:
        flags.append("-Wall")

    with tempfile.TemporaryDirectory(prefix="cppcell-") as d:
        src = os.path.join(d, "cell.cpp")
        exe = os.path.join(d, "cell")
        with open(src, "w") as f:
            f.write(cell)
        # Libraries (-lfoo) must follow the source file, so flags go last.
        r = subprocess.run(["g++", src, "-o", exe, *flags], capture_output=True, text=True)
        diag = r.stderr.replace(src, "cell.cpp")
        if r.returncode != 0:
            sys.stderr.write(diag)
            return
        if diag:
            sys.stderr.write(diag)

        p = subprocess.Popen([exe, *prog_args], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        for out_line in p.stdout:
            sys.stdout.write(out_line)
        err = p.stderr.read()
        p.wait()
        if err:
            sys.stderr.write(err)
        if p.returncode != 0:
            sys.stderr.write(f"[exit code {p.returncode}]\n")


def load_ipython_extension(ipython):
    ipython.register_magic_function(cpp, "cell", "cpp")

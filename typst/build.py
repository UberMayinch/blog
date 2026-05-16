#!/usr/bin/env python3
"""Build script for rhizoMorphic Typst blog."""

import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TYPST_DIR = ROOT / "typst"
POSTS_DIR = TYPST_DIR / "posts"
TEMPLATES_DIR = TYPST_DIR / "templates"
CSS_DIR = TYPST_DIR / "css"
SITE_DIR = ROOT / "_site"

LOCAL = "--local" in sys.argv
BASE_URL = "" if LOCAL else "/blog"

BMC_SCRIPT = """<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="ubermayinch" data-description="Support me on Buy me a coffee!" data-message="Support my Work!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>"""


def parse_post_metadata(path: Path) -> dict:
    """Extract title and date from a .typ post file."""
    text = path.read_text()
    title_m = re.search(r'title:\s*"([^"]*)"', text)
    date_m = re.search(r'date:\s*datetime\(year:\s*(\d+),\s*month:\s*(\d+),\s*day:\s*(\d+)\)', text)
    title = title_m.group(1) if title_m else path.stem
    if date_m:
        year, month, day = int(date_m.group(1)), int(date_m.group(2)), int(date_m.group(3))
    else:
        fname_m = re.match(r'(\d{4})-(\d{1,2})-(\d{1,2})-', path.name)
        if fname_m:
            year, month, day = int(fname_m.group(1)), int(fname_m.group(2)), int(fname_m.group(3))
        else:
            year, month, day = 2024, 1, 1
    return {"title": title, "date": (year, month, day), "slug": path.stem, "path": path}


def generate_home(posts: list):
    """Generate the home page .typ file."""
    posts_sorted = sorted(posts, key=lambda p: p["date"], reverse=True)
    lines = [
        '#import "templates/base.typ": page-layout',
        '',
        '#show: page-layout.with(title: "rhizoMorphic")',
        '',
        '#context if target() == "html" {',
        '  html.elem("div", attrs: (class: "home"), {',
        '    html.elem("ul", attrs: (class: "post-list"), {',
    ]
    from datetime import date
    for p in posts_sorted:
        y, m, d = p["date"]
        dt = date(y, m, d)
        date_str = dt.strftime("%b %-d, %Y")
        url = f'{BASE_URL}/posts/{p["slug"]}/'
        title_escaped = p["title"].replace('"', '\\"')
        lines.append(f'      html.elem("li", {{')
        lines.append(f'        html.elem("span", attrs: (class: "post-meta"), "{date_str}")')
        lines.append(f'        html.elem("h3", html.elem("a", attrs: (class: "post-link", href: "{url}"), "{title_escaped}"))')
        lines.append(f'      }})')
    lines.append('    })')
    lines.append('  })')
    lines.append('}')
    home_path = TYPST_DIR / "_home.typ"
    home_path.write_text('\n'.join(lines) + '\n')
    return home_path


def inject_bmc(html_path: Path):
    """Inject Buy Me a Coffee script before </body>."""
    content = html_path.read_text()
    content = content.replace("</body>", BMC_SCRIPT + "\n</body>")
    if not content.strip().startswith("<!"):
        content = "<!DOCTYPE html>\n" + content
    html_path.write_text(content)


def fix_inline_math(html_path: Path):
    """Merge split <p>text</p><svg>...</svg><p>text</p> sequences into inline flow.
    
    Typst HTML export splits paragraphs around inline math SVGs.
    This merges them back so text flows naturally around math.
    """
    content = html_path.read_text()
    # Pattern: </p> followed by whitespace then <svg...>...</svg> then whitespace then <p>
    # Replace with: <span> svg </span> (keeping content flowing in same paragraph)
    content = re.sub(
        r'</p>\s*(<svg class="typst-frame"[^>]*>.*?</svg>)\s*<p>',
        r' \1 ',
        content,
        flags=re.DOTALL,
    )
    html_path.write_text(content)


def rewrite_base_url_in_html(html_path: Path):
    """Replace /blog/ prefix in HTML with the current BASE_URL."""
    content = html_path.read_text()
    # The templates hardcode /blog as base-url; replace with actual
    if LOCAL:
        content = content.replace('href="/blog/', 'href="/')
        content = content.replace('src="/blog/', 'src="/')
    html_path.write_text(content)


def compile_typ(input_path: Path, output_path: Path):
    """Compile a .typ file to HTML."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "typst", "compile",
        "--features", "html",
        "--format", "html",
        "--root", str(ROOT),
        str(input_path),
        str(output_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR compiling {input_path.name}:", file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        return False
    print(f"  ✓ {input_path.name}")
    return True


def build():
    mode = "local" if LOCAL else "production"
    print(f"Building rhizoMorphic ({mode})...")

    # Clean output
    if SITE_DIR.exists():
        shutil.rmtree(SITE_DIR)
    SITE_DIR.mkdir()

    # Prevent GitHub Pages from running Jekyll on the output
    (SITE_DIR / ".nojekyll").touch()

    # Copy static assets
    css_out = SITE_DIR / "css"
    css_out.mkdir()
    shutil.copy(CSS_DIR / "style.css", css_out / "style.css")

    assets_src = ROOT / "assets"
    if assets_src.exists():
        shutil.copytree(assets_src, SITE_DIR / "assets")

    # Gather posts
    post_files = sorted(POSTS_DIR.glob("*.typ"))
    posts = [parse_post_metadata(p) for p in post_files]
    print(f"Found {len(posts)} posts")

    # Compile posts
    print("Compiling posts...")
    for p in posts:
        out = SITE_DIR / "posts" / p["slug"] / "index.html"
        if compile_typ(p["path"], out):
            fix_inline_math(out)
            if LOCAL:
                rewrite_base_url_in_html(out)
            inject_bmc(out)

    # Generate and compile home page
    print("Compiling home page...")
    home_typ = generate_home(posts)
    home_out = SITE_DIR / "index.html"
    if compile_typ(home_typ, home_out):
        if LOCAL:
            rewrite_base_url_in_html(home_out)
        inject_bmc(home_out)

    # Compile about page
    print("Compiling about page...")
    about_out = SITE_DIR / "about" / "index.html"
    if compile_typ(TEMPLATES_DIR / "about.typ", about_out):
        if LOCAL:
            rewrite_base_url_in_html(about_out)
        inject_bmc(about_out)

    print(f"\nDone! Site built in {SITE_DIR}")
    if LOCAL:
        print(f"Serve locally: cd {SITE_DIR} && python3 -m http.server 8080")


if __name__ == "__main__":
    build()

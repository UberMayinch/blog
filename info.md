# rhizoMorphic

A minimal technical blog powered by [Hugo](https://gohugo.io/), with LaTeX math
and syntax highlighting rendered at build time.

## Daily workflow (notebooks)

One-time: `tools/nb setup` (or `make setup`) creates `.venv/` with a Jupyter
kernel **Python 3 (blog)** that has a `%%cpp` cell magic preloaded, and puts
Hugo in `.bin/`. In VS Code pick interpreter `.venv/bin/python`.

```bash
tools/nb new [slug]     # content/posts/YYYY-MM-DD[-slug]/{index.md,notebook.ipynb}, opens VS Code
tools/nb serve          # preview at http://localhost:1313/blog/
tools/nb publish        # commit every changed post under content/posts/ and push
tools/nb publish -n     # dry run
```

- The notebook *is* the post. Its first `# Heading` becomes the title on publish.
- Outputs are published as saved (text, errors, images, HTML tables), so run
  cells before saving.
- C++ in a Python notebook: start a cell with `%%cpp [g++ flags] [-- args]`
  (defaults `-std=c++20 -O2 -Wall`).
- **Math cells** render on squared paper: a Markdown cell that is only display
  math (`$$…$$`), or one starting with `<!-- math -->`, or tagged `math`.
- Publishing skips empty posts and never stages anything outside `content/posts/`.

Plain Markdown posts (`content/posts/*.md`) still work; they render as a
single Markdown cell.

## Reading features

- **Ctrl+K** (or `/`): search every post and cell; `>` lists commands.
- Click a cell to select it; Shift-click for a range, Ctrl-click to toggle.
  **Ctrl+C** (with no text selected) or the toolbar copies the selection, or
  the whole page, as Markdown context for an LLM: fenced code, outputs, and a
  source link. Each cell's hover toolbar copies that cell or its link.
- **Home** is `home.ipynb`: cell `[1]` outputs an Obsidian-style knowledge
  graph (notes, tags; edges from front-matter `tags`, links to other posts
  such as `[x](/posts/2024-3-30-NatIsoVectSpaces)` or `[[2024-3-30-NatIsoVectSpaces]]`,
  and series like `AFWeek1…6`). Cell `[2]` lists the 5 newest posts. The code
  shown there is decoration (`layouts/home.html`, `static/js/graph.js`).
- **Tabs**: a post opens as an italic preview tab; double-click keeps it open
  for the browser session.
- **Vim** (VSCodeVim-style, mode in the status bar; click it to turn off):
  `j`/`k` scroll, `Ctrl-d`/`Ctrl-u` half page, `gg`/`G` top/bottom,
  `J`/`K` or `{`/`}` previous/next cell, `V` visual-line over cells,
  `y` / `yy` / `3yy` yank cells as LLM context, `za` fold outputs, `gt`/`gT`
  tabs, `:` commands, `/` search. Counts work (`5j`, `3G`).
- **Theme**: status-bar toggle between GitHub Dark and GitHub Light. Syntax
  colors for both live in `static/css/chroma.css` (Chroma uses classes).

## How it works

- **Math**: KaTeX is embedded in Hugo. The passthrough extension (`hugo.toml`)
  captures `$…$` and `$$…$$`, and `layouts/_markup/render-passthrough.html`
  renders them at build time: static HTML, no client-side JS. KaTeX's
  stylesheet and woff2 fonts are vendored into `static/css/katex/` (the woff
  and ttf `@font-face` sources were stripped, since every current browser takes
  woff2). MathML-only output would drop that 330 KB, but browsers lay out
  `CD` commutative diagrams badly without KaTeX's CSS.
  Commutative diagrams use the AMScd `CD` environment, which KaTeX supports;
  `tikzcd` does not work.
- **Code**: Chroma highlights fenced blocks at build time with CSS classes;
  `static/css/chroma.css` holds the github-dark and github styles, each scoped
  to `:root[data-theme=…]`.
- **Notebooks**: Hugo parses the bundle's `.ipynb` itself
  (`layouts/_partials/nb/parse.html`, via `transform.Unmarshal`), so CI needs
  no Python. Markdown cells go through `.RenderString`, so KaTeX and the link
  hook apply. The same parse feeds `layouts/home.json`, the Ctrl+K index.
- **Look**: VS Code workbench with the GitHub Dark Default palette
  (`static/css/style.css`), with a GitHub Light variant. Behaviour lives in
  `static/js/notebook.js` (no dependencies).
- **Layouts**: small templates in `layouts/`. No theme, no submodules.
- **Deployment**: `.github/workflows/deploy.yml` installs Hugo, runs
  `hugo --minify`, and publishes to GitHub Pages. Repository
  **Settings → Pages → Source** must be **GitHub Actions**.

## Project structure

```
├── hugo.toml                  # All site config
├── content/
│   ├── about.md
│   └── posts/                 # Blog posts (.md)
├── layouts/
│   ├── baseof.html            # Shared page shell
│   ├── home.html              # Post index
│   ├── single.html            # Blog post
│   ├── list.html              # Section listing
│   ├── about.html             # About page
│   └── _markup/
│       ├── render-passthrough.html   # LaTeX → KaTeX HTML
│       └── render-link.html          # Root-relative link rewriting
├── static/                    # Copied verbatim (css, images, PDFs)
└── .github/workflows/deploy.yml
```

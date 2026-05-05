# rhizoMorphic

A minimal technical blog powered by [Typst](https://typst.app/) with server-side math rendering.

## Quick Start

### Prerequisites

- [Typst](https://github.com/typst/typst) (≥ 0.13)
- Python 3.10+

### Local Preview

```bash
python typst/build.py --local
cd _site && python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

### Production Build

```bash
python typst/build.py
```

This builds with `/blog` as the base URL (for GitHub Pages at `username.github.io/blog`).

## Writing a New Post

Create a `.typ` file in `typst/posts/`:

```typst
#import "../templates/post.typ": post

#show: post.with(
  title: "Your Post Title",
  date: datetime(year: 2026, month: 5, day: 6),
  tags: ("Math", "Physics"),
)

Your content here. Inline math works natively: $E = m c^2$.

Display math:

$ integral_0^infinity e^(-x^2) dif x = sqrt(pi) / 2 $
```

The filename should follow the pattern `YYYY-M-D-Slug.typ` (e.g. `2024-3-30-NatIsoVectSpaces.typ`).

Push to `main` and the GitHub Actions workflow handles the rest.

## Project Structure

```
├── typst/
│   ├── build.py              # Build script
│   ├── css/style.css          # Site styling
│   ├── templates/
│   │   ├── base.typ           # Shared HTML layout (header, nav, footer)
│   │   ├── post.typ           # Blog post template with math rendering
│   │   └── about.typ          # About page
│   └── posts/                 # Blog post source files (.typ)
├── assets/                    # Static assets (images, PDFs)
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages CI/CD
└── _site/                     # Build output (gitignored)
```

## How It Works

- **Math**: Typst compiles math expressions to inline SVGs at build time — no client-side JavaScript needed.
- **Diagrams**: Uses the [fletcher](https://typst.app/universe/package/fletcher) package for commutative diagrams.
- **Post-processing**: The build script merges split paragraphs around inline math SVGs and injects the Buy Me a Coffee widget.
- **Deployment**: On push to `main`, GitHub Actions installs Typst, runs the build, and deploys to GitHub Pages.

## Deployment

The site is configured to deploy via GitHub Actions. Make sure your repository's **Settings → Pages → Source** is set to **GitHub Actions** (not "Deploy from a branch").

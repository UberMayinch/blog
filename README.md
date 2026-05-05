# rhizoMorphic Blog (Typst Template)

This is a minimal, math-focused static site generator powered purely by **Typst** and Python. It was migrated from a Jekyll codebase to enable native math rendering and commutative diagrams (via Fletcher) without relying on heavy client-side JavaScript like MathJax or KaTeX.

## Features
- **Native Typst Math**: All math is compiled to SVG server-side and integrated seamlessly with text.
- **Commutative Diagrams**: Support for `fletcher` out of the box.
- **Minimalist Aesthetic**: Clean, light grey, serif-based design.
- **Zero Client-Side JS**: Fully static HTML output.
- **Automated Deployments**: Ready-to-go GitHub Actions workflow.

## Directory Structure
```
.
├── typst/
│   ├── build.py                    # The core static site generator script
│   ├── css/
│   │   └── style.css               # The styling
│   ├── posts/                      # Your blog content in .typ files
│   └── templates/                  # Typst templates for HTML wrappers
│       ├── about.typ
│       ├── base.typ
│       └── post.typ
├── assets/                         # Static assets (images, resumes)
├── _site/                          # Build output directory (generated)
└── .github/workflows/deploy.yml    # CI/CD deployment
```

## Adding a New Post
Simply create a new `.typ` file inside the `typst/posts/` folder. Use the following preamble to inject the site's layout:

```typst
#import "../templates/post.typ": post

#show: post.with(
  title: "Your Awesome Title",
  date: datetime(year: 2026, month: 5, day: 6),
  tags: ("Math", "Computer Science"),
)

Your content here.
Inline math works flawlessly: $a^2 + b^2 = c^2$.

And so does display math:
$ 
  f(x) = sum_(n=0)^infinity (f^((n))(a)) / n! (x - a)^n
$
```

## Building Locally
You can preview your blog by running the local build command, which removes the `/blog/` production prefix so that assets resolve correctly on `localhost`.

```bash
python typst/build.py --local
```

Then serve the `_site/` directory:
```bash
cd _site && python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

## Deployment
Push your changes to the `main` or `master` branch. The included GitHub Actions workflow will automatically run the build script and deploy the `_site/` output to GitHub Pages.

// Base layout template for rhizoMorphic blog
// Emits full HTML page structure when targeting HTML

#let base-url = "/blog"

#let page-layout(title: "rhizoMorphic", body) = context {
  if target() == "html" {
    html.elem("html", attrs: (lang: "en"), {
      html.elem("head", {
        html.elem("meta", attrs: (charset: "utf-8"))
        html.elem("meta", attrs: (
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        ))
        html.elem("title", {
          if title != "rhizoMorphic" { title + " — rhizoMorphic" } else { "rhizoMorphic" }
        })
        html.elem("link", attrs: (
          rel: "stylesheet",
          href: base-url + "/css/style.css",
        ))
      })
      html.elem("body", {
        // Site header
        html.elem("header", attrs: (class: "site-header"), {
          html.elem("div", attrs: (class: "wrapper"), {
            html.elem("a", attrs: (
              class: "site-title",
              href: base-url + "/",
            ), "rhizoMorphic")
            html.elem("nav", attrs: (class: "site-nav"), {
              html.elem("a", attrs: (
                class: "page-link",
                href: base-url + "/about/",
              ), "About")
            })
          })
        })
        // Main content
        html.elem("main", attrs: (class: "page-content"), {
          html.elem("div", attrs: (class: "wrapper"), body)
        })
        // Footer
        html.elem("footer", attrs: (class: "site-footer"), {
          html.elem("div", attrs: (class: "wrapper"), {
            html.elem("p", "Chinmay Sharma · chinmay.sharma@research.iiit.ac.in")
            html.elem("p", attrs: (class: "description"),
              "rhizoMorphic — Chinmay Sharma's Technical Blog.",
            )
          })
        })
      })
    })
  } else {
    // PDF fallback
    set text(font: "New Computer Modern", size: 11pt)
    set page(margin: 2cm)
    body
  }
}

// Post template for individual blog posts
#import "base.typ": page-layout

#let post(title: "", date: datetime.today(), tags: (), body) = {
  show: page-layout.with(title: title)

  // Render math as inline SVG in HTML mode
  show math.equation: it => context {
    if target() == "html" {
      html.frame(it)
    } else {
      it
    }
  }

  context if target() == "html" {
    html.elem("article", attrs: (class: "post"), {
      html.elem("header", attrs: (class: "post-header"), {
        html.elem("h1", attrs: (class: "post-title"), title)
        html.elem("p", attrs: (class: "post-meta"), {
          date.display("[month repr:long] [day], [year]")
        })
      })
      html.elem("div", attrs: (class: "post-content"), body)
    })
  } else {
    text(size: 18pt, weight: "bold", title)
    linebreak()
    text(size: 10pt, fill: gray, date.display("[month repr:long] [day], [year]"))
    v(1em)
    body
  }
}

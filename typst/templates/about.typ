// About page
#import "base.typ": page-layout, base-url

#show: page-layout.with(title: "About")

#context if target() == "html" {
  html.elem("div", attrs: (class: "about-page"), {
    html.elem("h1", attrs: (class: "page-heading"), "About")

    html.elem("div", attrs: (class: "about-content"), {
      html.elem("div", attrs: (class: "about-photo"), {
        html.elem("img", attrs: (
          src: base-url + "/assets/img/Chinmay-about.jpg",
          alt: "Chinmay Sharma",
        ))
      })

      html.elem("p", "Hi! I'm Chinmay Sharma, A Computer Science and Computational Natural Sciences Sophomore Undergraduate Researcher at International Institute of Information Technology, Hyderabad.")

      html.elem("p", "I'm primarily interested in using frameworks from interdisciplinary mathematical and computational disciplines to model different physical or biological phenomena. Using these same approaches for the interpretability/alignment is also a problem that deeply interests me.")

      html.elem("p", "I am building familiarity with methods from Statistical mechanics, Category Theory, differential geometry, Nonlinear dynamics, Network Science, Mathematical Biology and Machine Learning at this point in time.")

      html.elem("p", {
        html.elem("a", attrs: (
          href: base-url + "/assets/resume/cv.pdf",
          target: "_blank",
        ), "View my resume")
        " to learn more about my projects and experience."
      })

      html.elem("p", {
        "I'm deeply interested in understanding the mind and the world from other perspectives. In particular, Eastern metaphysics (such as Yoga, Advaita Vedanta, Kashmiri Shaivism and Buddhism), Psychoanalysis and weird Philosophies that have unique enough views of the world (The blog is named after a concept from D&G) really appeal to me."
      })

      html.elem("p", {
        "I periodically write poems or opinion pieces about these topics on my "
        html.elem("a", attrs: (href: "https://toomanycents.blogspot.com/"), "Other blog")
        "."
      })

      html.elem("p", {
        "I have a "
        html.elem("a", attrs: (href: "https://toomanycents.substack.com/"), "newsletter")
        " where I (try to) write every week to round up all the ideas I encounter or frameworks I develop pertaining to more pragmatic things in life."
      })

      html.elem("p", "I play the drums in my free time with my college band ADHD.")
    })
  })
}

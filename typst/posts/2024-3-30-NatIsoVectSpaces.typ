#import "../templates/post.typ": post
#import "@preview/fletcher:0.5.8" as fletcher: diagram, node, edge

#show: post.with(
  title: "Natural Isomorphisms in Vector Spaces",
  date: datetime(year: 2024, month: 3, day: 30),
)

Anyone taking an introductory course on linear algebra has probably seen the statement "There is a natural isomorphism between a vector space and its double dual." In some sense we realise that it makes sense. But what does it really mean? To prove this we need to set up a lot of category theory.

*Definition:* A category is a collection of objects and morphisms between these objects such that there is an identity morphism for each object, the morphisms between objects compose and that the compositions are associative.

Examples:

*Definition:* A functor between two categories $F: C arrow.r D$ takes objects in one category to objects in another category and morphisms in one category to morphisms in another category such that

$ F(a compose b) = F(a) compose F(b) quad forall a, b in "Obj"(C) $
$ F(id_a) = id_(F(a)) $

This is for covariant functors, we can also have contravariant functors where the order is reversed.

*Definition:* A natural transformation between *Two Functors* takes objects in the source category and produces a morphism in the target category taking the image of the object under the initial functor to the image of the object under the second functor. Additionally the following diagram should commute:

#context {
  let d = fletcher.diagram(
    node-stroke: 0.5pt + gray,
    node((0, 0), $F(A)$),
    node((1, 0), $F(B)$),
    node((0, 1), $G(A)$),
    node((1, 1), $G(B)$),
    edge((0, 0), (1, 0), "->", $F(f)$),
    edge((0, 0), (0, 1), "->", label-side: right, $T_A$),
    edge((1, 0), (1, 1), "->", $T_B$),
    edge((0, 1), (1, 1), "->", label-side: right, $G(f)$),
  )
  if target() == "html" { html.frame(d) } else { d }
}

And another commutative diagram:

#context {
  let d = fletcher.diagram(
    node-stroke: 0.5pt + gray,
    node((0, 0), $K(X)$),
    node((1, 0), $H(X; bb(Q))$),
    node((0, 1), $K(Y)$),
    node((1, 1), $H(Y; bb(Q))$),
    edge((0, 0), (1, 0), "->", $"ch"$),
    edge((0, 0), (0, 1), "->"),
    edge((1, 0), (1, 1), "->"),
    edge((0, 1), (1, 1), "->", $"ch"$),
  )
  if target() == "html" { html.frame(d) } else { d }
}

#import "../templates/post.typ": post
#import "@preview/fletcher:0.5.8" as fletcher: diagram, node, edge

#show: post.with(
  title: "Fock Spaces Part 1: Tensor Products",
  date: datetime(year: 2023, month: 10, day: 31),
  tags: ("Mathematical Physics",),
)

Hello everyone, today I would like to talk a series of posts building up to Fock Spaces, which came up while we were discussing identical particles in my Introductory Quantum Mechanics Class.

The idea behind Fock Spaces is basically to encode the information of a system of many identical particles (That may be fermions or bosons) in a single mathematical object.

Though the intuition is a simple one, there is a lot of mathematical jargon that goes into this and hence it becomes rather complicated to understand the definition, so here I would like to start from (what I think) is the beginning to understand this concept.

*Definition:* A tensor product of two vector spaces $V$ and $W$ is a vector space $V times.circle W$ such that every bilinear mapping in $V times W arrow.r Z$ decomposes to a mapping in $V times.circle W arrow.r Z$

There are other definitions of the tensor product in terms of quotient spaces etc. however (TODO: quotient space definition) I think that this universal property definition captures the essence of this mathematical object and is the most intuitive. Naturally, any universal property definition can be rephrased through a commuting diagram and for the tensor product this is as follows.

#context {
  let d = fletcher.diagram(
    node-stroke: 0.5pt + gray,
    node((0, 0), $V times W$),
    node((1, 0), $V times.circle W$),
    node((0, 1), $Z$),
    edge((0, 0), (1, 0), "->", $Phi$),
    edge((0, 0), (0, 1), "->"),
    edge((1, 0), (0, 1), "-->", $exists ! Psi$),
  )
  if target() == "html" { html.frame(d) } else { d }
}

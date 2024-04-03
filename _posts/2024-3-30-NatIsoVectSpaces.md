---
layout: post
title: "Natural Isomorphisms in Vector Spaces"

---
Anyone taking an introductory course on linear algebra has probably seen the statement "There is a natural isomorphism between a vector space and its double dual"
In some sense we realise that it makes sense. But what does it really mean? To prove this we need to set up a lot of category theory.

Definition: A category is a collection of objects and morphisms between these objects such that there is an identity morphism for each object, the morphisms between objects compose and that the compositions are assosciative.
Examples: 
Definition: A functor between two categories takes objects in one category to objects in another category and morphisms in one category to morphisms in another category such that 
$F(a \dot b) = F(a) \dot F(b)$
This is for covariant functors, we can also have contravariant functors where the order is reversed.

Definition: A natural transformation between **Two Functors** takes objects in the source category and produces a morphism in the target category taking the image of the object under the initial functor to the image of the object under the second functor. Additionally the following diagram should commute

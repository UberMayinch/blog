#import "../templates/post.typ": post

#show: post.with(
  title: "C* and W* Algebras",
  date: datetime(year: 2023, month: 10, day: 15),
  tags: ("Mathematical Physics",),
)

I recently came across C and W algebras which are basically just formalizations of the spaces we do quantum mechanics in.

Formally, we start with the following:

*Definition:* A $C^*$ algebra is a (complex) Banach space (complete normed vector space) equipped with a unary operator (involution) $*$ which satisfies the following:

+ It is conjugate linear:\
  $(a lambda + b)^* = a^* overline(lambda) + b^*$
+ It is antihomomorphic:\
  $(a b)^* = b^* a^*$
+ *C\* Property —* $norm(a^* a) = norm(a)^2$

A $W^*$ algebra is just a $C^*$ Algebra such that there exists a Banach space which is its dual.

The intuition I understand up till now is to consider these as the Hilbert space of state vectors where we do classical QM.

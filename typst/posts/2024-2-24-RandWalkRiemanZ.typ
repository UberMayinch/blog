#import "../templates/post.typ": post

#show: post.with(
  title: "Random Walks and the Riemann Zeta Function",
  date: datetime(year: 2024, month: 2, day: 24),
)

In this week's meeting of theory thursday, we discussed random walks in higher dimensions. Specifically the statement that a drunk human can return back to where they started from but a drunk bird can't. This is related to the fact that in 2D a random walk is guaranteed to come back to the origin whereas in 3D the probability of this happening is vanishingly small.

We also discussed Möbius functions and square free numbers. There is an alternate interpretation of the Riemann Hypothesis basically equivalent to saying that "If I randomly picked a square free number the probability that it has an even or odd number of prime factors is equal." This is formalized by the Möbius function

$ mu(n) = cases(
  0 & "if" n "has a squared prime factor",
  (-1)^k & "if" n "is a product of" k "distinct primes",
  0 & "if" n "has a repeated prime factor",
) $

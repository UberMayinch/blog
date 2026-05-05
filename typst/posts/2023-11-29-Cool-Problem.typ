#import "../templates/post.typ": post

#show: post.with(
  title: "A Cool Problem on Chernoff Bounds and Moment Generating Functions",
  date: datetime(year: 2023, month: 11, day: 29),
)

Here is a cool problem that I had in one of the problem sets for my Probability and Random Processes course.

Let $(X_1, X_2, dots, X_n)$ be independent random variables such that

$ Pr(X_i = 1 - p_i) = p_i $

and

$ Pr(X_i = -p_i) = 1 - p_i $

Let $X = sum_(i=1)^(n) X_i$. Prove

$ Pr(|X| >= a) <= 2 e^(-2a^2 slash n) $

*Hint:* You may use the following inequality

$ pi e^(lambda(1-pi)) + (1-pi) e^(-lambda pi) <= e^(lambda^2 slash 8) $

---
layout: post
title: "A Cool Problem on Chernoff Bounds and Moment Generating Functions"
usingmathjax: True
---

Here is a cool problem that I had in one of the problem sets for my Probability and Random Processes course. 

Let \(X_1, X_2, \ldots, X_n\) be independent random variables such that
\[ \Pr(X_i = 1 - p_i) = p_i \]
and
\[ \Pr(X_i = -p_i) = 1 - p_i \].

Let \(X = \sum_{i=1}^{n} X_i\). Prove
\[ \Pr(|X| \geq a) \leq 2e^{-2a^2/n} \].

**Hint:** You may use the following inequality
\[ \pi e^{\lambda(1-\pi)} + (1-\pi)e^{-\lambda\pi} \leq e^{\lambda^2/8} \]

---

layout: post
title: "Variational Bayes"
color: secondary
tags: [Mathematical Physics]
style: fill
usemathjax: True


---
Recently I came across Variational Bayes which is a very powerful technique in bayesian inference. 
The idea is that we want to find out a posterior using bayes theorem. 
Formulating the problem:
$Z, X$ are in general vectors belonging to some spaces, where Z is a set representing the latent parameters and X is the data values. 
We want $&p(Z | X) = \frac{p(X | Z) p(Z)}{p(X = D)}$&
given only the joint probability distribution.
the problem here is that the denominator, which is called the marginal is intractable to compute. 
The method used here is instead to find the best function approximation to the posterior in terms of simple functions. 
so 
$&\argmin p(Z | X) = \log(\frac{q(Z)}{p(Z)})$&
Now we minimize the KL divergence between this function and q which is like a distance metric between two probability distributions. 
However, the problem is still not solved, because we still do not have the posterior. 
Using the fact that $&p(Z | X) = p(Z, X)/p(X)$& we rewrite the expression and use the logarithm rules to finally end up with the following expression:

Here, we simply need to maximize the first term, to get the best simple function approximation of the posterior. The second term is called the model evidence and hence the first term is called the Evidence Lower Bound.

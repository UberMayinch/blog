---

layout: post
title: "Free Energy and Active Inference Part 1: Markov Blankets"
usemathjax: True 

---
Hello everyone, this is going to be a series of posts building up to Karl Friston's Free Energy Principle. All of this came about as a result of me reading a paper on the free energy principle being applied to Biological Systems. The Free energy principle is notoriously difficult to understand, which for some reason motivates me to study it even more. These are notes to myself of the components that go into understnading the free energy principle. 

Okay, so the first part which is crucial to understanding the FEP is the concept of a **markov boundary**. There are some philosophical qualms we can raise about the FEP, in that we define a 'thing' to be something that is de-fined (in a bohmian sense, made finite) by a markov boundary. 

In particular, this is kind of Hegelian in a way where we define the 'thingness' of something (a particle, a system, a population) on the basis of a boundary that separates it from that which it is not. In terms of the buddhist concept of Apoha then, a thing is defined as something which is not not that thing (or a double negation).

This sort of definition lends itself well to machine learning classifiers for example, but I see that in some more exotic metaphysics, we may not necessarily agree with this definition of a thing (for example perhaps a radically positive metaphysics as seen in Nietzsche and Deleuze which stands against the negativity of the dialectic).

For our intents and purposes though, the beauty of the FEP is seen when we take this definition as an axiom and build up from there. In the FEP, this notion of boundary is captured by idea of causality. A boundary then is a something that partitions a system into the external and internal, where there is no causal effect on the internal by the external. This is captured by the idea of Markov Blankets and boundaries which are concepts borrowed from machine learning.

The intution I got for building up to the concept of a markov blanket is from this medium post which is well written- https://kuanjh123.medium.com/markov-blanket-8aaa416495c3. We start with the markov property. This just captures the intution of a transition that only depends on the current value; if we know the state of a system at present then we have as much information about it as can be known by having access to all previous states. 

**Definition 1:** A discrete time process is said to have the markov property if it satisfies the following:
$$ \Pr(X_{n+1}=x \mid X_{n}=x_{n}) = \Pr (X_{n+1} = x \mid X_{1}=x_{1}, X_2=x_{2}, ... X_{n}=x_{n}$$ 

Instead of just imagining a chain of these, we can imagine a whole network with each node representing a probability of an event and the edges represent conditional dependence.
Interesting aside, **how does this relate to automata theory and probabilistic finite state automata?**

We then identify three types of structures found in bayesian networks:
1. Causal Chain: Parent and child are initially dependent. On certain knowledge of intermediate node they become independent.
2. Common Cause: Children nodes initially dependent. On certain knowledge of the parent they become independent.
3. Common Effect: Parent nodes are initially independent. On certain knowledge of child they become dependent.

The idea is that any subgraph of a bayesian network will be isomorphic to a graph that can be composed with just these three types of structures. These respectively correspond to knowing the Parents of the nodes in the system, the Children and the parents of the children. Knowing all these, our system of proposed 'internal' states is independent of the external system in terms of causal affection. Having successfully set up the boundary, we can set up the rest of the formalism.

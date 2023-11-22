---
layout: Post
Title: "Free Energy and Active Inference Part 2: Perception Action Coupling"
usemathjax: True
---


Hello everyone, welcome to the second post where I will discuss Perception and Action Coupling in Karl Friston's Model of Free Energy. 
The idea here is pretty simple. From the Markov Blankets described in the previous post, we see that any abstract state space can be partitioned into internal and external states and also the states which comprise the boundary. 
The key step here is to separate the states that comprise the boundary again into perceptual and action states. 
Perceptual states are those which depend upon External states and can change internal states. 
Action States are those which depend upon Internal and Sensory states but cannot change the internal states. 

This is mathematically formalized as shown in this figure. 

This may look a bit intimidating at first glance but all this is saying is that the Perceptual states take in a external state, a random fluctuation and the current Perceptual state and output a real number (in the sense of an observable in quantum mechanics).
Similarly for the Active states. 

This together leads to a kind of circular causality as mentioned in <a href="">this</a> paper.

This leads to two kinds of Densities. G-Density and R-Density. 
R Density is the representation the system creates of the outside environment. 
G Density. 
In the next post I will talk about how this may now be interpreted as a random dynamical system and how we may then apply methods of RDS or the fokker planck evolution to describe the evolution of these systems. 

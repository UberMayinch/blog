#import "../templates/post.typ": post

#show: post.with(
  title: "Axiom Futures AI Safety Week 6",
  date: datetime(year: 2024, month: 7, day: 28),
)

== Intro
Understanding larger neural networks in terms of functional circuits and their relations. RLHF and Scalable oversight are not enough to deal with issues like deceptive or sycophantic behaviour. If we can understand what the different subnetworks are doing, CNNs are mostly interpretable because we have an understanding of what the convolutional and pooling layers do whereas larger SOTA circuits are often much less interpretable.

== Activity 1
- *Features:* represent independent directions like a basis set for what we're trying to learn.
- *Circuits:* Connections between Features which correspond to subgraphs of the whole network — functional components that represent relationships between features.
- *Universality:* similar circuits learn similar features even if the tasks are different.

Examples: Features = an edge of an image. Circuits = A group of edge detection filters connected together that allows the detection of a square.

== Activity 2
*Superposition:* A single neuron represents noisy encodings of multiple features.

+ What is superposition? Semicolon in javascript has different meanings in English or other languages. Sparse correlation makes the neurons polysemantic.
+ What's a polysemantic neuron? Single neurons encode more than one feature noisily. Polysemantic neurons allow for superposition.
+ What is dictionary learning? Related to sparse autoencoding. Creating an independent basis set for whatever latent semantic space is being considered as dimensionality reduction or 'disentangling'.

== Questions
How much does interpretability affect performance? Dictionary Learning — post hoc interpretability = focus on performance and then do dictionary learning. You take a layer of polysemantic neurons and expand it out into a layer of size maybe 10-15 times its size so that you can see all the monosemantic features.

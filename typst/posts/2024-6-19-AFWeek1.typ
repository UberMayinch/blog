#import "../templates/post.typ": post

#show: post.with(
  title: "Axiom Futures AI Safety Week 1 Notes",
  date: datetime(year: 2024, month: 6, day: 19),
  tags: ("Machine Learning", "AI Safety"),
)

== 1. Neural Network and Gradient Descent Basics Videos

videos: #link("https://www.youtube.com/watch?v=aircAruvnKk")[video1] #link("https://www.youtube.com/watch?v=IHZwWFHWa-w")[video2]

+ Later Layers capture bigger patterns in data.
+ Everything is just weighted sums and activation functions. Activation function = measure of how positive a sum coming in is. Bias = how high sum needs to be before a particular neuron gets activated.
+ Matrix formulation helps because Matrix operations are very optimized.
+ Gradient Descent - iteratively choose best option to reach a local minima on the loss function landscape.
+ Whole neural network is just a mathematical function. $f: bb(R)^n arrow.r bb(R)^m$

== 2. LLM video notes

#link("https://www.youtube.com/watch?v=zjkBMFhNj_g")[video]

=== Intro
- LLMs are just two files. A pretrained model with weights (intensive and expensive) and simple code to run it.
- Pretrained weights are expensive and models are proprietary because it's basically a compression of a significant chunk of the internet received after much compute is spent on it. It has a 'gestalt' of the internet content landscape.
- Next word prediction task is 'hard'. To predict the next word accurately when trained over large amounts of data, you need to learn and compress it well. The running part of the code is just iteratively generating the most probable word. Transformer architecture and attention is what has enabled the recent boom.
- Might have hallucinations.

=== Training an LLM
Two steps: pretraining and finetuning.
+ Pretraining - compute intensive, data centers, and GPUs. Web crawl and trained over a significant portion of the internet. "Foundational models"
+ Finetuning: High-quality small amount of labeled data is used to train the data to a specific task. Usually done with question-answers to create *assistant models*.
+ (Optional) RLHF = comparison labels for improving finetuning even further. Or self-feedback as in the case of AlphaGo. (InstructGPT paper)

=== Why LLMs and Future Research Directions

+ Multimodality (Foundational Models)
+ System 1 vs System 2 thinking (Leopold Aschenbrenner) and unhobbling.
+ Scaling Laws (We get solutions to new problems basically for free. Algorithmic or other developments are 'bonus'). Better next word prediction correlated with better performance on almost all benchmarks.
+ Self Learning - Instead of RLHF can we have self-learning? Data might eventually become a constraint so this is an important question.
+ Customized LLMs and an LLM OS - Context length is compared to RAM. Different LLMs and API calls can be used to have multiple modalities of data input.

=== Problems with LLMs
+ Hallucinations.
+ Jailbreak attacks - Panda Image, Universal Transferable Suffixes, Prompt Injections.
+ Alignment Problem. We know how to optimize transformer architecture but often can't understand what is going inside it. This is why *interpretability* is important.

== Exercise solutions
+ In NNs, weights are what define how much a neuron influences others.
+ Biases are a constant number added to a neuron's activation.
+ What's the value of A, B, and C in this neural network that uses the sigmoid function? A = $frac(1, 1+e^(3.6)) = 0.646$, B = 0.42, C = $2 dot frac(1, 1+e^(0.6)) + 1 dot frac(1, 1+e^(-0.3)) = 0.938$
+ The cost function is a measure of how far the current prediction is from the prediction outcome we want to train the NN to have.
+ It brings the neural network's prediction closer to the prediction outcome we want it to have.
+ Because the gradient is the direction of steepest ascent, negative of it represents direction of steepest descent. Iteratively choosing this allows us to "find" local minima on the loss function manifold.
+ Character level encoding, or Subword level encoding, or word level encoding.
+ Pretraining and finetuning. Pretraining is the computationally and monetarily costly step of adjusting the weights for a large corpus whereas finetuning is using high-quality data to update the pretrained model to some specific tasks.

+ Did decent.
+ Yeah, we expect it to be good at next word generation task.
+ LLMs are bad at math without using tools because zero-shot reasoning. With chain-of-thought prompting and using tools they'll perform much better.

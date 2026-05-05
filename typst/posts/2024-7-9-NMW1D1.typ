#import "../templates/post.typ": post

#show: post.with(
  title: "Neuromatch Academy Week 1 Day 1",
  date: datetime(year: 2024, month: 7, day: 9),
)

== 1. Tutorial 1
Konrad Kording\
What model: Description of Data - No promises about meaning\
How Model: Mechanistic Understanding\
Why Model: Which things matter, what's optimized ecologically or evolutionarily

Steinmetz dataset: Neuropixels - rodent is moving on

+ *What Models* — Understand the data very well. What is its type, shape? How can I access and load it correctly?

Our dataset is a collection of neuronal activities. It's an array of arrays of differing shapes representing firing activity for a single neuron. The entries are interspiking times (Floats).

```python
np.ptp()
np.concatenate()
```

Important observation: Taking an interval of say (5, 15) sec we see that the percentage of neuronal firing in this interval is same as this duration as a percentage of the experiment interval (\~0.33% of 2700 sec). This suggests that our interval is representative.

*Heavy-Tailed Distributions* are seen in neuroscience where a small number of neurons have extremely high number of spikes (>120000) whereas a good percentage is below mean (\~8000).

```python
plt.eventplot()
```
This is used to make a "raster" plot. The histogram in a given interval is a cumulative of a raster plot where each row is summed across.

```python
np.diff()
```
Finds discrete differences along an array.

What does it mean for a What model to be good? It should describe the data well. Check exponential, linear and inverse fits to the ISI distribution.

== 2. Tutorial 2
Integrate and Fire (IF) model of neurons. This model is not enough because it doesn't fit our data quite well. From a "How" perspective we see that it becomes quite regular but this is not what we see in actual physiology.

Leaky Integrate and Fire (LIF) model: Balanced excitation and inhibition. Random number of spikes that increase your voltage and also random spikes that decrease your voltage.

== 3. Tutorial 3
We want to describe theoretically obtained interspike distribution. We don't want to describe _how_ the brain does it, but rather _why_ doing it this way is more efficient.
#quote[What is the optimal way for a neuron to fire in order to maximize its ability to communicate information?]

If interspike duration was deterministic, no information could be conveyed.

==== Theorem: Uniform distribution is the distribution with the highest entropy.
Proof: Follows from Jensen's Inequality. $x log x$ is a concave function. Consider $p_1, p_2, dots, p_n$ such that $sum_(i=1)^n p_i = 1$

$ f(sum_(i=1)^n p_i) >= sum_(i=1)^n f(p_i) $

But uniform distribution also doesn't fit. So we reform the optimization problem:
#quote[Each neuron can only fire a limited number of times. Energy is required for firing and there is a refractory period.]

The exponential has the highest entropy if the number of firings are constrained.

To convert histogram to PMF, just normalize by the total number of firings.

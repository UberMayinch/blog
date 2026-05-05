#import "../templates/post.typ": post

#show: post.with(
  title: "Axiom Futures AI Safety Week 2",
  date: datetime(year: 2024, month: 6, day: 29),
)

== Why are people building AI systems article

#link("https://aisafetyfundamentals.com/blog/why-are-people-building-ai-systems/")[article]

=== Automating tasks
McKinsey estimate of 0.1 to 0.6% growth rate in productivity (!?) which leads to a value addition of \$2.6 to 4.4 Trillion dollars.
- This is a disputed figure. Original McKinsey article estimates use cases such as hiring which people are quite skeptical about because of problems with fairness or hallucinations.
- Earlier AI systems were thought to have good use cases in operations and supply chain but those were more compute/calculation based optimizations which are now not considered as relevant because of generative AI.
- Customer Operations, Sales, Software Engineering, R&D. (only SWE and R&D seem legit).

=== Replacing Human workers
e.g. Devin or the idea of a "drop in" agent as mentioned by Leopold Aschenbrenner

=== Non Economic Motivations
+ Positive externalities of technology development
+ National Interests (proprietary models and when AGI comes its going to be like nuclear power).
+ Fun Stuff / Solving their own problems.

== Compute Trends across three eras of ML article

Better ML systems come from:
+ Better Algorithms.
+ Better Data.
+ More Compute.

This article aims to analyse training compute trends.

=== Research Methodology
How is compute trained:
+ Counting number of operations.
+ Estimating through Runtime - requires assumptions about GPUs and system used for training - more uncertain.

Only the "important models" (influence, number of citations) were considered that pushed the SoTA.

=== Results
+ Old era doubling time \~20 months.
+ DL era (\~2010-12) doubling time of around 6 months.
+ Large Model Era (\~2016) doubling time of around 10 months.

== Scaling Laws article
#link("https://blog.finxter.com/ai-scaling-laws-a-short-primer/")[article]

Compute, Data, Parameters. Neural Language models scale with a consistent power law wrt to these. Transformer architecture doesn't converge.

== Paper on AI prediction
High-level machine intelligence (HLMI) is achieved when unaided machines can accomplish every task better and more cheaply than human workers.

=== 3.6 Intelligence Explosion
Since 2016 a majority of respondents have thought that it's either "quite likely," "likely," or an "about even chance" that technological progress becomes more than an order of magnitude faster within 5 years of HLMI being achieved.

=== 3.7 Future Systems
There were areas of agreement:
+ Find unexpected ways to achieve goals (82.3% of respondents)
+ Be able to talk like a human expert on most topics (81.4%)
+ Frequently behave in ways that are surprising to humans (69.1%)

=== Interpretability / Explainable AI systems
Only \~20 percent think that it's likely that for typical state-of-the-art AI systems in 2028, it will be possible for users to know the true reasons for systems making a particular choice.

=== Prediction Exercise

My Predictions:
+ Event: Win Putnam Math Contest. Prediction: 75% confidence by 2027. Reasoning: We have already done pretty decent on IMO benchmarks.
+ Event: Simple Python Code given spec. Prediction: 100% confidence 2023. Reasoning: Claude 3 Opus and GPT-4 pretty much solve this.
+ Event: Finetuning an LLM. Prediction: 75% confidence 2028. Reasoning: With good prompting it is almost able to do so.

Partner Predictions:
+ Vid from diff angle. Prediction: 75% confidence by 2028. Reasoning: 2020 panoptic scene graph, SoRA.

== How will AI affect your job Exercise
+ Reading research papers or textbooks, coding, solving physics problems, interacting with others.
+ In 10 years: Better comprehension, significantly fewer bugs in coding, good progress in research-level problems, significant AI-generated text/speech.
+ Technology adoption would be quite slow. Even with all the developments there would be a significant transition delay.
+ AI would exacerbate the rockstar effect considerably but also empower creatives.

Question for the week: Who is liable for the damages if an AI system generates something that wouldn't have been possible otherwise?

#import "../templates/post.typ": post

#show: post.with(
  title: "Axiom Futures Week 3 Notes",
  date: datetime(year: 2024, month: 7, day: 6),
)

=== AI Safety Remastered video
What's the most important problem in your field? Why are you not working on that?

Problem of AI safety:
#quote[Sooner or later, build an artificial agent with General Intelligence.]

Agent:
+ Has goals
+ Performs actions to achieve those goals.

Intelligence: blackboxed thing that lets agent choose effective action to achieve goals.\
General Intelligence: ability to behave independently in a wide range of domains.

Why is it a Problem?
#quote[It is difficult to choose goals.]

- Tetris bot pausing screen due to RLHF. This is the default of how these agents behave.
- System optimizing $n$ variables where objective depends on subset $k$ will probably set unused variables to extreme values.
- Convergent instrumental goals: No matter what your goal is, these behaviours will help:
  + Self preservation
  + Goal preservation
  + Resource Acquisition
  + Self Improvement

=== Global Catastrophic risk
There is a difference between Catastrophic risk (significant damage but recoverable) and existential risk (permanently alters the way of living). There is no incentive for any country to invest in prevention because it's a global public good. Cognitive biases like hyperbolic discounting further accentuate this problem.

=== More is different Article
AGI will be qualitatively different from current technologies. Philosophy camp looks at limiting thought experiments whereas engineering camp seeks to point out current problems. Both perspectives have blind spots.

== Overview of Catastrophic risks paper

+ *Bioterrorism* — AI can help extremist groups create bioweapons. With more robust biosecurity this seems the most preventable.
+ *Persuasive AI* — AI that generates misinformation for each echo chamber. Polarizes and fractures society. Pretty significant problem as it's already rearing its head.

=== Suggestions
+ Technical research on adversarially robust anomaly detection.
+ Restricted Access.
+ More biosecurity.
+ Legal Liability for creators of general purpose AIs.

3. *Military Arms Race* — Lethal armed weapons, cyberwarfare.
4. *Corporate Arms Race*
5. *Proxy Gaming / Goodharting*
6. *Goal Drift*
7. *Power Seeking: Instrumental Goal*

== Exercise
Story: Persuasive AI. As election season approaches people are fed their own personal propaganda. This destabilizes countries through negative feedback loops. This will have huge implications for geopolitics as fabricating historical documents erodes the function of society as rational conversation is essential for us to remain grounded in reality.

=== Threat models
+ *Power Seeking* — Novel ways of blackmailing. Remove the off switch.
+ *Persuasive AIs* — Best Defense: Better conversations, more epistemic humility, critical thinking.
+ *Bioterrorism* — Generally available LLMs shouldn't train on such data. Adversarial: Data poisoning and jailbreaking.

_Adversarial Robustness_

Metaethics: Long Termism is kinda fallacious because infinite utility assigned to some event in the future. Structuring better incentives for corporations is an important way to approach this problem.

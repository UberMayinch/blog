#import "../templates/post.typ": post

#show: post.with(
  title: "Nim, Sprague Grundy and the XOR group",
  date: datetime(year: 2024, month: 8, day: 15),
)

This week in Theory Thursday we covered the Nim game. Nim is basically what all impartial games are reducible to. Impartial games are those where both parties have perfect information about what moves the other player can make. I went down a rabbit hole and found a lot of interesting things.

One of these observations was that Nim is isomorphic to the XOR group. While this can be proven rigorously through group homomorphism, the best proof I have seen utilizes the fact that it is impartial to apply a strategy stealing argument. In essence, if I have a winning strategy for Nim, then my opponent could have done the same thing had it been their turn. That is the symmetry inherent in it.

Apart from that, the Sprague Grundy Theorem was also very cool as it basically allows us to generalize a lot of games to Nim. The fact that something as simple as MEX and DAGs can be used to model so many of these is mindblowing honestly.

Resources:
+ #link("https://anurudhp.github.io/blogs/2021/02/23/sprague-grundy-understanding-the-xor.html")
+ #link("https://cp-algorithms.com/game_theory/sprague-grundy-nim.html")
+ #link("https://codeforces.com/problemset/problem/2004/E")[This problem on CF has a very elegant solution using Nim.]

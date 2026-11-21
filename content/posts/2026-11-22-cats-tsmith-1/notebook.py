import marimo

__generated_with = "0.25.2"
app = marimo.App()


@app.cell(hide_code=True)
def _():
    import marimo as mo
    return (mo,)


@app.cell(hide_code=True)
def cell_a181fea5cfc3(mo):
    mo.md(r"""
    working through  https://arxiv.org/pdf/2212.12538
    new stuff:
    1. locally small categories
    2. free category on a graph
    - use lists representing a path between two nodes
    - obj = nodes, morphisms = lists of paths between two nodes, composition = concatenation of list, id = empty path to same node.
    - associative, composable (check).
    3. left unital and right unital are diff

    """)
    return


@app.cell(hide_code=True)
def cell_92880e17c83f(mo):
    mo.md(r"""
    **/ask** the category where only one commutes, can that be defined — “this diagram should commute”

    Yes, you can define it, but it's a different and less useful category than the usual one. I earlier said it wasn't standard. That was too strong, because it can be defined.

    Take graphs as objects. A morphism is a pair $(f_0,f_1)$ with $f_0: G_0\to H_0$ and $f_1: G_1\to H_1$ that satisfies only the source equation, $s_H\circ f_1 = f_0\circ s_G$. Composition and identities are componentwise. The source equation is preserved under composition, so the category laws hold.

    This category is legitimate, but it has a different meaning. Each edge keeps its starting point, and its endpoint is free to move. In effect, a graph becomes a set of vertices with a family of "outgoing" labelled items. It no longer models edges that connect two vertices. For colourings, it would accept maps that are not proper colourings, because only the sources of edges would be respected.

    The category of graphs uses both squares because both endpoints must be preserved.
    """)
    return


@app.cell(hide_code=True)
def cell_03183de119f1(mo):
    mo.md(r"""
    ![graph homomorphisms = morphisms](media/graph-homomorphisms-morphisms-782676.html)
    """)
    return


@app.cell(hide_code=True)
def cell_2184f13528f4(mo):
    mo.md(r"""

    quotienting a free category by a given relation.

    to do this we first define
    relation on a category = family of relations formed by considering relations defined on homsets between objects = subsets of cartesian products of parallel morphisms.

    congruence on a category = relation on category st consituent relations respect the compositional structure.
    """)
    return


@app.cell(hide_code=True)
def cell_1286bc9b51ca(mo):
    mo.md(r"""
    **/ask** Explain “"Parallel paths" only applies when $\mathsf{C}$ is a free category on a graph, w…”

    "Path" is the word for a morphism in a *free* category. There, a morphism from $a$ to $b$ is a list of edges that leads from node $a$ to node $b$. That's why your notes describe them as paths. So "parallel paths" means two such lists with the same start and end node.

    A general category doesn't have to be built from a graph. Its morphisms can be functions, matrices, or order relations, and they aren't lists of edges. The general idea is **parallel morphisms**: two morphisms $f,g: a\to b$ with the same domain and codomain. "Parallel paths" is just the special case where the morphisms happen to be paths.

    For example, in $\mathsf{Set}$, the functions $x\mapsto x+1$ and $x\mapsto 2x$ from $\mathbb{N}$ to $\mathbb{N}$ are parallel. Neither is a path, but a relation on $\mathsf{Set}$ could still relate them.
    """)
    return


@app.cell(hide_code=True)
def cell_52a27c5be42b(mo):
    mo.md(r"""
    **/ask** Explain the intution visually in three steps about how the relation gets "enriched" and how without it, it would fail with counterexamples for both steps — “**/ask** Explain closures with a counterexample that I will visualize — “and g »…”

    The relation is built up in three stages. Each stage fixes something the previous one can't.

    **Step 1: Start with the given pairs.** Draw one arrow for each pair you were given: $x \sim y$ and $kye \sim z$.
    ```
    b ==x,y==> c          a --kye--> d  ~  a --z--> d
    ```
    **Step 2: Close under composition (the » step).** Whenever $x \sim y$, you also relate every path built by putting the same pieces before and after them. Here that gives $kxe \approx kye$.
    - *Failure without this step:* take only $x\sim y$. A congruence has to respect composition, but $kxe$ and $kye$ are then unrelated. That means "equal" parts can be swapped into a longer path and produce something "different".

    **Step 3: Close under equivalence (reflexive, symmetric, transitive).** Chain the arrows together. From $kxe \approx kye$ and $kye \sim z$, you get $kxe \approx z$.
    ```
    kxe ≈ kye ~ z   ⟹   kxe ≈ z
    ```
    - *Failure without this step:* stop after step 2. Then $kxe$ and $z$ are both related to $kye$ but not to each other. That isn't even an equivalence relation, and a congruence must be one.

    **Why you may need to repeat the steps.** New pairs from step 3 can be composed with other paths, which gives new pairs for step 2. In general you alternate until nothing changes. The usual shortcut is to define $\approx$ as the *smallest equivalence relation closed under composition*.
    """)
    return


@app.cell(hide_code=True)
def cell_b623f5cd074b(mo):
    mo.md(r"""
    ![/ask Explain the intution visually in three steps about h…](media/ask-explain-the-intution-visually-in-thr-a3afbf.html)
    """)
    return


@app.cell(hide_code=True)
def cell_1fc149bac2aa(mo):
    mo.md(r"""
    functor = map objects and morphisms of one category into another category that preserves domains, codomains, identies and composition.

    a functor is a cuter graph homomorphism between the underlying networks of two categories.
    functoriality = composability and identity preserved along with adjacency
    """)
    return


@app.cell(hide_code=True)
def cell_ac88308b868f(mo):
    mo.md(r"""
    ## Hom Functors

    Covariant = same direction as composition = out 
    $C(c, -)$ i.e. its defined on an object.
    obj -> mapped from obj in cat to hom sets going out of the object i.e. (c, x) for each object x
    morphisms -> if an object x mapped to object y in the original cat, the hom functor *post composes* on morphisms i.e. it takes a morphism g1 from x to y and defines a "morphism valued morphism" that maps each function in the hom set f1 to a composite function $g_1 \circ  f_1$

    Contravariant = opposite direction as composition = in

    Opposite category = reverse all the arrows, compositionality follows from original.

    Contravariant hom functor is just a covariant hom functor on the opposite category

    Covariant functor = *pushforward* because of postcomposition. A function from c to x is pushed forward into y

    Contravariant functors = *pullback* because of precomposition.  A function from y to x is pushed back into c.
    """)
    return


@app.cell(hide_code=True)
def cell_65b624e760ea(mo):
    mo.md(r"""
    **/ask** Give me intution for the pushback and pullforward, ideally something that can be made visual too. and with physical understanding of why these objects are defined — “Contravariant hom functor is just a covariant hom functor on the opposite catego…”

    Pushforward and pullback (your "pushback" and "pullforward") are the same idea as covariant and contravariant hom functors. Both describe how a map $g: x\to y$ transports "ways of probing" the objects.

    **Probes.** Think of $C(c,x)$ as all the ways of *probing* $x$ with a test object $c$. Think of $C(x,c)$ as all the ways of *observing* $x$ from $c$.

    - **Pushforward (covariant, $C(c,-)$).** A probe $f: c\to x$ lands in $x$. If you have $g: x\to y$, you can push the probe along: $g\circ f: c\to y$. The probe travels forward with $g$.
      ```
      c --f--> x --g--> y      probe of x  ⟹  probe of y
      ```
    - **Pullback (contravariant, $C(-,c)$).** An observation $h: y\to c$ reads out $y$. If you have $g: x\to y$, you can pull it back to $x$: $h\circ g: x\to c$. The observation travels backward, because $x$ maps into $y$ and so can be read through $y$'s observation.
      ```
      x --g--> y --h--> c      observation of y  ⟹  observation of x
      ```

    **Physical picture.** Take a map $g$ as a "coarse-graining", for example from a detailed state to a summary. A measurement defined on the summary $y$ automatically gives a measurement on the detailed $x$ (pull back: just summarize first, then measure). In the other direction, a way of placing something into $x$ gives a way of placing it into $y$ (push forward).

    **Link to your highlighted line.** Pullback reverses arrows, so it's pushforward in $C^{op}$. The arrow $g$ becomes $g^{op}: y\to x$, and "post-composing in $C^{op}$" is "pre-composing in $C$".
    """)
    return


@app.cell(hide_code=True)
def cell_7231a5eaa2f3(mo):
    mo.md(r"""
    ![/ask Give me intution for the pushback and pullforward, i…](media/ask-give-me-intution-for-the-pushback-an-4de5e1.html)
    """)
    return


@app.cell(hide_code=True)
def cell_f2a84bbdc52b(mo):
    mo.md(r"""
    **/ask** and what if there were multiple morphisms, its applied to each morphism between x and y? — “in the hom set (c,x) and map them to the post composition g(f(c,x)) which is a f…”

    Two different sets of morphisms are involved, so it helps to keep them apart.

    - **Morphisms in the hom set $C(c,x)$** are the inputs. If there are several, say $f_1, f_2, \dots$, then $C(c,g)$ post-composes $g$ with every one of them: $f_i \mapsto g\circ f_i$.
    - **Morphisms between $x$ and $y$** are different. Each one, say $g$ or $g'$, gives its own function $C(c,g)$ or $C(c,g')$. Both go from $C(c,x)$ to $C(c,y)$, but they can act differently: $f\mapsto g\circ f$ versus $f\mapsto g'\circ f$.

    So the functor sends each morphism $g: x\to y$ to one function between hom sets. That function is then applied to every element of $C(c,x)$.

    For example, if $C(x,y)=\{g,g'\}$ and $C(c,x)=\{f_1,f_2\}$, you get two functions, $C(c,g)$ and $C(c,g')$. Each has two outputs, so there are four composites in total: $g\circ f_1$, $g\circ f_2$, $g'\circ f_1$ and $g'\circ f_2$.
    """)
    return


@app.cell(hide_code=True)
def cell_e430c00650cb(mo):
    mo.md(r"""
    errors:
    1. pg 27: graph homomorhpism $f_0$ should be from $G_0$ to $H_0$ 
    """)
    return


if __name__ == "__main__":
    app.run()

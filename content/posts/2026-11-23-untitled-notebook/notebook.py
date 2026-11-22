import marimo

__generated_with = "0.25.2"
app = marimo.App()


@app.cell(hide_code=True)
def _():
    import marimo as mo
    return (mo,)


@app.cell(hide_code=True)
def cell_1ce080a877c0(mo):
    mo.md(r"""
    enriched categories
    - hom objects don't just have to be sets. what you do when you compose is you take an element from the product of the hom sets.
    - given a suitable definition of a product, and of this mechanism of placing "side by side" that is composition you can have any type of hom objects like hom vector spaces or hom topological spaces. 
    - that definition of product is the tensor product. 
    composition defined as follows:
    $∘
    :
    hom
    (
    y
    ,
    z
    )
    ⊗
    hom
    (
    x
    ,
    y
    )
    →
    hom
    (
    x
    ,
    z
    )$
    """)
    return


@app.cell(hide_code=True)
def cell_8a35103415f7(mo):
    mo.md(r"""
    tensor units in categories

    these are the commutative squares for an enriched category.
    basically 
    1. set of objects
    2. hom sets b/w objects are E objects of some other category
    3. for each object a, a morphism $I -> C(a,a)$ this is equivalent to identity 
    It can't be defined directly because hom set isn't a set anymore .
    So you *pick out* using the unit map (type theory explanation below)
    but basically consider it a map from the type unit on an object of endomorphisms onto a. 
    you pick one from them thats consistent with composition and unit laws which makes it unique.

    this is why morphisms out of unit are called "generalized elements"

    4. composition is nicely defined as below. 
    CAVEAT: check the order is reversed
    intution: 

    Composition is defined as:
    \[
    \circ_{a,b,c}: C(b,c)\otimes C(a,b)
    \longrightarrow C(a,c)
    \]

    the order is reversed

    If \(f:a\to b\) and \(g:b\to c\), then:
    \[
    g\circ f:a\to c
    \]

    So the morphism applied first, \(f\), appears on the right.

    ![image](media/image-d25e31.png)


    """)
    return


@app.cell(hide_code=True)
def cell_4b76998fc04a(mo):
    mo.md(r"""
    **/ask** what does it mean in terms of types and shapes and closed cartesian categories — “3. for each object a in C, an E-morphism ida : I Ñ Cpa, aq witnessing identity; …”

    In a cartesian closed category (CCC), which is the setting for simply typed λ-calculus, the unit $I$ is the terminal object $1$. Its type-theoretic reading is the **unit type**, which has exactly one value, `()`.

    - **Types:** A morphism $1 \to A$ is a "closed term of type $A$". It's a value you can write down with no inputs. So $\mathrm{id}_a : 1 \to \mathcal{C}(a,a)$ says "there's a particular value of type $a \to a$", which is the function `λx. x`.
    - **Shapes:** $\mathcal{C}(a,a)$ is the object of all endomorphisms of $a$. In a CCC this is the exponential $a^a$, which is the function type $a \Rightarrow a$. Picking a point of it, $1 \to a^a$, selects the identity function.
    - **Why a CCC is a special case:** A CCC is enriched over itself, with $\otimes = \times$ and $I = 1$. Composition is $(b \Rightarrow c) \times (a \Rightarrow b) \to (a \Rightarrow c)$, which is function composition as a term. The identity is $1 \to (a \Rightarrow a)$.

    In a general monoidal category, $\otimes$ need not be cartesian. You can't always copy or discard data, which is what happens in linear types and quantum settings. The definition with $I$ and $\otimes$ is therefore more general than "a function type with a value of it".
    """)
    return


@app.cell(hide_code=True)
def cell_4a0ae6b2767c(mo):
    mo.md(r"""
    cute result:
    vector spaces are enriched over themselves!
    this is because of the relation between bilinearity and tensor products
    unit type is just the underlying scalar field
    Identity is determined upto scaling
    """)
    return


@app.cell(hide_code=True)
def cell_f475abadc7da(mo):
    mo.md(r"""
    proset = preorder, theres a notion of inequality. 

    consider the dags of each category. for product we consider all pairs of points now but only connect them when there's an and over inequality. 

    we can enrich a category with a proset instead of a set. This means that composition will keep the notion of inequality
    (both the homsets will be ordered, check definition of enrichment carefully the tensor product only comes in when defining composition). 

    So, we can compare compositions as well, this can become useful if theres relations between morphisms (spoiler!!)

    """)
    return


@app.cell(hide_code=True)
def cell_20f2d79bf8a0(mo):
    mo.md(r"""
    y
    """)
    return


@app.cell(hide_code=True)
def cell_e27388a16f1a(mo):
    mo.md(r"""
    snafus:
    1. 1-category hasn't been defined before this.

    """)
    return


if __name__ == "__main__":
    app.run()

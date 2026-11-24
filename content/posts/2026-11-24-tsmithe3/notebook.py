import marimo

__generated_with = "0.25.2"
app = marimo.App()


@app.cell(hide_code=True)
def _():
    import marimo as mo
    return (mo,)


@app.cell(hide_code=True)
def cell_5703cb49e6b8(mo):
    mo.md(r"""
    E- functor
    ![image](media/image-cfe9ef.png)


    basically, you dont have to quotient out the data as in normal categories because the hom set itself has some structure thats encoded in the diagram when you impose a J object onto it.

    """)
    return


@app.cell(hide_code=True)
def cell_8523e0d5988f(mo):
    mo.md(r"""
    **/ask** Explain this intuitively — “- The closing paragraph says a diagram in $\mathcal{C}$ is an $\mathcal{E}$-func…”

    - **Diagram = shape + interpretation.** A diagram is a little "blueprint" category $J$ (dots and arrows) plus a functor $J\to\mathcal{C}$ that says which objects and morphisms of $\mathcal{C}$ those dots and arrows are.
    - **Ordinary case:** if $J$ has two different routes from $a$ to $b$, you usually force them to be equal. This makes the diagram commute, but you lose the fact that there were two routes.
    - **Enriched case:** you can keep both routes as separate morphisms. The relationship between them is stored as extra data, a "filler", such as a 2-cell or a homotopy. Think of a square where the two paths aren't equal, but a specified patch fills the gap between them.
    - So "commutes" stops being a yes/no property and becomes structure you choose and carry along.

    A correction to my earlier wording: the filler is not literally stored in $J(a,b)$ as a separate piece. It is extra structure in the hom-objects of $J$ and $\mathcal{C}$, and the functor has to respect it. For example, in chain complexes it would be a homotopy between the two composite maps.
    """)
    return


@app.cell(hide_code=True)
def cell_3a51940759e1(mo):
    mo.md(r"""
    ## 2- Categories
    - category enriched by categories. They have hom categories

    Definition 2.2.11. A strict 2-category is a category enriched in the 1-category Cat. This means
    that, instead of hom sets, a 2-category has hom categories: the objects of these hom categories are
    the 1-cells of the 2-category, and the morphisms of the hom categories are the 2-cells; the 0-cells
    of the 2-category are its objects. To distinguish between the composition defined by the enriched
    category structure from the composition within the hom categories, we will sometimes call the
    former horizontal and the latter vertical composition.
    """)
    return


@app.cell(hide_code=True)
def cell_f0d8f4aed36f(mo):
    mo.md(r"""
    ![2- Categories](media/2-categories-181551.html)
    """)
    return


@app.cell(hide_code=True)
def cell_da72032a07af(mo):
    mo.md(r"""
    ![Using the product of categories, we can gather the co- an…](media/using-the-product-of-categories-we-can-g-4654cb.html)
    """)
    return


@app.cell(hide_code=True)
def cell_eb379e1b07ae(mo):
    mo.md(r"""
    ## Natural Transformations 

    A morphism in the category of functors.

    """)
    return


if __name__ == "__main__":
    app.run()

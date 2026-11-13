# Thin wrappers around tools/nb. `make help` lists them.
.PHONY: help new publish serve setup
help:
	@tools/nb --help
new:            ## today's notebook post; make new SLUG=spectral
	@tools/nb new $(SLUG)
publish:        ## commit + push every changed post
	@tools/nb publish
serve:          ## preview at http://localhost:1313/blog/
	@tools/nb serve
setup:          ## .venv + Jupyter kernel "blog" + local hugo
	@tools/nb setup

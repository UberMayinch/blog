#import "../templates/post.typ": post

#show: post.with(
  title: "Git Internals 2: Initialize new directory with plumbing commands",
  date: datetime(year: 2024, month: 7, day: 1),
)

In the previous post I went over the internal workings of git commands. In this post we initialize a new git repository only using linux utilities and git plumbing commands.

=== What are plumbing commands
- In an analogy drawn from toilets, git has two types of commands: Plumbing and Porcelain commands.
- Porcelain commands are high-level and abstract away lot of the internal working whereas Plumbing commands are low-level and allow you to actually look "under the hood".

Examples of porcelain commands:
```bash
git init
git add
git commit -m "text"
```

Examples of plumbing commands:
```bash
git hash-object
git cat-file
git commit-tree
git update-ref
```

== Initializing an empty git repository: Porcelain

```bash
git init
git add .
git commit -m "initial commit"
```
Now, we'll look under the hood of how git works as we try to accomplish this with plumbing commands.

== Initializing and Commiting with Plumbing

*Definition:* A repository is a collection of commit objects used to track changes in a directory.\
*Definition:* A working tree is a directory associated with a certain repository.

- The repository is initialized in a `.git` directory.
- Git doesn't commit directly from the working tree, everything must go through a staging area tracked by a file called `index` in your `.git` directory.
- For tracking changes, a repository needs to store the objects (in `objects/`) and a system for naming them (in `refs/`).

```bash
.git
├── refs
└── objects
```

However, this is not enough. We are missing a HEAD pointer. For this we use:

```bash
git hash-object -w
```
Creates a hash of an object and writes it to your objects folder using multi-level hashing.

```bash
git cat-file -p
```
Prints the contents of a file with a given hash.

```bash
git update-index --add --cacheinfo 100644 path
```
Adds the object at the given path to the index.

```bash
git write-tree
```
Takes the index file and creates a tree object out of it and returns a hash.

```bash
git commit-tree
```
A commit is nothing but a reference to a tree object so this creates a commit object and returns its hash.

```bash
git update-ref
```
Updates the reference pointer.

== Bonus: Changing branches
Since a branch is nothing but a named reference to a commit, changing branches is actually quite easy. It just involves creating another file in the `.git/heads/refs` directory and changing the HEAD pointer.

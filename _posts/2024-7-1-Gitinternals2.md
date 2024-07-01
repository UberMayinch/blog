---
title: "Git Internals 2: Initialize new directory with plumbing commands"
layout: post
---

In the previous post I went over the internal workings of git commands. In this post we initialize a new git repository only using linux utilities and git plumbing commands. 

### What are plumbing commands:
- In an analogy drawn from toilets, git has two types of commands: Plumbing and Porcelain commands.
- Porcelain commands are high-level and abstract away lot of the internal working whereas Plumbing commands are low-level and allow you to actually look "under the hood". 

examples of porcelain commands:
```bash
git init
git add
git commit -m "text"
```

examples of plumbing commands:

```bash
git hash-object
git cat-file
git commit-tree
git update-ref
```
don't worry if you haven't seen these commands earlier. This post will show the basic required usage in an example. 

## Initializing an empty git repository: Porcelain

If you're reading this tutorial, chances are you have probably initialized a git repository at some point in time. 
To create a new repository and commit to it is pretty straightforward with porcelain commands:

```bash
git init
git add .
git commit -m "initial commit"
```
Now, we'll look under the hood of how git works as we try to accomplish this with plumbing commands. 

## Initializing and Commiting with Plumbing
**Definition**: A repository is a collection of commit objects used to track changes in a directory.
**Definition**: A working tree is a directory associated with a certain repository.
- The repository is initialized in a .git directory. 
- Git doesn't commit directly from the working tree, everything must go through a staging area. This is tracked by a file called index in your .git directory. 
- For tracking changes, a repository basically needs to store the objects (stored in objects directory) and a system for naming those objects and the different versions they have (stored in refs directory). 
- Adding both of these, this is what our directory looks like currently:
```bash
.git
├── refs
└── objects
```
however, this is not enough (as we can see if we use git log or git status in the parent directory).
We are missing a HEAD pointer which should point to a commit object ahead of which our new commit will be inserted.
But from the previous post we know that a commit object is nothing but a snapshot of a tree object i.e. a pointer to a tree object. 
For this we will use the following commands

```bash
git hash-object -w 
```
This basically creates a hash of an object and writes it to your objects folder. It uses multi-level hashing so the first two letters of the hash are used to create a directory and the rest of the hash letters are stored as files within that directory. 

You can confirm that this has worked correctly with the following

```bash
git cat-file -p
```
This will print the contents of a file with a given hash to the terminal (though in most cases it would be binary gibberish).

```bash
git write-tree
```
this takes the index file and creates a tree object out of it and returns a hash of that tree object. this object is also added to the objects directory. Since our filesystem can be modelled as a tree, any changes will also be in a subtree (possibly improper) of the whole system. This means that having information in this format is actually enough for all the version control we may need. 

```bash
git commit-tree  
```
This is the beauty of git. A commit is nothing but a reference to a tree object so this creates a commit object and returns its hash. We simply add this to the current branch we are on by adding it to the file /.git/refs/heads/branch_name and we are done. 
This can be done by ```echo```ing it directly into that file or using the following:

```bash
git update-ref 
```
the pointer HEAD automatically points to the correct place now.

## Bonus: Changing branches
Since a branch is nothing but a named reference to a commit, changing branches is actually quite easy. It just involves creating another file in the ```/.git/heads/refs``` directory and changing the HEAD pointer to point to that file instead of master. 
This is what git checkout accomplishes. The steps for adding and commiting remain entirely the same. 

It is quite interesting to see how much is going under the hood even when we use a simple command like git add and git commit. 





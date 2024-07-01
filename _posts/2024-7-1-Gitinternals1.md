---
layout: post
title: "Git Internals 1: Blobs, Trees, Commits"
usemathjax: true
---

I've been using git for a good amount of time but haven't gotten really good at it.
I think that learning how things work under the hood often helps me use them better which is why I'm attempting to learn git better. 
These are my notes from what I've learnt. 

## 1 Types of Objects in Git

1. BLOB (Binary Large Object Files)
- These are like normal files except for the fact that they don't have any metadata such as author or time of creation. 
- They are referred to by their SHA1 hashes. 

2. Trees 
- These are the equivalent of directories in git. Their contents include hash values of the BLOBs contained in them and other trees.
- They are also referred to by their SHA1 hashes which are dependent on the content they have. 

3. Commits
- A commit is a snapshot of a filesystem i.e Tree and the fundamental object in git. 
- It is also referred to by its SHA1 hash depending not only on the contents of the working tree but also other parameters such as author of commit, time of commit, commit message, parent commit etc. 
- If we have stored the parent commit then instead of storing the whole tree again, we only need to store what has changed across commits. 


## 2 Branches in Git

**Definition:** A branch is a named reference to a commit. 

- So a branch is just a pointer to a commit object. 
- By default, repos are initialized on the master or main branch. 
- The repository has a variable called HEAD which is a pointer to the current branch the repository is on (that is, the commit that will be considered a parent commit for the next commit).
### Commands from this section:
```bash
git branch new_branch
```
creates a new branch called new_branch however HEAD still points to master/main so your new commit would still go to master/main and not new_branch.
```bash
git checkout new_branch
```
this sets the HEAD pointer to the new_branch branch
```bash
git checkout -b new
```
This command acheives creating and switching to a new branch in one step.

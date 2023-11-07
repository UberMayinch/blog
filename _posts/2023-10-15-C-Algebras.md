---

layout: post
title: "C* and W* Algebras"
usemathjax: True

---
I recently came across C and W algebras which are basically just formalizations of the spaces we do quantum mechanics in. 

Formally, we start with the following:
   
**Definition:** A $$C^*$$ algebra is a (complex) banach space (complete normed vector space) equipped with a unary operator (involution) $$*$$ which satisfies the following:

   1. It is conjugate linear:
\
        $$(a \lambda + b)^* = a^* \bar \lambda+ b^*$$
   2. It is antihomomorphic:
\
        $$(a b)^* = b^* a^*$$
\  
   3. **C\* Property-** $$\|a * a\| = \|a\|^2$$

A $$W^*$$ algebra is just a $$C^*$$ Algebra such that there exists a banach space which is it's dual. 

The intution I understand uptill now is to consider these as the hilbert space of state vectors where we do classical QM. 

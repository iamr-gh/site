---
title: 'Better Software, Faster'
pubDate: 2025-12-22
description: 'My goals for all software I write.'
author: 'Ibrahim Musaddequr Rahman'
tags: ['meta']
---

<!--I once had something more profound for this, but I don't recall anymore-->
<!-- and some point, should have some piece about tools-->
# Better Software, Faster

I've created a [personal site](/blog/why) to showcase and document my projects. As I do so, these are some guiding principles for how I write software going forward. 

## Properties of Software

### Simplicity and Organization

Less code is better, but not at the expense of clarity. Brevity matters, but simplicity comes first. When a cleaner solution exists, use it.

Code should be descriptive and organized across reasonably-sized, well-named files. Avoid both excessive fragmentation and monolithic files. If forced to choose, prefer the latter. Both practices proactively reduce technical debt as projects scale.

### Performance

Modern compilers and hardware are extraordinarily capable. Noticeable lag demands justification.

For most websites and CLI tools, content should load instantly. Performance isn't about specific language choices; it's about refusing to accept unnecessary slowness. Computational heavy lifting (machine learning, graphics rendering) earns a pass, but everything else should be as responsive as possible.

### Portability

Cross-platform software is ideal. The web is the most universal platform, but supporting multiple operating systems suffices. This starts with choosing cross-platform toolchains from day one. On this site, I will deploy tools targeting WebAssembly or JavaScript.

Non-cross-platform software needs clear toolchain justification. I don't do mobile or native development, so these restrictions rarely concern me.

### AI Usage

AI assistance should be invisible. When used, output must meet human quality standards—this applies to writing and code equally.

AI accelerates work; it doesn't excuse laziness. The standard should be **AI-generated, human-verified** for any tool in this space.

## Properties of Development

### Rapid Initial Prototyping

Complex projects need achievable checkpoints. Reaching the first checkpoint quickly is critical—it prevents wasted effort and surfaces hard problems early.

### Incremental Debugging

When progress stalls, decompose the blocker into manageable pieces. AI helps break through obstacles with fresh perspective. Projects demanding intense mental engagement are vulnerable to motivation loss and abandonment-consistent, incremental progress is the antidote.

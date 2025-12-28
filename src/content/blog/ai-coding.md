---
title: 'AI Coding'
date: 2025-12-24
author: 'Ibrahim Musaddequr Rahman'
tags: ['ai']
---

# Experiments with AI Coding

AI coding has become substantially better in the last 6 months. I don't use AI coding much in my workflows, beyond auto complete. In this blog post, I evaluate how useful these tools are at solving my problems. This is not with respect to any benchmark other than my personal real life usage.

Personally, I primarily use neovim+tmux as my editor setup, preferring to be closer to the terminal. A lot of the popular tools(e.g. Cursor) are based on VSCode-style workflows, which often feel inelegant to me. This does not stop me from using these tools, but I don't find them as useful because I feel an inherent slowdown that contrasts whatever ai benefits I get.

As such, I am actively looking for more terminal-native ai-coding tools and ways to integrate into my existing neovim workflows.

## General Methodology

**AI-Generated, Human Verified** is my standard in these situations. The general workflow is I would discuss with a planning agent my vision for the changes, and once it wrote a plan with enough specifity to match my goals for a task, I would allow a building agent to execute that plan and interact with the environment to run tests, etc. After it built a solution, I would do QA and give feedback, reporting errors or further pieces I wanted changed with respect to the overall product.

This plan-execute segmentation was helpful ebcause 

<!-- need to work on this-->
## Tools Used

### Models

OpenCode Fine-Tuned(Big Pickle)

Opus-4.5

GLM 4.7

### SuperMaven(Autocomplete)

### OpenCode(Agentic)


## Completing Tasks

 <!-- end up linking more of these-->
### Website
I have been meaning to update my personal site for awhile, making the styling more professional and providing and 

### ML Deployment to WebAssembly

This is a nontrivial and relatively annoying task. It is nost something that is commonly done, and 

Big Pickle:
fake frontend that doesn't work
decent datascience and conversion scripts, came up with a plan that sounded reasonable to me.

Opus was able to do it, cost like $8 of inference. Weaker models I used were not able to solve the problem, this had a lot of small places to cycle. 

For example, being able to look at the pt file, acknowledging small details like noticing the training script being different than the default args for the model.
The final code output for opus was much shorter than the code output from the failed attempts, and it _still_ required one edit cycle of reporting errors, but it did produce a functional product and quality code in an annoying domain. Small things like splitting the code into two pieces, the pretrained hf and the trained regression head were really smart decisions.


## General Takeaways

## Vibe Waiting
These models are quite powerful, but due to the both the amount of code they are analyzizing, and the computation load of running an LLM, agents can take awhile to solve each problem. For simple tasks, this amount of time can frequently be longer than an experienced dev would solve the problem. Because of this, I would recommend **never block your productivity waiting for AI**. The biggest benefit of these tools come from the ability to delegate while handling other things, not as a form of laziness. You might get an agent running on the second/less difficult problem you need to solve, so after you solve your first problem, there's a chance the second problem is done, or at least partially worked on. This mindset can be scaled up to keeping multiple agents running at once, which is a common strategy and ends up being akin a boss or pm on a team.

As would be expected, the more files that LLM needs to edit, or even the magnitude of the edits themselves, drastically increases the wait time. Good code practices such as minimizing duplication can allow agents to function more effectively as well.

## Context

All at once vs micro editing.

## Intelligence and Code Efficiency

This behavior is not unique to coding models, but on tasks that are more complex, there can be an intelligence cutoff where smaller moodels are much less efficient, and generate far more code without solving the problem, compared to the clean principled correct approach to the problem. This is the difference between Opus 4.5 and other models.


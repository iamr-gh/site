---
title: 'Building a Coding Agent'
pubDate: 2026-01-09
description: 'Designing a Coding Agent'
author: 'Ibrahim Musaddequr Rahman'
tags: ['ai']
---

# Designing a Coding Agent

## What?

An 'agent' is an LLM with access to tools to interact with an environment, directed to loop on solving a task, often with planning and action stages.

A coding agent is one of these focused around writing code, based around the terminal.
They are uniquely powerful due to the connection between language and action that occurs via programming languages and various command line utilities.

My primary interest is in terminal-native tools like opencode, claude code, gemini-cli, and codex.
I am an nvim user, and feel like there is increasing less reason to remove yourself from the terminal using GUI tools(e.g. Cursor, Antigravity, Windsurf).

## Why?

Claude code has performance issues that make me doubt it's implementation, and the big three have intentional lock in the model providers.
I like opencode, but still have rough edges to my development flow.

I don't think these things should be that hard to create, modern models ship with higher quality context management and reasoning such that prompt engineering is far less required than it used to be.


## Governing Ideas

The UI and core code agent functionality should be split from each other.

Should be a simple as possible, with minimal dependencies.

Extensibility comes downstream from simplicity.

One reach abstraction goal is creating something composable, where sub agents follow naturally.

Try to have deliberate design ideas, I think a lot of work can be done at the interface level.

Stateful, nothing is lost. I really like the idea of different parts getting RL'd.
Long term is the idea of embedding baby models into binaries with self modifying code.

## Core Pieces

LLM interface: prompts back and forth, ideally as cross compatible as possible(opencode Zen?).

Tools: some interpretation of the interaction into action

Prompting: how to guide the agents, and try to make planning and execution


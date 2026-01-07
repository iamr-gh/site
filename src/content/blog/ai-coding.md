---
title: 'AI Coding'
pubDate: 2026-01-05
description: 'Experiments in AI Coding'
author: 'Ibrahim Musaddequr Rahman'
tags: ['ai']
---

# Experiments with AI Coding

AI coding has become substantially better in the last 6 months. I don't currently use AI coding much in my workflows, beyond auto complete. 
I am starting a job to build [RL environments to improve coding agents](https://www.ycombinator.com/companies/idler), and I wish to get a better understanding of current abilities and limitations of the current technology.

In this blog post, I evaluate how useful these tools are at solving my problems by trying to unblock various stale side projects. This is not with respect to any benchmark other than my personal real life usage.

All observations are as of early January 2026.

## Overall Takeaways

If you don't want to read a long post, here are my quick takeaways:
1. **An experienced developer is still needed** to use these tools most effectively, pointing them in the correct direction and evaluating their decisions within a problem domain.
2. I found **agent speed and difficulty expressing the full nature of the problem to be my limiting factor** in use. Given enough time, I could often force the agent to solve most easy-medium difficulty problems. On harder problems, I usually gave up and did it myself.
3. **Acceptance criteria varies by problem domain**, and AI output code is often bloated. In some use cases like frontend, this is less of an issue, in others like performance-intensive code, each line matters.
4. **Intelligence in models matters.** The difference between Opus 4.5 and other alternatives is significant, and can minimize overall iterations needed as well as enable. Agentic IDEs have become good enough that the ball is back in the court of the model development.

<!-- need to work on this-->
## Tools Used
Personally, I primarily use neovim+tmux as my editor setup, preferring to be closer to the terminal. A lot of the popular tools(e.g. Cursor) are based on VSCode-style workflows, which often feel inelegant to me. This does not stop me from using these tools, but I don't find them as useful because I feel an inherent slowdown that contrasts whatever ai benefits I get.

As such, I am actively looking for terminal-native ai-coding tools and ways to integrate into my existing neovim workflows.

### SuperMaven(Autocomplete)

Supermaven is the autocomplete engine used(and acquired) by Cursor. However, you can still use it in other editors, with a generous free tier. 
It is the only AI-autocomplete I have tried that is as fast as an LSP, and what I use in neovim.

### OpenCode(Agentic)

[OpenCode](https://opencode.ai/) is a cli tool similar to Claude Code, but designed for support of any models on openrouter, and created by neovim users.
Like many of such tools, it consists of distinct "Plan" and "Build" agents, where you discuss with an agent that looks at the code base, and only once you are satisfied with the plan, you enable the agent to edit code and build it.
I found this workflow to be an improvement over methods, allowing agents to take full advantage of reasoning abilities. 
Hotkeys and UI were relatively nice, I mostly used OpenCode outside of neovim in a separate tmux tab, and then I would run and read the code afterwards to validate the results.

I found OpenCode to be relatively good at providing the models the tools to access the internet and my codebase, with reasonable permissions.
Most of the limitations described seem to be limitations of the models themselves, and as such, I did not try any other agentic tools within this testing.

### Models

Anthropic's Opus 4.5 is considered to be the gold standard in agentic coding, while being the significantly more expensive. I attempted to use cheaper alternatives when possible, but when they could not solve the problem, I used Opus 4.5.

OpenCode has their own fine tuned model(similar to Cursor's Composer) that was available for free, I used this in initial testing and it performed reasonably well for simple tasks.

[GLM 4.7](https://z.ai/blog/glm-4.7) was newly released during this project, and I switched to it over OpenCode's model. This model seemed to be good at understanding what was happening in the codebase, and is quite good at frontend given the relative cost of the model.

## Tasks Attempted

 <!-- end up linking more of these-->
### Personal Site
I have been meaning to update my personal site for awhile, making the styling cleaner and providing a respectable starting to point to write blog posts and showcase projects. 
I built out a static site using astro, and told the agent to use the reference materials of shadcn as a starting point.
I found GLM 4.7 and OpenCode's model to be more than sufficient for this task, allowing me to quickly build out much of the boilerplate that would've taken be hours to fiddle with by hand. 
In particular, higher level edits like theming were convenient to do via natural language.
More complex tasks like animations required more rounds of going back and forth with the agent about the particular behavior that was broken.

I found that in terms of speed, these models took about the same time to modify the codebase, regardless of the desired edit was large or small.
This was often due to a large amount of time being taken to read through the html and find the particular best point to modify.
For smaller changes, it was often much faster for me to make changes manually.
Because astro is a minimal web framework, it was very easy for me to validate and manually edit the HTML/CSS generated by the LLMs.
This codebase worked mostly in separate files, so it was easy to queue up multiple agents in parallel to work on different tasks, and then ping pong between feedback.

I don't particularly enjoy writing frontend, particularly styling, so I was appreciative that I could focus on the thinking tasks like writing blog posts while the agents fixed styling in the background.

You are currently looking at the result of such efforts [iamr.site](iamr.site). 
It is not perfect or flashy, but it is sufficient for [my use](./why.md).

### ML Deployment to WebAssembly

Seeing success in web development, I decided to try a harder task with more boilerplate.

For some [other research](https://github.com/iamr-gh/ejsay-gptability/blob/main/paper.pdf), I trained a small transformer model in PyTorch to classify assignments as more or less "GPT-able", to try to help educators better test students.
I wanted to deploy this in a way that it could run locally in the browser via WebAssembly.
WebAssembly toolchains are often a pain to work with, combining code in multiple languages that has to be shipped to the browser in a very particular way.
This task is still not intellectually complex, but requires a lot of googling and fiddling with the environment to get everything to build properly.
The final approach used involved compiling to the model to the ONNX format and quantizing it, and then loading that model into an ONNX web runtime and Transformers.js.

These complexities proved too much for the weaker models to handle, OpenCode's model generated large amounts of files that produced a pretty frontend in the browser, but failed to load the actual model and produce outputs.

The intelligence boost of Opus 4.5 was able to complete the problem, and it's solution was much simpler than the previous AI attempts. It identified subtleties the other models did not notice, such as that the model used a pretrained embedding, which could be loaded in from a separate optimized source for more efficiency. 
Because I had a paper written on the project, the model was able to efficiently understand that context of what this model was doing, and able to pull examples and language from the paper, producing a quality interactive tool.
Like the weaker models, this page did not work on first attempt. 
However, after pasting console error messages back to the agent a couple times, it was able to solve the problem where weaker models get stuck in a loop.

This process was not cheap. Even in an environment with minimal files and well formed context, this generation cost ~$8 of inference. Given my unfamiliarity, this probably would've taken me a couple hours of work, so a reasonable amount of time was saved. I suspect someone familiar with the space could get it done in under half an hour.

The code produced in this process was well documented, the commit can be viewed [here](https://github.com/iamr-gh/essay-gptability/tree/web_demo_opus/web_demo).
The results of this effort can be viewed at [iamr.site/gptability](iamr.site/gptability).

<!-- Add an image of page -->

### Bespoke QR Code Generator
I decided to now test the ability to transfer code over from another code base, as well as work in a less common language.
I previously wrote a (qr code generator from scratch)[https://github.com/iamr-gh/qr] in the programming language nim, which compiles to both assembly(through LLVM) and javascript for web deployments.

The first task for the coding agent was to take the existing webpage and integrate it into my current site, standardizing the styling and linking some navigation.
This task wasn't particularly difficult, the result is deployed at (iamr.site/qr)[iamr.site/qr].

<!-- and an image of page -->

The much harder task I gave Opus 4.5 was the extend the existing nim code. 
I implemented the most basic version of the qr code specification, which only supports URLs of 17 characters.
The higher versions of the specification are more complicated, combining extensions to the error correcting algorithm as well as spatial reasoning about different formats.
This task was admittedly quite difficult, but I was curious if such knowledge was within its training data or if it could look up existing implementations and translate them to another language.

<!-- image of v1 vs v2 qr codes?-->

Opus 4.5 was able to end up with nim code that compiled correctly and output a qr code of the correct size that looked reminiscent of the extended specification. However, these qr codes do not pass the test of an external reader. 
After prompting the model that it's code did not work, it introspected further, but without a checker integrated into the loop, it was unable to make progress on the problem. 
This process cost $13.29 to generate no useful results, and I cut it off at this point. 
For those curious about the attempt, the changes can be found [here](https://github.com/iamr-gh/qr/commit/d1a873bdd7e2a917010d7a4be50833e2c0e154cc).


### Game Development
With some knowledge of easy and hard tasks for coding agents, I wished to experiment with more medium difficulty tasks to find the exact lines of competence.
Game development is a space with a lot of space for code to be written, with a rich environment of varying levels of complexity and boiler plate.

I revisited a project where I was writing a small pathing engine for an RTS game using zig and raylib. 
In my particular interest, this problem boils down to creating responsive multi agent pathing and control in a 2 or 2.5 dimensional environment.
I'll write up a future blog post about the goals and challenges of this project, but think of this as within the algorithms and performance domain.

<!--boilerplate and default algorithms-->

This project was in early stages when I started consisting of just a rendered grid and mouse selection.
GLM 4.7 was able to bring this up to interactive single agent pathing in an environment with obstacles.
This was within the realm of common boilerplate, but still impressive that it output an implementation of A* within zig.

<!-- insert a gif of initial single agent pathing-->

The next step of this was where the complexity of the project lies, implementing multiagent pathing while trying to minimize collisions.
This involves modifying existing algorithms, creating a unique planner for this particular circumstance.
I again upgraded to Opus 4.5 for this task, and came across a difficulty not previously encountered: explaining the problem and my priorities. 
Opus did spit out a solution that began to address the problem, but it added layers and complexity and solved additional problems in ways not asked for.
For this example I'll explain some specific code, particularly the diffs between [Opus's implementation](https://github.com/iamr-gh/rts-engine/compare/1d430cf0b9a6665170709a4ebaacb8df19b0e012...e866330d0e04f09e80068117daf5af8f5b7e87ef)
and [my own implementation](https://github.com/iamr-gh/rts-engine/compare/1d430cf0b9a6665170709a4ebaacb8df19b0e012...a1c8a0a94688ccb07dbeac3dfdaec8c45db65077)
afterwards.

The specifics of this task was to 1) allow the selection of multiple agents and then 2) pick a set of goals for them based around the clicked point.
Because the paths needed to not collide, more than one location needed to be picked around the goal.
At this point, the task was only to pick the goals, not to force the pathing algorithm to avoid overlapping individual agent paths.
I went back and forth with the agent for some time in planning to explain this situation, as well as emphasize symplicity as a virtue when picking between multiple approaches.
To me, the solution to this problem would be a simple BFS around the target point, and then assigning agents arbitrarily to the points.

```zig
// my solution
pub fn getGroupGoals(obstacles: *ObstacleGrid, goal: ScreenPos, ...) !std.ArrayList(ScreenPos) {
    var goals = std.ArrayList(ScreenPos).empty;
    var taken = std.AutoHashMap(ScreenPos, void).init(allocator);

    var toVisit = queue.Queue(ScreenPos).init(allocator);
    defer toVisit.deinit();

    try toVisit.enqueue(goal);
    try taken.put(goal, {});

    // bfs
    while (goals.items.len < count) {
        const curr = toVisit.dequeue().?;
        if (obstacles.obstacles.get(map.screenToGridCoord(curr, gridSize))) |height| {
            if (height >= 3) {
                continue;
            }
        }
        try goals.append(allocator, curr);
        for (crossDiagonalMovement) |move| {
            const movedPoint: ScreenPos = .{ .x = curr.x + move[0] * gridSize, .y = curr.y + move[1] * gridSize };
            if (taken.get(movedPoint)) |_| {} else {
                try taken.put(movedPoint, {});
                try toVisit.enqueue(movedPoint);
            }
        }
    }
    return goals;
}
```

Opus 4.5 implemented a much more complex algorithm, using a modified BFS with a range, calculating a centroid of the agents, and then placing them within a target region based on their offset from the centroid.
This algorithm does solve other problems not asked, however it is also 4-5x longer than my intended solution, and introduces far more edge cases and interactions.
I've added an (abridged) version of the code below just to convey how much more additional complexity this adds. 
There are also small bugs that went unannotated in the code, such as claiming the traversal was a BFS while using a datastructure that would yield a DFS.

```zig
// agent solution(some parts omitted)
fn gatherAvailableCells(
    targetPos: ScreenPos,
    count: usize,
    gridSize: i32,
    obstacleGrid: *const ObstacleGrid,
    maxSearchRadius: i32,
    allocator: std.mem.Allocator,
) !std.ArrayList(ScreenPos) {
    var result = std.ArrayList(ScreenPos).empty;
    errdefer result.deinit(allocator);

    // NOT ACTUALLY A QUEUE(-> DFS)
    var queue = std.ArrayList(ScreenPos).empty;
    defer queue.deinit(allocator);

    // <same bfs logic>
}

pub fn findGroupGoals(
    targetPos: ScreenPos,
    agents: []const Agent,
    gridSize: i32,
    obstacleGrid: *const ObstacleGrid,
    allocator: std.mem.Allocator,
    maxSearchRadius: i32,
) !std.ArrayList(ScreenPos) {
    var result = std.ArrayList(ScreenPos).empty;
    errdefer result.deinit(allocator);
    // Count selected agents and calculate centroid
    var selectedCount: usize = 0;
    var centroidX: i64 = 0;
    var centroidY: i64 = 0;
    for (agents) |agent| {
        if (agent.selected) {
            selectedCount += 1;
            centroidX += agent.pos.x;
            centroidY += agent.pos.y;
        }
    }
    if (selectedCount == 0) {
        return result;
    }
    centroidX = @divFloor(centroidX, @as(i64, @intCast(selectedCount)));
    centroidY = @divFloor(centroidY, @as(i64, @intCast(selectedCount)));
    // Snap target to grid center
    const targetSquare = grid.getSquareInGrid(gridSize, targetPos);
    const targetCenter = grid.getSquareCenter(gridSize, targetSquare);
    // Gather available cells near target (more than needed for flexibility)
    var availableCells = try gatherAvailableCells(
        targetCenter,
        selectedCount * 4,
        gridSize,
        obstacleGrid,
        maxSearchRadius,
        allocator,
    );
    defer availableCells.deinit(allocator);
    // Track which cells have been assigned
    var assignedCells = std.AutoHashMap(ScreenPos, void).init(allocator);
    defer assignedCells.deinit();
    // For each selected agent, find the best matching cell
    for (agents) |agent| {
        if (!agent.selected) continue;
        // Compute agent's direction from centroid
        const agentDx = agent.pos.x - @as(i32, @intCast(centroidX));
        const agentDy = agent.pos.y - @as(i32, @intCast(centroidY));
        // Check if agent is at centroid (or very close)
        const atCentroid = (@abs(agentDx) < gridSize and @abs(agentDy) < gridSize);
        const agentAngle = computeAngle(agentDx, agentDy);
        // Find best matching cell
        var bestCell: ?ScreenPos = null;
        var bestScore: f32 = std.math.inf(f32);
        for (availableCells.items) |cell| {
            if (assignedCells.contains(cell)) continue;
            // Compute cell's direction from target
            const cellDx = cell.x - targetCenter.x;
            const cellDy = cell.y - targetCenter.y;
            const cellAtTarget = (cellDx == 0 and cellDy == 0);
            // Score = angular difference + small distance penalty for tie-breaking
            var score: f32 = 0;
            if (atCentroid) {
                // Agent at centroid prefers cells closest to target
                const dist = @as(f32, @floatFromInt(@abs(cellDx) + @abs(cellDy)));
                score = dist;
            } else if (cellAtTarget) {
                // Target cell has no angle - give it a moderate score
                // (center-most agents will claim it due to their low scores)
                score = std.math.pi;
            } else {
                const cellAngle = computeAngle(cellDx, cellDy);
                const angularDiff = angleDifference(agentAngle, cellAngle);
                // Distance from target as tie-breaker (normalized)
                const dist = @as(f32, @floatFromInt(@abs(cellDx) + @abs(cellDy)));
                const distPenalty = dist / @as(f32, @floatFromInt(gridSize * 100));
                score = angularDiff + distPenalty;
            }
            if (score < bestScore) {
                bestScore = score;
                bestCell = cell;
            }
        }
        // Assign cell (or fallback to agent's current position)
        if (bestCell) |cell| {
            try assignedCells.put(cell, {});
            try result.append(allocator, cell);
        } else {
            // Fallback: use agent's current position
            const agentSquare = grid.getSquareInGrid(gridSize, agent.pos);
            const agentCenter = grid.getSquareCenter(gridSize, agentSquare);
            try result.append(allocator, agentCenter);
        }
    }
    return result;
}
```
<!-- maybe add a comparison here-->

I think this example highlights the exact challenges of using AI code within this domain.
The solution does work, and if you didn't look at the code, you might consider it sufficient.
However, this is the simplest piece of what is going to be a multipart pipeline of pathing, and it has added a large amount of complexity and unknown edge cases, while also being foreign for me to read.

The next change needed was to modify the A* algorithm to prevent the paths generated from colliding with each other, now that each agent was going to separate locations.
My solution involved a ~30 line modification to compute each agent's path sequentially, and then keep track of what agent occupied a given location at a given time and mark it impassable in the A* search.
This kind of change involved a small amount of code but a lot of thinking on my part on how to structure it.
Opus 4.5 attempted a longer change to solve the problem, but was unsuccessful(~$7 lost).

Interestingly, after writing my solution, I used GLM 4.7 to fix a small edge case regardling differing path lengths, and made that change correctly.

While the agents struggled in solving the pathing problems, they were successful elsewhere in the codebase in expanding the terrain generation.
Originally, the obstacles were placed uniformly randomly in the environment.
To have a more realistic terrain, I wanted mountain and hill formations of varying heights, easing from high to low.
In this effort, I was able to get GLM 4.7 to generate a procedural map generator that used perlin noise to create a graduated height map, and then bezier curves to create mountain ranges.
This is one of the sections of code that I almost exclusively use AI generation for, given that the results don't need to be perfect, and for me to solve the problem would be mostly searching up existing solutions.

This project is still under development, but current progress of all these efforts is shown below.
Going forward, I am mostly writing this code by hand, but I will use AI to scaffold out certain kinds of architecture and generate configurations and maps like the terrain.
<!-- gif of final progress-->


 <!-- ![Alt text](/images/blog/ai-coding/screenshot.png) -->


<!-- broader takeaways-->
<!-- 1. **An experienced developer is still needed** to use these tools most effectively, pointing them in the correct direction and evaluating their decisions within a problem domain. -->
<!-- 2. I found **agent speed and difficulty expressing the full nature of the problem to be my limiting factor** in use. Given enough time, I could often force the agent to solve most easy-medium difficulty problems. On harder problems, I usually gave up and did it myself. -->
<!-- 3. **Acceptance criteria varies by problem domain**, and AI output code is often bloated. In some use cases like frontend, this is less of an issue, in others like performance-intensive code, each line matters. -->
<!-- 4. **Intelligence in models matters.** The difference between Opus 4.5 and other alternatives is significant, and can minimize overall iterations needed as well as enable. Agentic IDEs have become good enough that the ball is back in the court of the model development. -->
<!---->
## Broader Observations

### Vibe Waiting and Time Management

### Connection to Code

### When is AI Good Enough?

## Going Forward

<!-- need to be a little more refined and specific on this-->
After this exploration, I primarily intend to use coding agents when I want to make frontend changes or do boilerplate heavy scripting, and have a low acceptance criteria(it looks pretty/the build works). 
For any more complex task, I prefer to write the code and do the setup myself.
My current headspace treats AI as a customizable blackbox dependency generator of sorts. 
If I am not willing to import a package I wouldn't read, I am not willing to use AI code for the problem.
Exceptions to this are when the changes are of small enough magnitude I can read them.

I have turned off AI autocomplete for most languages, I find that in the domains where it is useful, I can allow full fledged agentic coding, and if it's not, then it's usually distracting. 
I am not certain I'll keep it this way, perhaps I will turn it on again if I work in more boilerplate heavy environments.

In order for me to integrate agentic coding into more of my workflows, a core improvement would need to be speed.
Because the edits take so long, agents require various amounts of babysitting to be effective, which breaks my workflow and encourages me to get distracted and not give it close scrutiny.
These speed changes tie hand in hand with testing, as errors can be caught earlier via rapid iteration and validation of how well the current solution fits the problem.
This is how I prefer to use LLMs for search, faster models that give a quick response which I can then steer to the answers I am looking for, rather than trying to put in some prompt/context engineering work ahead of time, and not know whether it would pay off.
A much more intelligent model that could confidently one-shot any problem and resolve all edge cases would also resolve this concern, 

I think my use will change in the future, and I am impressed by how much these tools have improved in the last 6 months.
My message to foundational model companies is to focus on model speed and consistency over intelligence going forward, this is what I am looking for to be able to more confidently use agents to speed up my development process.
Failing early would also be a useful feature. 
I discovered the limtations of the models after running them for a certain amount of time, and it would be preferable if the model could gauge it's own ability in some form, before users need to spend high amounts of inference to not solve the problem.

One problem I think will remain difficult long term is the ability for human's to express the details of their problem to the LLM.
There is a lot that a person might have in their mind that is difficult to rapidly communicate with natural languague, and to defin it it often most of the work for a person to solve it themselves.

@astral3d/magrathea
===================
Generate deterministic seed based worlds and entities within them.

It includes a working implementation for [Holdridge life zones](https://en.wikipedia.org/wiki/Holdridge_life_zones) which can serve as a consistent basis for simulating a habitable planet over time. 

Rationale
---------
Most world algorithms work from an origin, while this engine has been designed to have the same load and compute expense anywhere in the world, so initial load is inexpensive, a remote load in an expansive world is cheap, and only the player changes need storage.

It achieves this through using natural properties of numbers (the coordinates) and overlaying multiple axes offset to each other. in this way you can set a numeric distribution that is appropriately continuous and rare, even if it requires familiarity with the distributions of those number properties. It also allows you to generate context for given NPCs for delivery to a language model for NPC dialog, interaction and questing.

The result is a simple roguelite solution, so the majority of game dev can be focused on asset and rules creation.

Usage
-----


# OpenWearableAI

- Opensourced wearable AI assistant

# Story

### How i made a wearable AI assistant for $50.

(Opensourced rabbit p1 analog)

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/78bd4861-7196-4732-8c25-e8727bcca668" width="500px"/>

### What is this?

- It's a small AI pendant connected to a web application.
- It works with OpenAI GPT4 so it is very smart, can "call functions", use "threads", has memory, etc.
- You can press the button and talk in walkie-talkie style or turn switch to record a long meeting.

https://github.com/1g0rrr/OpenWearableAI/assets/51457/8c0f88b1-1e58-42f1-8572-0aae72a308af

### Costs:

- So, you'll need a $25 Raspberry Pi, a $13 sound card (with a microphone inside), an $8 battery, a $2 board for charging a paverbank, and other sundries for $2.
- All of these are widely available for purchase.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/4719fcdd-3030-4e22-a6c7-f817bb97b2dc" width="500px"/>

Basically you can already connect one to the other and it will work. But the key is to make it portable.

### Case

- I asked an engineer friend of mine to put it in a small enclosure.
- We have to choose between a board sandwich (as is common in the Raspberry world) or a flat case.
- The flat one seemed better, as it always one side forward and is easier to assemble.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/50581927-7ecf-48d5-98fc-e348780643de" width="250px"/>
<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/f7a98c0c-8058-476b-8dc1-198211fd7b0f" width="250px"/>

### Sound card:

- Let's start the destruction, also you'll have to do a little scissor work.
- We don't need connectors, so we can unsolder one and cut off the other one around here.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/af3f92f5-b9ad-4336-bd6c-ea5d02b19f7c" width="500px"/>

### Raspberry Pi Zero W

- Here we also need to get rid of unnecessary connectors that take up space.
- But the good news is that we can leave HDMI out of it. It won't hurt us.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/e7d1b9c0-348d-4118-a602-343ea3e0623e" width="500px"/>

### Battery and charger

- We cut the sound card so it fits nicely on top of charger it like in tetris.
- The second part of the case remains for the battery. We chose 1500mAh, but you can put more.
- See how easy it is to assemble by placing the boards on different parts of the case.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/11d79011-8973-4359-82e2-072472663062" width="500px"/>

### Wires

- Since we are fighting for every millimeter, we need really thin wires.
- We bought old soviet ones, where no copper was spared and which can do the party trick with braid stripping and a lighter.

https://github.com/1g0rrr/OpenWearableAI/assets/51457/51cb8770-a2d6-47bb-b74a-155d98e4b940

### Buttons, switches, speaker.

- Let's get everything in a pile. The first version turned out to be a bit of a mess, but it's a real life and there is a place for improvements.
- The glue gun helps to secure the parts

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/f09a45bf-a077-4f09-bd1c-b120755e64d1" width="500px"/>

Tip: Don't forget to unsolder the excess LEDs, otherwise you'll have to do it all over again.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/27daee8a-8090-4000-9963-38ce8d15d697" width="500px"/>

### Firmware

- The goal of the device itself is just to record sound, pass it to the web app and play speech.
- So I made a simple script in Python and never return to it again.
- 10 hours of recording takes only 1.2 GB, so even the smallest card will be enough.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/c38a467f-a635-4d17-ba79-591342c0313b" width="500px"/>

### Software

The web app runs on google functions, takes a request from the gadget, analyzes it and sends it to the OpenAI API. UI is a React "single page app".

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/ce0a4c07-3aae-4213-a417-4d76f089f149" width="500px"/>

### Skills

- You can easily add skills to your assistant. And that's the main part for which the community can have a hand in.
- For starters, there's the ability to manage daily tasks and notes.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/d399ac06-d073-433f-8d5c-4e430f704407" width="500px"/>

### Memory

Memory is a critical part of device smartness. We use a vector database with duplication with text. So you can delete or add memories manually.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/b3387987-0694-4190-af11-4f924980aa68" width="500px"/>

### PR

- Opensource requires good PR and community.
- Here we are at CES 2024, showing a working gadget to the first audience.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/1301a69f-3ebb-4423-ab66-bd012927665f" width="500px"/>

### Why OpenWearableAI is good?

- Opensourced hardware and software puts you in full control of your data
- No screen, only voice. It simplifies interaction and you can use it while walking or driving.
- Potentially wide diversity of AI skills through community input.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/996795c0-1c30-4b8d-8bc5-71b6f0350e3d" width="500px"/>

### Call:

- Join us to build the best AI gadget together.
- If you don't want to mess around with electronics, we can build your device ourselves. Queue is here: https://bitlighter.com/openwearableaidemo

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/c4b1e0d3-94bb-47af-8034-73d3e3b5391e" width="500px"/>

# OpenWearableAI

- Opensourced wearable AI assistant

# Story

### How i made a wearable AI assistant for $50.

(Opensourced rabbit p1 analog)

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/38564f20-8422-4be8-9afd-5793af7489e8" width="500px"/>

### What is this?

- It's a small AI pendant connected to a web application.
- It works with OpenAI GPT4 so it is very smart, can "call functions", use "threads", has memory, etc.
- You can press the button and talk in walkie-talkie style or turn switch to record a long meeting.

https://github.com/1g0rrr/OpenWearableAI/assets/51457/20ed2519-25d6-4fa4-9eb4-a739d6a83a2d


### Costs:

- So, you'll need a $25 Raspberry Pi, a $13 sound card (with a microphone inside), an $8 battery, a $2 board for charging a paverbank, and other sundries for $2.
- All of these are widely available for purchase.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/ac99fbd7-e303-48dc-afd6-c1f576246dc0" width="500px"/>

Basically you can already connect one to the other and it will work. But the key is to make it portable.

### Case

- I asked an engineer friend of mine to put it in a small enclosure.
- We have to choose between a board sandwich (as is common in the Raspberry world) or a flat case.
- The flat one seemed better, as it always one side forward and is easier to assemble.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/20099cdd-1320-4be3-b119-1bffcc905582" width="250px"/>
<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/1bd654d0-dd8c-4ed3-853e-98b3c09aee95" width="250px"/>

### Sound card:

- Let's start the destruction, also you'll have to do a little scissor work.
- We don't need connectors, so we can unsolder one and cut off the other one around here.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/6addd3e9-a323-45df-b603-f36314d737bf" width="500px"/>

### Raspberry Pi Zero W

- Here we also need to get rid of unnecessary connectors that take up space.
- But the good news is that we can leave HDMI out of it. It won't hurt us.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/afdb09d1-9ba2-445d-8d76-e916c7a1f004" width="500px"/>

### Battery and charger

- We cut the sound card so it fits nicely on top of charger it like in tetris.
- The second part of the case remains for the battery. We chose 1500mAh, but you can put more.
- See how easy it is to assemble by placing the boards on different parts of the case.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/e1970284-0dba-4d29-98a6-758f24c7e224" width="500px"/>

### Wires

- Since we are fighting for every millimeter, we need really thin wires.
- We bought old soviet ones, where no copper was spared and which can do the party trick with braid stripping and a lighter.

https://github.com/1g0rrr/OpenWearableAI/assets/51457/b40c9683-5ee4-41f5-8031-f792ee61731b

### Buttons, switches, speaker.

- Let's get everything in a pile. The first version turned out to be a bit of a mess, but it's a real life and there is a place for improvements.
- The glue gun helps to secure the parts

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/a884bef7-284e-4978-ba87-530e5ffbb13c" width="500px"/>

Tip: Don't forget to unsolder the excess LEDs, otherwise you'll have to do it all over again.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/dfceebf8-4d80-40d2-bca4-948be963d014" width="500px"/>

### Firmware

- The goal of the device itself is just to record sound, pass it to the web app and play speech.
- So I made a simple script in Python and never return to it again.
- 10 hours of recording takes only 1.2 GB, so even the smallest card will be enough.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/be96b518-ba14-4062-8f51-28bd83ee6cc8" width="500px"/>

### Software

The web app runs on google functions, takes a request from the gadget, analyzes it and sends it to the OpenAI API. UI is a React "single page app".

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/d0356631-9091-4fdf-8089-425bea800b49" width="500px"/>

### Skills

- You can easily add skills to your assistant. And that's the main part for which the community can have a hand in.
- For starters, there's the ability to manage daily tasks and notes.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/ee7e6257-533e-4235-8f17-558740062116" width="500px"/>

### Memory

Memory is a critical part of device smartness. We use a vector database with duplication with text. So you can delete or add memories manually.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/03a5e561-af7c-4ee8-9029-b3736a1048e9" width="500px"/>

### PR

- Opensource requires good PR and community.
- Here we are at CES 2024, showing a working gadget to the first audience.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/90252703-a08d-41b9-b4b8-35e7981bda5a" width="500px"/>

### Why OpenWearableAI is good?

- Opensourced hardware and software puts you in full control of your data
- No screen, only voice. It simplifies interaction and you can use it while walking or driving.
- Potentially wide diversity of AI skills through community input.

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/8a90512c-2c58-490f-a257-92b80db36fcc" width="500px"/>

### Call:

- Join us to build the best AI gadget together.
- If you don't want to mess around with electronics, we can build your device ourselves. Queue is here: https://bitlighter.com/openwearableaidemo

<img alt="GitHub Last Commit" src="https://github.com/1g0rrr/OpenWearableAI/assets/51457/9023d38a-065a-4aaa-835f-0becacdd683e" width="500px"/>

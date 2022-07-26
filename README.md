# Decentraland SDK + Smart Items + Dynamically Update Component Issue

Simply clone the repository and preview the 3D scene in your browser by running `dcl start`.

The scene contains a signpost with a trigger area in front of it.
Everytime you enter and leave the trigger area the text on the signpost changes.

There is also code to fetch the date/time from an external REST service every 5 seconds.
My goal is to dynamically update the text in the signpost to **WOW!** every time the date/time is fetched.
If you open the browser developer tools (in Chrome for example) and view the console, I am logging the date/time.
You will also notice an error being logged.

Please refer to the code marked **HELP!** in the `src/game.ts` file.
This is where I'm trying to dynamically update the text component.

Thanks again!

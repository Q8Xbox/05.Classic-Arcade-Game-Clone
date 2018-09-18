# Memory Game

This is Classic Arcade Game Clone made for **Udacity** Front-End Developer Nanodegree Program.

## Quickstart

* You will try to collect points as much as possible before the time ends.
* When the timer ends the return will display base on your points.
* Base on the collected point the result will display.
    - If the points is Zero or lower **You will Lose**.
    - If the points more than Zero **You will Win**.

## Dependencies:

* [Google Fonts](https://fonts.google.com/) - Making the web more beautiful, fast, and open through great typography.

## HTML5 Canvas Info:

The starting code for the Classic Arcade Game Clone project handles most of the drawing for you. The `<canvas>` element has already been created and the two-dimensional drawing context for the canvas element is available as the `ctx` object in the `app.js` file.

## Drawing an Image:

In the `app.js` file, you can see in the Enemy class. This class has a `render()` method that uses the `ctx.drawImage()` method. This method takes three parameters: an image, an x-coordinate, and a y-coordinate:
`ctx.drawImage(Resources.get(this.sprite), this.x, this.y);`

## Available Images:

In this example, the game engine has a `Resources` object that caches all of the images needed for the game so you don’t have to wait for them to load during gameplay. The images available to use are listed in `engine.js`:

    Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
    ]);


There are many other images available with the starter code. If you want to use them in your game, all you need to do is include them in the array passed to the Resources.load() method in engine.js near the bottom of the file:

    Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/char-pink-girl.png'
    ]);

## License:

The contents of this repository are covered under the [MIT License](LICENSE).
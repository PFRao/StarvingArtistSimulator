# Starving Artist Simulator

[Play it here!][heroku]
[heroku]: http://pfrao.github.io/StarvingArtistSimulator

Starving Artist Simulator is a browser-based painting game that aims to simulate a small slice of what goes on in the life of a starving artist. With all pretensions aside, the game is essentially a paint app with an objective: the player will aim to recreate various pictures that are presented to them using only very basic painting tools, and with a very limited amount of time. Since the game canonically takes place within the Pokemon Universe, the pictures that the player will be expected to produce will be paintings of people's favorite Pokemon.

When time runs out, the player's picture will be compared to the "goal" picture using the `resemblejs` library. Whatever the player has produced by the end is then scored, and the player themselves are then offered the opportunity to try again with a different randomly-selected picture.

[Game View][view]
[view]: ./docs/view.png

## Key features

### resemblejs

This is a library that allows several forms of analysis on image files, including a percentage difference comparison. The library was EXTREMELY helpful, but it did have a fatal flaw; since it compared colors pixel by pixel, any white space in the pictures were always guaranteed to be correct as long as the player avoided coloring in them. In fact, waiting out the timer and not drawing a single line would often result in a picture that was 20 - 40 percent correct. While this wasn't a game-breaking issue by any stretch of the imagination, it did result in an unsatisfying scoring system. So how would we get around it?

* Forcing the player to color in the backgrounds was too tedious.
* Trying to subtract the white space's value from the final score ended up penalizing the player twice if they accidentally colored in a spot that was supposed to be white.

The best solution was to simply turn the background of the "goal" pictures transparent. The player would still be required to draw in any sections of the picture that were white, but the background portion would always be equally deducted, whether the player had colored them or not. They were simply an out-of-bounds area as far as the game was concerned. This still left the issue of the white spaces that existed within the picture itself. This was handled by ensuring that the final picture was at least 5% different from a blank canvas before a score would be issued. Failure to meet that condition within the time limit would result in a score of 0.

### Color Picker

The game has the capability to assess pictures both with or without color taken into account, but including color was preferable because otherwise, the players could just color in as much of the canvas as possible to achieve the highest score. And since color matching was of such utmost importance, it was decided that providing a traditional paint palette would be insufficient. Instead, the player could pick colors directly off of the goal picture. Because the act of picking out colors precisely off of a color picture can often be difficult, a small `div` was added that, when the player moved the mouse over the goal photo, would follow the player's mouse around and show what color was currently being hovered over. This indicator would disappear as soon as the player's mouse left the picture.

The color preview box was achieved by repeatedly removing and re-rendering a `div` at coordinates that were slightly offset from the tip of the cursor.

``` javascript
  $l('#thePicture').on('mousemove', function (event) {
    $l('#hover').remove();
    var hover = $("<div id='hover' />");

    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;

    var imgData = pictureContext.getImageData(x, y, 1, 1);
    var r = imgData.data[0];
    var g = imgData.data[1];
    var b = imgData.data[2];

    var newHex = rgbToHex(r, g, b);
    hoveredColor = "#" + newHex;

    hover.css('left', event.pageX + 5);
    hover.css('top', event.pageY + 5);
    hover.css('background', hoveredColor);
    $l('body').append(hover);
  });

  $l('#thePicture').on('mouseleave', function (event) {
    $l('#hover').remove();
  });
```

NB: the `$l` function is Rambutan's default query selector, similar to `$` in jQuery. See https://github.com/PFRao/Rambutan for more details.

### Gallery

This is very straightforward. This is an area of the bottom of the game space that shows all pictures created during the current session, as well as their scores, and the name of the player that created them. This list is sorted by score in descending order.

[Gallery][gallery]
[gallery]: ./docs/gallery.png

## Conclusion

Above all, it is important to remember that this app is meant to be less of a game and more of a toy. That is to say it isn't really meant to be a competitive or challenging experience. Instead, it is to be a novelty, something that allows the player to simply relax, have fun, and hopefully make some pretty zany pictures.

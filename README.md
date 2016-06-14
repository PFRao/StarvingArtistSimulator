# Starving Artist Simulator - Proposal

Starving Artist Simulator is a browser-based painting game that aims to simulate a small slice of what goes on in the life of a starving artist. All pretensions aside, the game is essentially a paint app with an objective: the player will aim to recreate various pictures that are presented to them using only very basic painting tools, and with a very limited amount of time. When time runs out, the player's picture will be compared to the "goal" picture using the `node-resemble-js` api. Whatever the player has produced at that point is then scored, and the player themselves are then offered the opportunity to try again with a different randomly-selected picture.

Pictures will be sourced from from the public domain. The most obvious thing to do would be to use famous paintings such as Starry Night and the Mona Lisa, but the plan is to use a variety of pictures and photos from the public domain to make sure there is an adequate amount of variety in the game.

## Minimum Viable Product

* The capability for the user to paint on an HTML 5 canvas.
* The capability for the user to vary their drawing method, for lack of a better word. This will include alternate colors, brush sizes, and perhaps even brush types if I am exceptionally efficient in completing the other MVP items.
* A repository of pre-selected pictures for the user to imitate. These will be selected at random and presented alongside the main drawing area for reference.
* Successful integration of the `node-resemble-js` api to provide a comparison figure between the two pictures, which will then be used to provide the player with a score.

### Other features

* A save feature that will allow users to save the goal photos and their attempts at recreating them, for later perusal or to share with their friends.
* The capability for users to upload their own pictures and try to draw them, or perhaps challenge their friends.
* Persistent scoring, wherein the player could attack a series of (increasingly difficult?) pictures, and the players score will be recorded across all of the attempts.
  * A survival mode, a la Papers Please, wherein the player will accrue monetary rewards in lieu of score. This money is then deducted every day to account for the player's living expenses. Here, the pictures would definitely get harder and harder, and the objective would be to see how long the player can survive before they actually become the titular starving artist.
* Multiple judges, each with their own preferences. One might prefer color accuracy, one might prefer strictest of strokes, etc. This will be the very last feature that is implemented, because it would require an in-house image comparison method.

## Design Docs

* [Player Interface][views]

[views]: ./docs/14658717506842.png

## Conclusion

Above all, it is important to remember that this app is meant to be less of a game and more of a toy. That is to say it isn't really meant to be a competitive or challenging experience. Instead, it is to be a novelty, something that allows the player to simply relax, have fun, and hopefully make some pretty zany pictures.

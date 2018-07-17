const express = require('express')
const app = express()


var gameInfo = {
  "name": "BlueBox",
  "author": "Cengizhan Basak",
  "description": "BlueBox is a 2D platformer game made with Unity Engine. In this game you control a Blue Box which is going only one way(left or right) till it hits a wall. Your aim is tapping on the screen to make it jump to reach to the exit and advance next levels. With the 1.2 version, the game has 30 levels each has different concepts.",
  "releaseDate": "01-08-2016",
  "image": "https://lh3.googleusercontent.com/NzW7_wuknfPP4jUS2LBt1qjcSlS9G0NR8J-1vcYvrTSUwLQOcnjBTMZ7Kc9ScycFhx4=s180",
  "link": "https://play.google.com/store/apps/details?id=com.Tosunami.BlueBox",
}

var gameInfo2 = {
  "name": "SynthBeats",
  "author": "Cengizhan Basak",
  "description": "Send same shapes of neon waves to enemies to destroy them! Select the shape you want to send and be quick before they reach to you. Use your special power to kill all enemies at once! Have fun with the addictive synthwave song! Do your best to break your high-score! How long you can survive?",
  "releaseDate": "26-02-2017",
  "image": "https://ggj.s3.amazonaws.com/styles/game_sidebar__wide/game/featured_image/logo_1_1.png",
  "link": "https://play.google.com/store/apps/details?id=com.Tosunami.SynthBeats",
}

var gameResponse = {
  games: [gameInfo,gameInfo2],
}

app.get('/', (req, res) => res.json(gameResponse));

app.listen(3002, () => console.log('Example app listening on port 3002!'))

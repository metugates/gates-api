const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const http = require('http').Server(app)

var PORT = process.env.PORT || 3002;

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

var question1 = {
    "id":0,
    "topic":"AdMob Integration Problem",
    "description":"Hello, I cannot fix this AdMob integration error that keeps killing me. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Thanks!",
    "author":"Cengizhan Basak",
    "date":"24-07-2018",
    "category":"Unity",
}

var question2 = {
    "id":1,
    "topic":"Cannot detect collision",
    "description":"Hello, i've been working on a 2D Platformer game but my Rigidbody cannot detect the collision. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Thanks!",
    "author":"John Doe",
    "date":"24-07-2018",
    "category":"Unity",
}

var productsResponse = {
    products: [gameInfo,gameInfo2],
}

var questionsResponse = {
    questions: [question1,question2],
}

app.get('/products', (req, res) => res.json(productsResponse));

app.get('/questions',(req, res) => res.json(questionsResponse));

app.get('/questions/:no',(req,res) => res.json(question1));

app.post('/questions/new',(req,res) => {
  console.log(req.body);
  newQuestion = {
    "topic":req.body.topic,
    "id":questionsResponse.questions.length,
    "topic":req.body.topic,
    "description":req.body.description,
    "author":req.body.author,
    "date":new Date().toDateString(),
    "category":req.body.category,
  }
  questionsResponse.questions.push(newQuestion);
  res.send("OK")
})

http.listen(PORT, () => console.log('Example app listening on port '+PORT))

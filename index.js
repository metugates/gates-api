const express = require('express')
const cors = require('cors')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').load();
const path = require('path');

let db = new sqlite3.Database('gates.sqlite3', createTable);

function createTable() {
    db.run("CREATE TABLE IF NOT EXISTS  products ( name varchar(25) NOT NULL UNIQUE, author TEXT NOT NULL, description TEXT, releasedate TEXT, imagelink TEXT NOT NULL, link1 TEXT NOT NULL, link2 TEXT);");

}


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

var productsResponse = {
    products: [gameInfo,gameInfo2],
}


app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err,rows)=>{
        if (err) {
            throw err;
        }
        res.json(rows)
    })
});

app.get(`/products/new/${process.env.SECRETKEY}`,(req,res)=>{
    res.sendFile(path.join(__dirname+'/form.html'));
})

app.post('/products/', (req,res) => {
    let name = req.body.name;
    let author = req.body.author;
    let descr = req.body.description;
    let releaseDate = req.body.releaseDate;
    let imageLink = req.body.imageLink;
    let link1 = req.body.link1;
    let link2 = req.body.link2;
    db.run("INSERT INTO products ( name, author, description, releasedate, imagelink, link1, link2 ) VALUES ( ?, ?, ?, ?, ?, ?, ? )", name,author,descr,releaseDate,imageLink,link1,link2,(err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send("OK");
        }
    })
})

http.listen(PORT, () => console.log('Example app listening on port '+PORT))

process.on('exit', () => {
  db.close();
})

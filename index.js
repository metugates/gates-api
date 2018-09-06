const express = require('express')
const cors = require('cors')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').load();
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');


let db = new sqlite3.Database('gates.sqlite3', createTable);

function createTable() {
    db.run("CREATE TABLE IF NOT EXISTS  superusers ( username varchar(25) NOT NULL UNIQUE, password TEXT NOT NULL);");
    db.run("CREATE TABLE IF NOT EXISTS  products ( name varchar(25) NOT NULL UNIQUE, author TEXT NOT NULL, description TEXT, releasedate TEXT, imagelink TEXT NOT NULL, link1 TEXT NOT NULL, link2 TEXT);");

}


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'gizliGATES',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 360000 }
}));

const http = require('http').Server(app);

var PORT = process.env.PORT || 3002;

app.get('/', (req,res)=>{
    res.send('Hello');
    req.session.name="standard";
});

app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err,rows)=>{
        if (err) {
            throw err;
        }
        res.json(rows)
    })
});

app.get('/admin',function(req,res){
    console.log(req.session.name);
    if(req.session.name=="superuser"){
        res.sendFile(path.join(__dirname+'/src/adminPanel.html'));
    }else{
        res.redirect('/')
    }

});

app.get('/admin/login',function(req,res){

    res.sendFile(path.join(__dirname+'/src/loginForm.html'));
});



app.post('/admin/login',function(req,res){
    var username = req.body.username;
    crypto.pbkdf2(req.body.password, 'saltystuff', 100000, 64, 'sha512',(err,hashed) => {
        db.serialize(function(){
            var stmt = db.prepare("SELECT EXISTS(SELECT * FROM superusers WHERE username=? )")
            stmt.get( username,function(err,result){
                if( result[Object.keys(result)[0]] == 1 ){
                    db.get("SELECT * FROM superusers WHERE username=?", username, (err, res1) => {
                        hashed = hashed.toString('hex')
                        if( hashed == res1.password ){
                            req.session.name = "superuser"
                            res.redirect('/admin')
                        }else {
                            res.redirect('/')
                        }
                    })
                }else {
                    res.redirect('/')
                }
            })
            stmt.finalize();
        })
    });
});

app.get('/admin/logout',function(req,res){
  req.session.name = "standard";
  res.redirect('/');
});


app.get(`/products/new`,(req,res)=>{
    if(req.session.name=="superuser"){
        res.sendFile(path.join(__dirname+'/src/form.html'));
    }else{
        res.redirect('/');
    }
});



app.post('/products/', (req,res) => {
    if(req.session.name=="superuser"){
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
    }else{
        res.redirect('/');
    }

});

http.listen(PORT, () => console.log('Example app listening on port '+PORT));

process.on('exit', () => {
  db.close();
});

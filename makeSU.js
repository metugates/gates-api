var crypto = require('crypto');
var sqlite3 = require('sqlite3').verbose();

db = new sqlite3.Database('gates.sqlite3');
db.run("CREATE TABLE IF NOT EXISTS superusers ( username varchar(25) NOT NULL UNIQUE, password TEXT NOT NULL);");

username = process.argv[2];
pswdh = crypto.pbkdf2Sync(process.argv[3], "saltystuff", 100000, 64, "sha512").toString("hex");
db.run("INSERT INTO superusers (username, password) VALUES (?, ?);", username, pswdh, (err,res)=>{
    if(err) console.log(err);
    else console.log(res);
});

process.on('exit', () => {
  db.close();
})

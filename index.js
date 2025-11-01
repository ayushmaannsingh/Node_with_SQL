 const { faker } = require('@faker-js/faker');
 const mysql = require('mysql2');
 const express = require("express");
 const app = express(); 
 const path = require ("path");
 const methodOverride = require("method-override");

 app.use(methodOverride("_method"));
 app.use(express.urlencoded({extended: true}));
 app.set("view engine", "ejs");
 app.set("views", path.join(__dirname, "/views"));

 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node_with_sql',
    password: 'ayushsingh@2500'

 });

  let getRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.username(),
     faker.internet.email(),
     faker.internet.password(),
   
  ];
}

// console.log(getRandomUser());

 // Inserting New Data

// let q = "INSERT INTO `users` (id, username, email, password) VALUES ?";

// let users = [
//   ["123b", "1_ayushsingh", "ayush@gmail.comb", "singh"],
//   ["123c", "2_suman", "sumansingh@gamil.comc", "rajput"],
// ];

// let data = [];
// for(let i=1; i<=100; i++){
//  data.push(getRandomUser()); // 100 fake users
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(" Data inserted successfully!");
//     console.log(result);
//   });
// } catch (err) {
//   console.log(" Error:", err);
// }

// connection.end();

// Home Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM users`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    console.log(" Data inserted successfully!");
    let count = (result[0] ["count(*)"]);
    res.render("home.ejs", {count});
  });
} catch (err) {
  console.log(" Error:", err);
  res.send("some error in DB");
}
  
}); 

// Show Route
app.get("/users", (req, res) => {
   let q  = `SELECT * FROM users`;

   try {
  connection.query(q, (err, user) => {
    if (err) throw err;
   // console.log(result);
   // res.send(result);
   res.render("showusers.ejs", {user});
  });
} catch (err) {
  console.log(" Error:", err);
  res.send("some error in DB");
} 
   
});

// Edit Route
app.get("/users/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM users WHERE id='${id}'`;   

  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
   // console.log(result);
    let user = result[0];
   res.render("edit.ejs", {user});
  });
} catch (err) {
  console.log(" Error:", err);
  res.send("some error in DB");
} 
  
   
});

// UPDATE (DB) Route
app.patch("/users/:id", (req, res) => {
  let {id} = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM users WHERE id='${id}'`;   

  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    let user = result[0];
    if (formPass != user.password) {
      res.send("WRONG password");
    } else {
      let q2 = `UPDATE users SET username ='${newUsername}' WHERE id='${id}'`;
      connection.query(q2, (err, result) => {
        if(err) throw err;
        res.redirect("/users");
      });
    }
  
  });
} catch (err) {
  console.log(" Error:", err);
  res.send("some error in DB");
} 
  
});

app.listen("8080", () => {
  console.log("server is listening to port 8080");
  
});

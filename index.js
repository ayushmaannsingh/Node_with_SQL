 const { faker } = require('@faker-js/faker');
 const mysql = require('mysql2');

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

console.log(getRandomUser());

 // Inserting New Data

let q = "INSERT INTO `users` (id, username, email, password) VALUES ?";

// let users = [
//   ["123b", "1_ayushsingh", "ayush@gmail.comb", "singh"],
//   ["123c", "2_suman", "sumansingh@gamil.comc", "rajput"],
// ];

let data = [];
for(let i=1; i<=100; i++){
 data.push(getRandomUser()); // 100 fake users
}

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(" Data inserted successfully!");
    console.log(result);
  });
} catch (err) {
  console.log(" Error:", err);
}

connection.end();



 


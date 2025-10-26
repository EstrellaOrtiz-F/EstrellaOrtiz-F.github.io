import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "qzkp8ry756433yd4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "hp5kv96qd6go6fxd",
    password: "oidsnulo9enx2vpi",
    database: "fizq4mcj27thn5n2",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

//routes
app.get('/',async (req, res) => {
   let sql = "SELECT authorId,firstName FROM `authors` WHERE profession = 'Physicist'";
   const [rows] = await conn.query(sql);
    res.send(rows);
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})
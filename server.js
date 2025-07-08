const express=require("express")
const app=express()
const cors=require("cors")
const corsOption={
    origin:["http://localhost:5173"],
};
const mysql2=require("mysql2")

const pool=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"admin@123",
    database:"yashdb",
})

pool.connect((err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log("connected");
})


app.use(express.json());
app.use(cors(corsOption));

app.post("/about",(req,res)=>{
    console.log(req.body);
    // username cars description date duration phone email
    const name=req.body[0];
    const cars=req.body[1];
    const description=req.body[2];
    const date=req.body[3];
    const duration=req.body[4];
    const phone=req.body[5];
    const email=req.body[6];
    console.log(name,cars,description,date,duration,phone,email)

    pool.query(`insert into appointments(username,cars,description,date,duration,phone,email) values ("${name}","${cars}","${description}","${date}","${duration}","${phone}","${email}")`,(err,result,fields)=>{
        if(err){
            console.log(err);
        }
        else{
            console.table(result)
            res.send(result)
        }
    })
})

app.listen(8080,()=>{console.log("server is on")})

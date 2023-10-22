const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();


app.get("/api",(req,res)=>{
    res.json({
        mensaje:"node js y jwt"
    })
})

app.post("/api/login",(req,res)=>{
    const user ={
        id:1,
        nombre : "manuel",
        email:"emmanuel@gmail.com"
    }

    jwt.sign({user},"secretKey",{expiresIn:'40s'},(error,token)=>{
        res.json({token})
    });

    

    
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    const token =(bearerHeader)?bearerHeader.replace('Bearer','').trim():false;
    console.log(token);
    if(token){
        req.token =token;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.post("/api/posts",verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretKey',(error,authData)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje:"Post Fue Creado",
                authData:authData
            })
        }
    })

    const mensaje ={
        mensaje:"post fue creado"
    }

    res.json(mensaje)

    
})


app.listen(3000,()=>{
    console.log("node app runnig");
})

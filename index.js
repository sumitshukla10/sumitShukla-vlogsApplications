const express=require("express");
const app=express();
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
// const { url } = require("inspector");
const port=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"sumit shukla",
        content:"Hello i am Sumit Shukla.I am a third year student persuing my bachelor's in Informarion Technology from GGSIPU also i am fullStack Developer.",
    },
    {
        id:uuidv4(),
        username:"Neerja Chopra ",
        content:"With gold medals at the Olympics, World Athletics Championships, Asian Games, Commonwealth Games, Asian Championships and a Diamond League title to his name, Indian javelin thrower Neeraj Chopra has already etched his name in the history books at a very young age."
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post})
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
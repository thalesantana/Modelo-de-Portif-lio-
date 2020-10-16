const express = require('express')
const nunjucks = require('nunjucks')

const server =  express();
const videos = require("./data")
const contents = require("./courses")



server.use(express.static('public'))

server.set("view engine", "njk")


nunjucks.configure("views",{
    express: server,
    autoescape: false,
    nocache:true
})

server.get("/", function(req, res){
    const about = {
            avatar_url:"https://avatars1.githubusercontent.com/u/72896088?s=460&u=b106a4c508a64e6a9bf26446e5785bf77ca88619&v=4",
            name: "Thales Santana",
            role: "Desenvolvedor - Frontend",
            description: 'Desenvolvedor front-end, estudando atualmente React.js, NodeJS, API REST e Banco de dados MySQL.',
            links:[
                {name:"Github", url: "https://github.com/thalesantana"},
                {name:"Linkedin", url: "https://www.linkedin.com/in/thales-c-santana/"},
                {name:"Whatsapp", url: "https://api.whatsapp.com/send?phone=5531975204995"}
            ]
        
    }

    return res.render("about", {about})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {items: videos})
})

server.get("/content", function(req, res){
    return res.render("content", {id:contents})
})

server.get("/video", function(req, res){
    const id= req.query.id
    const video = videos.find(function(video){
        return video.id == id               
    })
    if (!video){
        return res.status(404).render("not-found");
    }
    return res.render("video",{item:video})
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000, function(){
    console.log("Server is running")
})
//https://codeforgeek.com/render-html-file-expressjs/ 
var express=require('express');
var router=express.Router();
var path = require("path");

router.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname+'./../frontend/web.html'));
  });

router.get("/web", (req, res, next) => {
    res.sendFile(path.join(__dirname + './../frontend/web.html'));
});

router.get("/system-act", (req, res, next) => {
    res.sendFile(path.join(__dirname + './../frontend/system-act.html'));
});

router.get("/style", (req, res, next) => {
    res.sendFile(path.join(__dirname + './../frontend/style.css'));
});

module.exports = router;
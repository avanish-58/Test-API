const express=require("express");

const app=express();
const body_parser=require("body-parser");
const ejs = require("ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
const mongoose=require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/wikidb");

const articleschema={
title:String,
content:String
};
const Article=mongoose.model("Article",articleschema);

app.route("/article")
 .get((req,res)=>{
Article.find()
.then(result=>{
    res.send(result);
})
.catch(err=>{
    console.log(err);
});
})
.post((req,res)=>{
   const item=new Article({
    title:req.body.title,
    content:req.body.content
   });
   item.save()
   .catch(err=>{
      console.log(err);
   });
   Article.find()
   .then(result=>{
    console.log(result);
   });
})
.delete((req,res)=>{
    Article.deleteMany()
    .then(result=>{
        res.send("done");
    })
    .catch(err=>{
        console.log("Not done");
    });
});
/////////////Request to target a specific article

app.route("/article/:articleid")
.get((req,res)=>{
    Article.findOne({title:req.params.articleid})
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
    });
})
.put((req,res)=>{
   Article.deleteOne({title:req.params.articleid})
   .then(result=>{
      const newarticle=new Article({
        title:req.body.title,
        content:req.body.content
      });
      newarticle.save();
 res.send("new article updated sucessfully");
    
   })
   .catch(err=>{
    res.send(err);
   })
   
})
.delete((req,res)=>{
       Article.deleteOne({title:req.params.articleid})
       .then(result=>{
        res.send("Deleted");
       })
       .catch(err=>{
        res.send(err);
       });
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

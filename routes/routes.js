const express = require("express");
const routes = express();
const db = require("../data/db")


routes.use("/blog/:blogid", async function(req, res) {
    const id = req.params.blogid;
    try {
        const [blogs, ] = await db.execute("select * from blog");
        res.render("../views/blog-details",{
            blogs: blogs,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Bir hata oluştu.");
    }
});

routes.use("/blog", async (req,res)=>{
    const [blogs, ] = await db.execute("select * from blog where onay=1");
    const [categories, ] = await db.execute("select * from category");
    res.render("../views/blog",{
        title: "Blogs",
        blogs: blogs,
        categories: categories
    });
});

routes.use("/contact",(req,res)=>{
    res.render("../views/contact");
});

routes.use("/stacks", async (req,res)=>{
    const [stacks, ] = await db.execute("select * from stacks");
    
    res.render("../views/stacks",{
        stacks: stacks
    });
});

routes.use("/",(req,res)=>{
    res.render("../views/index");
});

module.exports = routes;
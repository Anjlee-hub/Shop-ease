const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fetch = require("node-fetch");   // ONLY NEW LINE

const app = express();

app.use(express.json());
app.use(cors());

/* ===== FILE DB HELPERS ===== */

function read(name){
  if(!fs.existsSync(name))
     fs.writeFileSync(name,"[]");

  return JSON.parse(fs.readFileSync(name));
}

function save(name,data){
  fs.writeFileSync(name, JSON.stringify(data,null,2));
}

/* ===== LOGIN (YOUR OLD) ===== */
app.post("/login",(req,res)=>{

 let {email,password} = req.body;

 if(!email || !password)
   return res.json({error:"Missing fields"});

 let users = read("users.json");

 users.push({
   email,password,
   time:new Date().toLocaleString()
 });

 save("users.json",users);

 res.json({msg:"Welcome "+email});
});


/* ===== ADD TO CART ===== */
app.post("/addCart",(req,res)=>{

 let {email,name,price} = req.body;

 let cart = read("cart.json");

 cart.push({
   email,name,price,
   time:new Date().toLocaleString()
 });

 save("cart.json",cart);

 res.json({msg:"Added to cart"});
});


/* ===== ADD TO WISHLIST ===== */
app.post("/addWish",(req,res)=>{

 let {email,name} = req.body;

 let wish = read("wish.json");

 wish.push({
   email,name,
   time:new Date().toLocaleString()
 });

 save("wish.json",wish);

 res.json({msg:"Added to wishlist"});
});


/* ===== ORDER PLACE ===== */
app.post("/placeOrder",(req,res)=>{

 let {email,items,total} = req.body;

 let orders = read("orders.json");

 orders.push({
   email,items,total,
   time:new Date().toLocaleString()
 });

 save("orders.json",orders);

 res.json({msg:"Order Saved"});
});


/* ===== HISTORY ===== */
app.get("/history/:email",(req,res)=>{

 let email=req.params.email;

 let orders=read("orders.json")
   .filter(o=>o.email==email);

 res.json(orders);
});


/* ===== ADMIN ===== */
app.get("/admin/all",(req,res)=>{

 res.json({
   users: read("users.json"),
   cart: read("cart.json"),
   wish: read("wish.json"),
   orders: read("orders.json")
 });

});


/* =========================================
   🧠 AI AVATAR ROUTE – ONLY NEW PART
=========================================*/

const API_KEY = "YOUR_API_KEY_HERE";

app.post("/ai", async (req,res)=>{

 let text = req.body.msg;

 try{

 let r = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="+API_KEY,
  {
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({
     contents:[{
       parts:[{text:text}]
     }]
   })
 });

 let data = await r.json();

 let reply =
 data.candidates?.[0]?.content?.parts?.[0]?.text
 || "Sorry I couldn't understand";

 res.json({reply});

 }
 catch(e){
   res.json({reply:"AI connection error"});
 }

});


/* ===== SERVER ===== */
app.listen(3000,()=>{
 console.log("Server running 3000");
});

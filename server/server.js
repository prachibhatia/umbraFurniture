const express = require('express')
const path = require('path')
const app = express();
const port = process.env.port || 1804
const db = require('./db/connection')
const swal = require('sweetalert')
//import swal from 'sweetalert';

app.use(express.json())
app.use(express.urlencoded(
     {
          extended : true
     }
))

app.post('/queries',(req,res)=>{
    console.log(req.body);
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             console.log("Hello")
             connection.query(`INSERT INTO queries (contact_no,email,query) VALUES ('${req.body.contact}','${req.body.email}','${req.body.queries}');` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                  res.send({inserted:true})
                  connection.release()
                  }
             })
        }
   })
})

app.use('/home' , express.static('../client'))

app.get('/admin',(req,res) => {
       res.setHeader('Content-Type' , "text/html")
      res.sendFile(path.join(__dirname,'../client/admin.html'))
})
app.get('/discount',(req,res) => {
       res.setHeader('Content-Type' , "text/html")
      res.sendFile(path.join(__dirname,'../client/discount.html'))
})
app.get('/latestNews',(req,res) => {
    res.setHeader('Content-Type' , "text/html")
   res.sendFile(path.join(__dirname,'../client/latestNews.html'))
})

app.get('/',(req,res)=>{
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             console.log("Hello")
             connection.query('SELECT image_url FROM `best_products`' , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                  res.send(rows);
                  connection.release()
                  }
             })
        }
   })
})
app.get('/latest',(req,res)=>{
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             //console.log("Hello")
             connection.query(`SELECT header,header_info FROM latest_news` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                  res.send(rows);
                  connection.release()
                  }
             })
        }
   })
})
app.get('/deals',(req,res)=>{
    console.log("hello")
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             console.log("Hello")
             connection.query(`SELECT discountPerc,discountURL FROM myDiscount` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                  res.send(rows);
                  connection.release()
                  }
             })
        }
   })
})
app.post('/discount',(req,res)=>{
    //console.log(req.body);
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             console.log("Hello")
             connection.query(`UPDATE myDiscount SET discountURL='${req.body.urlDiscount}',discountPerc='${req.body.percDiscount}'` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
             })
    }
   })
})
app.post('/latest1',(req,res)=>{
    //console.log(req.body);
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             //console.log("Hello")
             connection.query(`UPDATE latest_news SET header='${req.body.header1}',header_info='${req.body.headerPara1}' WHERE id='1'` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                        console.log("hello")
                        res.send('<script>alert("Webpage updated !")</script>')
                    connection.release()
                    }
             })
    }
   })
})
app.post('/latest2',(req,res)=>{
    //console.log(req.body);
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             //console.log("Hello")
             connection.query(`UPDATE latest_news SET header='${req.body.header2}',header_info='${req.body.headerPara2}' WHERE id='2'` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                    connection.release()
                    }
             })
    }
   })
})
app.post('/newimages',(req,res)=>{
    console.log(req.body);
    db.getConnection((err , connection) =>{
        if(err){
             console.log(err);
             connection.release();
             return ; 
        }
        else{
             console.log("Hello")
             for(val=1;val<=6;val++){
                let url = 'url'+ val
                let Myurl = `${req.body[url]}`;
             connection.query(`UPDATE best_products SET image_url='${Myurl}' WHERE id='${val}'` , (err ,rows , fields) =>{
                  if(err){
                       console.log(err)
                       return res.send(err)
                  }
                  else {
                    connection.release()
                    }
             })
        }
    }
   })
})
app.listen( port ,() => console.log(`server started on port http://localhost:${port}`))
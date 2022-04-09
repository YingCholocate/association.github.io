var express=require("express")
var app=express();
app.use(express.static(__dirname))
app.listen(90)

var app2=express();
app2.get("/",function(req,res){
    res.header('Access-Control-Allow-Origin','*')
    res.send('你好')
})
app2.listen(91)
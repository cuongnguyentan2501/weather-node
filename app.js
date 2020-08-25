const express=require('express');
const path=require('path')
const app=express()
const hbs=require('hbs')
const request=require("request")
const fs=require("fs")
const PORT=process.env.PORT || 3000
// Tro den thu muc public , moi duong dan trong templace deu xuat phat tu day
const publicPath=path.join(__dirname,"/public")
app.use(express.static(publicPath))
// Define type of teaplace used
app.set("view engine","hbs")
// Tro den thu muc chua templaces dung khi render ,mac dinh se la views directory o root
const viewPath=path.join(__dirname,'templaces/views');
app.set("views",viewPath)
// Tro den thu muc chua cac partial dung khi render 
const partialPath=path.join(__dirname,'templaces/partials');
hbs.registerPartials(partialPath)
// Router
app.get('/',(req,res)=>{
    res.render("index.hbs",{
        title:"My index",
        author:"Cuong"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"My help",
        author:"Cuong"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"My about",
        author:"Cuong"
    })
})
app.get("/weather",(req,res)=>{
    const file=JSON.parse(fs.readFileSync('./src/constants/city.list.json/city.list.json'));
    const vn_city=file.filter(e=>e.country==="VN" && e.name.indexOf("Tỉnh")!==-1)
    
    console.log(vn_city.length)
    res.render("weather",{
        vn_city,
        title:"My weather list",
        author:"Cuong"  
    })
})
app.get("/weather-detail",(req,res)=>{
    const city_id=req.query.city_id;
    console.log(city_id)
    const url=`https://samples.openweathermap.org/data/2.5/weather?id=${city_id}&appid=a439b90132cd0228733fe908b45e4dd2`;
    request(url, function (error, response, body) {
        if(error){
            return res.render("weather-detail",{
                title:"Error",
                author:"Cuong"  
            })
        }
        res.render("weather-detail",{
            mainInfor:JSON.parse(body).main,
            title:"My location's weather",
            author:"Cuong"
        })
    });
    
    // console.log(req.query)
})
app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:"404 NOT FOUND HELP",
        author:"Cuong"
    })
})
app.get("/*",(req,res)=>{
    res.render('404',{
        title:"404 NOT FOUND",
        author:"Cuong"
    })
})

app.listen(PORT,()=>{
    console.log("server running on "+PORT)
});


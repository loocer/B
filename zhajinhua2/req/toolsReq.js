var toolsReq={};
const demoData = require('./tools/demoData')
var filter = require('./tools/filter')
toolsReq.getSocketAddress=function(app){
  app.get('/get-socketAddress',filter.authorize,function(req,res){
    let results = {}
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     results.data ='ws://' + alias.address + ':3000';  
               }  
          }  
    }  
    results.status = 2
    results.msg = '获取成功！'
    res.status(200),
    res.json(results)
  })
}
toolsReq.getRoom=function(app){
  app.get('/get-room',function(req,res){
    let results = {}
    results.data = demoData.rooms
    results.status = 2
    results.msg = '获取成功！'
    res.status(200),
    res.json(results)
  })
}
toolsReq.addRoom=function(app){
  app.get('/new-room',function(req,res){
    const rooms =[]
    const newRoom = ()=>{
      let Num="";
      for(let i=0;i<6;i++)
      {
          Num+=Math.floor(Math.random()*10);
      }

      return Num
    }
    const creFool = ()=>{
      const temp = newRoom()
      for(let a in rooms){
        if(temp==rooms[a]){
          creFool()
        }
      }
      return {id:temp}
    }
    for(let i =0;i<10;i++){
      const room = creFool()
      rooms.push(room)
    }
    demoData.rooms = [...demoData.rooms,...rooms]
    let results = {}
    results.data = demoData.rooms
    results.status = 2
    results.msg = '获取成功！'
    res.status(200),
    res.json(results)
  })
}
module.exports=toolsReq
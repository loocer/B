CreateRoom = {
    No:null,
    Event:{}
}
CreateRoom.init = function(){
    Laya.stage.destroyChildren()
    this.view()
}
CreateRoom.view = function(){
    const skin = "res/atlas/input (2).png";
    const xs = w>>1;
    const ys = w>>1;
    Laya.loader.load(skin,Laya.Handler.create(this,graphicsImg));
    function graphicsImg(){
        const ti = new Laya.TextInput();
        ti.skin = skin;
        ti.size(500, 100);
        ti.sizeGrid = "0,40,0,40";
        ti.font = "Arial";
        ti.fontSize = 30;
        ti.bold = true;
        ti.color = "#606368";
        Laya.stage.addChild(ti);
        CreateRoom.No = ti
        ti.pos( xs - 250, ys + 150);
        const btn = new Laya.Button();
        btn.label="进入房间"
        btn.width = 500
        btn.height = 80
        btn.labelSize = 50
        btn.pos( xs - 250, ys + 300);
        btn.on(Laya.Event.CLICK, this,buttonClick);
        Laya.stage.addChild(btn);
    }
    buttonClick = function(){
        const roomNo = CreateRoom.No.text
        CreateRoom.network(roomNo,4)
        console.log('coming');
    }
}
CreateRoom.network = function(roomNo,peopleNum){
    const parm = `roomNo=${roomNo}&peopleNum=${peopleNum}`
    const hr = new HttpRequest();
    hr.once(Event.PROGRESS, this, CreateRoom.Event.onHttpRequestProgress);
    hr.once(Event.COMPLETE, this, CreateRoom.Event.onHttpRequestComplete);
    hr.once(Event.ERROR, this, CreateRoom.Event.onHttpRequestErrorError);
    console.log(parm)
    hr.send(Adress+'/create-room?'+parm, null, 'get', 'json');
    CreateRoom.hr = hr
}
CreateRoom.Event.onHttpRequestError = function(e)
{
    console.log(e);
}

CreateRoom.Event.onHttpRequestProgress = function(e)
{
    console.log(e);
}

CreateRoom.Event.onHttpRequestComplete = function(e)
{   
    const rus = CreateRoom.hr.data
    if(rus.status){
        Zhajinhua.roomInfo = rus.data
        Zhajinhua.init()
    }
    console.log(CreateRoom.hr.data)
    // logger.text += "收到数据：" + hr.data;
}
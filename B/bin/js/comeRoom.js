ComeRoom = {
    No:{},
    Event:{},
    bgImg:{},
    hr:{},
}
ComeRoom.init = function(){
    Laya.stage.destroyChildren()
    this.view()
}
ComeRoom.view = function(){
    const skin = "res/atlas/input (2).png";
    ComeRoom.bgImg.in = skin
    
    Laya.loader.load(skin,Laya.Handler.create(this,ComeRoom.graphicsImg));
}
 ComeRoom.graphicsImg = function(){
        const xs = w>>1;
        const ys = w>>1;
        const ti = new Laya.TextInput();
        ti.skin = ComeRoom.bgImg.in;
        ti.size(500, 100);
        ti.sizeGrid = "0,40,0,40";
        ti.font = "Arial";
        ti.fontSize = 30;
        ti.bold = true;
        ti.color = "#606368";
        Laya.stage.addChild(ti);
        ComeRoom.No = ti
        ti.pos( xs - 250, ys + 150);
        const btn = new Laya.Button();
        btn.label="进入房间"
        btn.width = 500
        btn.height = 80
        btn.labelSize = 50
        btn.pos( xs - 250, ys + 300);
        btn.on(Laya.Event.CLICK, this,ComeRoom.buttonClick);
        Laya.stage.addChild(btn);
    }
ComeRoom.buttonClick = function(){
    const roomNo = ComeRoom.No.text
    ComeRoom.network(roomNo)
    console.log('coming');
}
ComeRoom.network = function(roomNo){
    const parm = `roomNo=${roomNo}`
    const hr = new HttpRequest();
    hr.once(Event.PROGRESS, this, ComeRoom.Event.onHttpRequestProgress);
    hr.once(Event.COMPLETE, this, ComeRoom.Event.onHttpRequestComplete);
    hr.once(Event.ERROR, this, ComeRoom.Event.onHttpRequestError);
    hr.send(Adress+'/into-room?'+parm, null, 'get', 'json');
    ComeRoom.hr = hr
}
ComeRoom.Event.onHttpRequestError = function(e)
{
    console.log(e);
}

ComeRoom.Event.onHttpRequestProgress = function(e)
{
    console.log(e);
}

ComeRoom.Event.onHttpRequestComplete = function(e)
{   
    const rus = ComeRoom.hr.data
    if(rus.status){
        Zhajinhua.roomInfo = rus.data
        Zhajinhua.init()
    }
    console.log(ComeRoom.hr.data)
    // logger.text += "收到数据：" + hr.data;
}
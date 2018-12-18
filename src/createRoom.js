CreateRoom = {}
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
        Zhajinhua.init()
        console.log('coming');
    }
}
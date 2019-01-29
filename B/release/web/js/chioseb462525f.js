const Choise = {}
Choise.init = function(){
    Laya.stage.destroyChildren()
    this.view()
}
Choise.view = function(){
    const btn1 = new Laya.Button();
    btn1.label="创建房间"
    btn1.width = 500
    btn1.height = 80
    btn1.labelSize = 50
    btn1.pos( wh - 250, vh );
    btn1.on(Laya.Event.CLICK, this,createClick);
    function createClick(){
        CreateRoom.init()
    }
    Laya.stage.addChild(btn1);
    const btn2 = new Laya.Button();
    btn2.label="进入别人房间"
    btn2.width = 500
    btn2.height = 80
    btn2.labelSize = 50
    btn2.pos( wh - 250, vh + 200);
    btn2.on(Laya.Event.CLICK, this,comeClick);
    function comeClick(){
        ComeRoom.init()
    }
    Laya.stage.addChild(btn2);
}
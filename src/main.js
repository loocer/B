const chouMa = "res/atlas/3avatar.jpg"
const sixPoker = "res/atlas/6-1.jpg"
const pokerBg = "res/atlas/poker_bg.png"
const peopleNum = 6
const pw = 250>>2
const ph = 374>>2
const Zhajinhua = {
    picNum:0,
    players:[],
    Draw:{},
    Event:{},
    picList:[chouMa,sixPoker,pokerBg]
}
Zhajinhua.init = function(){
    Laya.stage.destroyChildren()
    Laya.stage.bgColor = "#ffffff";
    const positions = getPositions(peopleNum - 1)
    for(let i=0;i<peopleNum;i++){
        let per = new Player()
        per.position = positions[i]
        this.players.push(per);
    }
    const picList = this.picList
    for(let i in picList){
        Laya.loader.load(picList[i],Laya.Handler.create(this,Zhajinhua.graphicsImg));
    }
}
Zhajinhua.graphicsImg = function(){
    this.picNum ++
    if(this.picList.length == this.picNum){
        this.view()
    }
    console.log(this.picNum)
}
Zhajinhua.view = function(){
    console.log('it is finish!')
    this.Draw.setStatus()
    this.Draw.setToolBar()
}
Zhajinhua.Event.createClick1 = function(){
        this.setPoker()
}
Zhajinhua.Event.createClick2 = function(){
        console.log('ai2')
        // this.Draw.setPoker()
}
Zhajinhua.Event.createClick3= function(){
        console.log('ai3')
        // this.Draw.setPoker()
}
Zhajinhua.Draw.setToolBar = function(){
    
    const btn1 = new Laya.Button();
    btn1.label="发牌"
    btn1.width = 100
    btn1.height = 50
    btn1.labelStroke = 1
    btn1.labelStrokeColor = "#333"
    btn1.labelSize = 50
    btn1.pos(0, h - 100 );
    btn1.on(Laya.Event.CLICK, this,Zhajinhua.Event.createClick1);
    Laya.stage.addChild(btn1);
    const btn2 = new Laya.Button();
    btn2.label="看牌"
    btn2.width = 100
    btn2.height = 50
    btn2.labelStroke = 1
    btn2.labelStrokeColor = "#333"
    btn2.labelSize = 50
    btn2.pos(150, h - 100 );
    btn2.on(Laya.Event.CLICK, this,Zhajinhua.Event.createClick2);
    Laya.stage.addChild(btn2);
    Laya.stage.addChild(btn1);
    const btn3 = new Laya.Button();
    btn3.label="投注"
    btn3.width = 100
    btn3.height = 50
    btn3.labelStroke = 1
    btn3.labelStrokeColor = "#333"
    btn3.labelSize = 50
    btn3.pos(300, h - 100 );
    btn3.on(Laya.Event.CLICK, this,Zhajinhua.Event.createClick3);
    Laya.stage.addChild(btn3);
}
Zhajinhua.Draw.setStatus = function(){
    const  players = Zhajinhua.players
    function createLabel(color, strokeColor){
        const STROKE_WIDTH = 4;
        const label = new Laya.Label();
        label.font = "Microsoft YaHei";
        label.text = "看牌";
        label.fontSize = 50;
        label.color = color;

        if (strokeColor)
        {
            label.stroke = STROKE_WIDTH;
            label.strokeColor = strokeColor;
        }

        Laya.stage.addChild(label);
        return label
    }
    for(let v in players){
        players[v].status_ac = createLabel("#e80606", "#e80606").pos(players[v].position[0] - pw,players[v].position[1] - 170);
    }
}
Zhajinhua.Draw.setPoker = function(){
    const  ps = Zhajinhua.players
    const acplays = []
    for(let q=0;q<3;q++){
        for(let i in ps){
            const acSprite = new Laya.Sprite();
            ps[i].pokers_ac.push(acSprite)
            acSprite.x = wh - pw/2
            acSprite.y = vh - ph/2
            //获取图片资源
            const texture = Laya.loader.getRes(pokerBg);
            //绘制纹理
            acSprite.graphics.drawTexture(texture);                        
            //设置纹理宽高
            acSprite.scale(.5,.5)
            acSprite.size(texture.width, texture.height); 
            acSprite.pos( wh - pw/2,vh - ph/2);
            // acSprite.on(Laya.Event.CLICK, this,onSpriteClick);
            Laya.stage.addChild(acSprite);
            acplays.push(acSprite);
        }
    }
    for(let i in acplays){
        console.log(i)
        console.log(players[i%3])
        let my = ps[i%ps.length].position[1]
        let mx = ps[i%ps.length].position[0]
        console.log(mx)
        Laya.Tween.to(acplays[i],
            {y:my,x:mx,pivotY:ph*2,pivotX:pw*2,rotation:randomNumBoth(0,360)}
            ,400,Laya.Ease.backOut,null,i*100);
        
    }
}
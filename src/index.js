var Event   = Laya.Event;
const acplays = [];
//初始化舞台
Laya.init(laya.utils.Browser.width,laya.utils.Browser.height,Laya.WebGL);
// //背景颜色
Laya.stage.bgColor = "#1b2436";
// //创建缓动文本

Laya.stage.bgColor = "#ffffff";

const chouMa = "res/atlas/3avatar.jpg"
const sixPoker = "res/atlas/6-1.jpg"
let pw = 250>>2
let ph = 374>>2
Laya.loader.load(pokerBg,Laya.Handler.create(this,graphicsImg));
Laya.loader.load(chouMa);
Laya.loader.load(sixPoker);
loginPanel()
function onSpriteClick(val){
    loginPanel()
        // Laya.stage.removeChild(val.target);
    const obj = val.target
    const pff = new Laya.Sprite();
    pff.x = obj.x
    pff.y = obj.y
    var fdf = Laya.loader.getRes(chouMa);
    pff.graphics.drawTexture(fdf);    
    pff.scale(.5,.5)
    pff.size(fdf.width, fdf.height); 
    pff.pos( obj.x,obj.y);
    Laya.stage.addChild(pff);
    Laya.Tween.to(pff,
            {x:wh - pw/2+randomNumBoth(-30,30),y:vh - ph/2+randomNumBoth(-30,30)}
            ,1000,Laya.Ease.backOut,null,10);
    console.log(val)
    players[0].status_ac.text = "jisdfdgfd"
    players[0].status_ac.color = "#ffffff";
    players[0].status_ac.strokeColor = "#ff000f";
    showMyPoker();
    console.log(players)
    Laya.stage.destroyChildren()
}
function graphicsImg(){
     for(let q=0;q<6;q++){
        let per = new Player()
        players.push(per);
     }
    setPokerVaule_ac()
    setStatus_ac()
    // let players = PLAYERSPOSITION_FOUR
    // for(let q=0;q<3;q++){
    //     for(let i in players){
    //         let per = new Player()
            
    //         per.id = i+q
    //         per.text = new Laya.Sprite();
    //         per.text.x = wh - pw/2
    //         per.text.y = vh - ph/2
    //         // per.text.graphics.drawTexture(Laya.loader.getRes(this.pokerBg),0,0,pw,ph);
    //         var imgUrl = pokerBg;
    //         //获取图片资源
    //         var texture = Laya.loader.getRes(imgUrl);
    //         //绘制纹理
    //         per.text.graphics.drawTexture(texture);                        
    //         //设置纹理宽高
    //         per.text.scale(.5,.5)
    //         per.text.size(texture.width, texture.height); 
    //         per.text.pos( wh - pw/2,vh - ph/2);
    //         per.text.on(Laya.Event.CLICK, this,onSpriteClick);
    //         Laya.stage.addChild(per.text);
    //         acplays.push(per);
    //     }
    // }
    // for(let i in acplays){
    //     console.log(i)
    //     console.log(players[i%3])
    //     let my = players[i%players.length][1]
    //     let mx = players[i%players.length][0]
    //     console.log(mx)
    //     Laya.Tween.to(acplays[i].text,
    //         {y:my,x:mx,pivotY:ph*2,pivotX:pw*2,rotation:randomNumBoth(0,360)}
    //         ,1000,Laya.Ease.backOut,null,i*100);
        
    // }
}
function createLabel(color, strokeColor){
    const STROKE_WIDTH = 4;
    var label = new Laya.Label();
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

    return label;
}
function setPokerVaule_ac(){
    const  ps = players
    const positions = getPositions(ps.length - 1)
    console.log(positions);
    for(let q=0;q<3;q++){
        for(let i in ps){
            let acSprite = new Laya.Sprite();
            ps[i].pokers_ac.push(acSprite)
            acSprite.x = wh - pw/2
            acSprite.y = vh - ph/2
            //获取图片资源
            let texture = Laya.loader.getRes(pokerBg);
            //绘制纹理
            acSprite.graphics.drawTexture(texture);                        
            //设置纹理宽高
            acSprite.scale(.5,.5)
            acSprite.size(texture.width, texture.height); 
            acSprite.pos( wh - pw/2,vh - ph/2);
            acSprite.on(Laya.Event.CLICK, this,onSpriteClick);
            Laya.stage.addChild(acSprite);
            acplays.push(acSprite);
        }
    }
    for(let i in acplays){
        console.log(i)
        console.log(players[i%3])
        let my = positions[i%ps.length][1]
        let mx = positions[i%ps.length][0]
        ps[i%ps.length].position = [mx,my]
        console.log(mx)
        Laya.Tween.to(acplays[i],
            {y:my,x:mx,pivotY:ph*2,pivotX:pw*2,rotation:randomNumBoth(0,360)}
            ,400,Laya.Ease.backOut,null,i*100);
        
    }
}
function setStatus_ac(){
    for(let v in players){
        players[v].status_ac = createLabel("#00FFFF", "#1d0ff5").pos(players[v].position[0] - pw,players[v].position[1] - 170);
    }
}
function showMyPoker(){
    const my = players[0].pokers_ac
    console.log(my);
    const x = players[0].position[0] - 150   
    for(let i in my){
        my[i].graphics.clear();
        let texture = Laya.loader.getRes(sixPoker);
        my[i].graphics.drawTexture(texture);  
        my[i].scale(.5,.5);
        my[i].size(texture.width, texture.height); 
        Laya.Tween.to(my[i],{x:x + 150*i,rotation:180},300,Laya.Ease.backOut,null,i*100);
    }       
}
function loginPanel(){
    var DIALOG_WIDTH = 220;
	var DIALOG_HEIGHT = 275;
	var CLOSE_BTN_WIDTH = 43;
	var CLOSE_BTN_PADDING = 5;
    var dialog = new Laya.Dialog();
    var button = new Laya.Button(sixPoker);
		button.name = Laya.Dialog.CLOSE;
		button.pos(DIALOG_WIDTH - CLOSE_BTN_WIDTH - CLOSE_BTN_PADDING, CLOSE_BTN_PADDING);
		dialog.addChild(button);

		dialog.dragArea = "0,0," + DIALOG_WIDTH + "," + DIALOG_HEIGHT;
		dialog.show();
}

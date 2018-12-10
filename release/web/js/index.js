// var Event   = Laya.Event;
// let per1 = new Player();
// let acplays = []

// //初始化舞台
// Laya.init(laya.utils.Browser.width,laya.utils.Browser.height,Laya.WebGL);
// //背景颜色
// Laya.stage.bgColor = "#1b2436";
// //创建缓动文本
// createTween();
// function onSpriteClick(val){
//     Laya.stage.removeChild(val.target);
//     console.log(val)
// }
// function createTween(){
//     let players = PLAYERSPOSITION_SIX
//     for(let q=0;q<3;q++){
//         for(let i in players){
//             let per = new Player()
//             per.id = i+q
//             per.text = createPlayer(i)
//             per.text.x = wh
//             per.text.y = vh
//             per.text.on(Event.CLICK, this, onSpriteClick);
//             acplays.push(per);
//         }
//     }
//     for(let i in acplays){
//         console.log(i)
//         console.log(players[i%3])
//         let my = players[i%players.length][1]
//         let mx = players[i%players.length][0]
//         Laya.Tween.to(acplays[i].text,{y:my,x:mx},1000,Laya.Ease.backOut,null,i*100);
//     }
// function createPlayer(char){
//     var letter = new Laya.Text();
//     letter.text = char;
//     letter.color = "#ffffff";
//     letter.font = "Impact";
//     letter.fontSize = 100;
//     Laya.stage.addChild(letter);
//     return letter;
// }

//初始化舞台
Laya.init(1334, 750);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
var img = new Laya.Sprite();
//加载显示图片，坐标位于100,50
img.loadImage("res/atlas/poker_pg.png",100,50);
//添加到舞台
Laya.stage.addChild(img);
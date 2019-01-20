var Stage       = Laya.Stage;
var Text        = Laya.Text;
var Event       = Laya.Event;
var HttpRequest = Laya.HttpRequest;
var Browser     = Laya.Browser;
var WebGL       = Laya.WebGL;
let User = {}
const Login = {}
Login.init = function(){
    const skin = "res/atlas/input (2).png";
    const xs = w>>1;
    const ys = w>>1;
    Laya.loader.load(skin,Laya.Handler.create(this,graphicsImg));
    function graphicsImg(){
        createNameInput(skin);
        createPasswordInput(skin);
        createButton(skin);
    }
    function createNameInput(skin)
    {
        let ti = new Laya.TextInput();

        ti.skin = skin;
        ti.size(500, 100);
        ti.sizeGrid = "0,40,0,40";
        ti.font = "Arial";
        ti.fontSize = 30;
        ti.bold = true;
        ti.color = "#606368";

        Laya.stage.addChild(ti);
        Login.name = ti
        ti.pos( xs - 250, ys);
    }
    function createPasswordInput(skin)
    {
        let ti = new Laya.TextInput();

        ti.skin = skin;
        ti.size(500, 100);
        ti.sizeGrid = "0,40,0,40";
        ti.font = "Arial";
        ti.fontSize = 30;
        ti.bold = true;
        ti.color = "#606368";
        Laya.stage.addChild(ti);
        Login.password = ti
        ti.pos( xs - 250, ys + 150);
    }
    function createButton(skin){
        let btn = new Laya.Button();
        btn.label="登陆"
        btn.width = 500
        btn.height = 80
        btn.labelSize = 50
        btn.pos( xs - 250, ys + 300);
        btn.on(Laya.Event.CLICK, this,buttonClick);
        Laya.stage.addChild(btn);
    }
    buttonClick = ()=> {
        this.network();
        console.log(this);
        console.log(Login.name.text);
    }
    console.log(Laya.stage)
}   
Login.network = function(){
    const parm = `name=${this.name.text}&password=${this.password.text}`
    const hr = new HttpRequest();
    hr.once(Event.PROGRESS, this, onHttpRequestProgress);
    hr.once(Event.COMPLETE, this, onHttpRequestComplete);
    hr.once(Event.ERROR, this, onHttpRequestError);
    hr.send(Adress+'/login', parm, 'post', 'json');
    Login.hr = hr
}
function showLogger()
{
    logger = new Text();

    logger.fontSize = 30;
    logger.color = "#FFFFFF";
    logger.align = 'center';
    logger.valign = 'middle';

    logger.size(Laya.stage.width, Laya.stage.height);
    logger.text = "等待响应...\n";
    Laya.stage.addChild(logger);
}

function onHttpRequestError(e)
{
    console.log(e);
}

function onHttpRequestProgress(e)
{
    console.log(e);
}

function onHttpRequestComplete(e)
{   
    const rus = Login.hr.data
    if(rus.status){
        User = rus.data.user
        Choise.init()
    }
    console.log(Login.hr.data)
    // logger.text += "收到数据：" + hr.data;
}
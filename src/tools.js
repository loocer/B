const w = laya.utils.Browser.width
const h = laya.utils.Browser.height
const wl = w>>2
const wh = w>>1
const vh = h>>1
const PLAYERSPOSITION_EIGHT = [
    [wl,h-200],
    [wl*3,h-200],
    [w-200,vh+300],
    [w-200,vh-300],
    [wl*3,200],
    [wl,200],
    [200,vh-300],
    [200,vh+300],
]
const PLAYERSPOSITION_SIX = [
    [w>>1,h-200],
    [w-200,vh+300],
    [w-200,vh-300],
    [w>>1,200],
    [200,vh-300],
    [200,vh+300],
]
const PLAYERSPOSITION_FOUR = [
    [w>>1,h-200],
    [w-200,vh],
    [w>>1,200],
    [200,vh],
]
const  randomNumBoth =(Min,Max)=>{
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); 
      return num;
}
const ALLPOSITION = [
    PLAYERSPOSITION_EIGHT,
    PLAYERSPOSITION_SIX,
    PLAYERSPOSITION_FOUR
]
const getPositions=(psNum)=>{
    console.log(psNum)
    if(psNum>6){
        return PLAYERSPOSITION_EIGHT
    } 
    if(psNum>4){
         return PLAYERSPOSITION_SIX
    }else{
        console.log(PLAYERSPOSITION_SIX)
        return PLAYERSPOSITION_FOUR
    }
}
const Adress = "api"
const fontColor = "#ececec"
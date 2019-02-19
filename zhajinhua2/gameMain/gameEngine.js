const rooms=require('./rooms');
const check=require('./check');
const constant=require('./constant');
const acType = constant.acType
const sendObj = Symbol('sendObj');
class Gameengin{
	constructor() {
	    this.room = null;
	    this.roomIndex =0
	  }
	selectRoom(msg){
		const temp = this
		rooms.forEach(function(v,k){
			if(v.id == msg.roomId){
				temp.room = v
				temp.roomIndex = k
			}
		})
	}
	main(msg){
		this.selectRoom(msg)
		const room = this.room
		if(!check(msg,room)){
			return false;
		}
		switch (msg.acType)
		{
			case acType.ON_COME:
			  this.acON_COME();
			  break;
			case acType.ON_READY:
			  this.acON_READY(msg);
			  break;
			case acType.ON_START:
			  this.acON_START();
			  break;
			case acType.ON_RAISE:
			  this.acON_RAISE(msg);
			  break;
			case acType.ADDRAISE:
			  this.acADDRAISE();
			  break;
			case acType.SHOW_VALUE:
			  this.acSHOW_VALUE(msg);
			  break;
			case acType.GAME_PK:
			  this.acGAME_PK(msg);
			  break; 
			case acType.GAME_PASS:
			  this.acGAME_PASS(msg);
			  break;
			default:    
			  this.acON_COME();
		}
		return this.addfontMsg(msg) 
	}
	acON_COME(){
		this.room.players.forEach(function(v,k) {
		    v.isEnable = true
		});
	}
	acON_READY(msg){
		this.room.onReady(msg)
	}
	acON_START(){
		this.room.status = true
		if(this.room.players.length==this.room.playIngs.length){
	 		this.room.onStart()
	 	}
	}
	acON_RAISE(msg){
		this.room.onRaise(msg)
	}
	acADDRAISE(){
		this.room.onRaise(msg)
	}
	acSHOW_VALUE(msg){
		this.room.showValue(msg.playerId)
	}
	acGAME_PK(msg){
	 	this.room.onPk(msg)
		const flag = this.room.playIngs.length
		const index = this.roomIndex
		if(flag<2){
			this._finishGame()
			this._reset()	
			this.room.num==this.room.numTotal&&rooms.splice(index, 1);
		}
	}
	acGAME_PASS(msg){
		this.room.onPass(msg)
		const flag = this.room.playIngs.length
		const index = this.roomIndex
		if(flag<2){
			this._finishGame()
	 		this._reset()	
	 		this.room.num==this.room.numTotal&&rooms.splice(index, 1); 	
	 	}
	}
	addfontMsg(msg){
		const flag = this.room.playIngs.length
		if((msg.acType===acType.GAME_PK||msg.acType===acType.GAME_PASS)&&flag<2){
			msg.acType = acType.GAME_OVER	
	 	}
		let frontRoomPlayers = {
			acType :msg.acType,
			playerId :msg.playerId
		}
		if(msg.acType === acType.ON_START&&this.room.players.length==this.room.playIngs.length){
			Object.assign(frontRoomPlayers, {allow:false});
	 	}
	 	if(msg.acType === acType.ON_START&&this.room.players.length==this.room.playIngs.length){
			Object.assign(frontRoomPlayers, {allow:true});
	 	}	
	 	if(msg.acType === acType.GAME_PK||msg.acType === acType.ON_RAISE){	
	 		Object.assign(frontRoomPlayers, {raiseMoney:msg.raiseMoney});
	 	}	

		return {
			acType:msg.acType,
			roomPlayers:this.room,
			backObj:frontRoomPlayers
		}
	}
	_finishGame(){
		this.room.status = false
		this.room.winObj = this.room.playIngs[0]
		this.room.playIngs = []
		this.room.winObj.raiseTotalMoney +=this.room.totalRaiseMoney
	}
	_reset(){
		const temp = this.room.fangzhu.id
		this.room.players.forEach(function(v,k) { 
		    v.state = acType.ON_COME
			if(temp==v.id){
				v.state = acType.ON_READY
			}
			v.isShow = false
		});
		this.room.num++
		this.room.totalRaiseMoney = 0
		const fangzu = this.room.fangzhu
		this.room.playIngs = [fangzu]
		this.room.doingObj = this.room.players[0]
		this.room.stepType = 'BEGEN'
		this.room.fontAcObject.clear();
	}
	[sendObj](acType){
		sendObj = {
			acType:acType.ON_COME,
			roomPlayers:rooms[i],
			backObj:frontRoomPlayers
		}
	}
}
Gameengin.room = null
const main = {
	init(msg){
		const game = new Gameengin()
		return game.main(msg)
	}
}
module.exports=main
// var gameObj=require('./serverGameMain');
var RoomPlayers = require('./roomPlayers');
const rooms=require('./rooms');
const check=require('./check');
const constant=require('./constant');
const acType = constant.acType
var frontRoomPlayers = {}
function main(msg){
	for(let i in rooms){
		if(rooms[i].id == msg.roomId){
			let sendObj = null
			if(!check(msg,rooms[i])){
				return false;
			}
			rooms[i].getAcData(msg)
			if(msg.acType === acType.ON_COME){
 				for(let p in rooms[i].players){
 					rooms[i].players[p].isEnable = true
 				}
 				frontRoomPlayers.acType = acType.ON_COME
	 			frontRoomPlayers.playerId = msg.playerId
 				sendObj = {
 					acType:acType.ON_COME,
 					roomPlayers:rooms[i],
 					backObj:frontRoomPlayers
 				}
		 	}
			if(msg.acType === acType.ON_READY){
 				for(let p in rooms[i].players){
 					rooms[i].players[p].isEnable = true
 				}
 				rooms[i].onReady(msg)
 				frontRoomPlayers.acType = acType.ON_READY
	 			frontRoomPlayers.playerId = msg.playerId
 				sendObj = {acType:acType.ON_READY,roomPlayers:rooms[i],backObj:frontRoomPlayers}
		 	}
			if(msg.acType === acType.ON_START){
				frontRoomPlayers.acType = acType.ON_START
	 			frontRoomPlayers.playerId = msg.playerId
	 			if(rooms[i].players.length==rooms[i].playIngs.length){
	 				rooms[i].onStart()
	 				sendObj = {acType:acType.ON_START,allow:true,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 			}else{
	 				sendObj = {acType:acType.ON_START,allow:false,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 			}
		 	}
		 	if(msg.acType === acType.ON_RAISE){
		 		rooms[i].onRaise(msg)
	 			frontRoomPlayers.acType = acType.ON_RAISE
	 			frontRoomPlayers.playerId = msg.playerId
	 			frontRoomPlayers.raiseMoney = rooms[i].raiseMoney
	 			sendObj = {acType:acType.ON_RAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.ADDRAISE){
	 			frontRoomPlayers.acType = acType.ADDRAISE
	 			frontRoomPlayers.playerId = msg.playerId
	 			frontRoomPlayers.raiseMoney = msg.raiseMoney
	 			rooms[i].onRaise(msg)
	 			sendObj = {acType:acType.ADDRAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.SHOW_VALUE){
	 			rooms[i].showValue(msg.playerId)
	 			frontRoomPlayers.acType = acType.SHOW_VALUE
	 			frontRoomPlayers.playerId = msg.playerId
	 			sendObj = {acType:acType.SHOW_VALUE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.GAME_PK){
	 			frontRoomPlayers.playerId = msg.playerId
	 			frontRoomPlayers.raiseMoney = msg.raiseMoney
	 			rooms[i].onPk(msg)
	 			const flag = rooms[i].playIngs.length
	 			if(flag<2){
	 				checkFinishGame(rooms[i])
	 				const room = resetRoomPlayer(rooms[i])
	 				sendObj = {acType:acType.GAME_OVER,roomPlayers:room,backObj:frontRoomPlayers}	
	 				rooms[i].num==rooms[i].numTotal&&rooms.splice(i, 1);
	 			}else{
	 				frontRoomPlayers.acType = acType.GAME_PK
	 				sendObj = {acType:acType.GAME_PK,roomPlayers:rooms[i],backObj:frontRoomPlayers}	 				
	 			}
	 		}
	 		if(msg.acType === acType.GAME_PASS){
	 			frontRoomPlayers.playerId = msg.playerId
	 			rooms[i].onPass(msg)
	 			const flag = rooms[i].playIngs.length
	 			if(flag<2){
	 				checkFinishGame(rooms[i])
	 				const room = resetRoomPlayer(rooms[i])
	 				sendObj = {acType:acType.GAME_OVER,roomPlayers:room,backObj:frontRoomPlayers}	
	 				rooms[i].num==rooms[i].numTotal&&rooms.splice(i, 1); 	
	 			}else{
	 				frontRoomPlayers.acType = acType.GAME_PASS
	 				sendObj = {acType:acType.GAME_PASS,roomPlayers:rooms[i],backObj:frontRoomPlayers}				
	 			}
	 		}
	 		console.log(5555555555555)
	 		console.log(sendObj)
	 		console.log(2222222111)
	 		return sendObj
		}
	}
}
const checkFinishGame =(roomPlayer)=>{
	roomPlayer.winObj = roomPlayer.playIngs[0]
	roomPlayer.playIngs = []
	frontRoomPlayers.acType = acType.GAME_OVER
	roomPlayer.winObj.raiseTotalMoney +=roomPlayer.totalRaiseMoney
}
function resetRoomPlayer(roomPlayers){
	for(let r in roomPlayers.players){
		roomPlayers.players[r].state = acType.ON_COME
		if(roomPlayers.fangzhu.id==roomPlayers.players[r].id){
			roomPlayers.players[r].state = acType.ON_READY
		}
		roomPlayers.players[r].isShow = false
	}
	roomPlayers.num++
	roomPlayers.totalRaiseMoney = 0
	roomPlayers.playIngs = [roomPlayers.fangzhu]
	roomPlayers.doingObj = roomPlayers.players[0]
	roomPlayers.stepType = 'BEGEN'
	roomPlayers.fontAcObject.clear();
	return roomPlayers;
}
const sendObj = Symbol('sendObj');
class Gameengin{
	static selectRoom(msg){
		console.log(rooms)
		rooms.forEach(function(v,k){
			if(v.id == msg.roomId){
				this.room = v
			}
		})
	}
	static main(msg){
		this.selectRoom(msg)
		switch (msg.acType)
		{
			case acType.ON_COME:
			  this.acON_COME;
			  break;
			case acType.ON_READY:
			  this.acON_READY;
			  break;
			case acType.ON_START:
			  this.acON_START;
			  break;
			case acType.ON_RAISE:
			  this.acON_RAISE;
			  break;
			case acType.ADDRAISE:
			  this.acADDRAISE;
			  break;
			case acType.SHOW_VALUE:
			  this.acSHOW_VALUE;
			  break;
			case acType.GAME_PK:
			  this.acGAME_PK;
			  break; 
			case acType.GAME_PASS:
			  this.acGAME_PASS;
			  break;
			default:    
			  this.acON_COME;
		}
		return this.addfontMsg(msg) 
	}
	static acON_COME(){
		this.room.players.forEach(function(v,k) { 
		    v.players[p].isEnable = true
		});
	}
	static acON_READY(msg){
		this.room.onReady(msg)
	}
	static acON_START(){
		if(this.room.players.length==this.room.playIngs.length){
	 		this.room.onStart()
	 	}
	}
	static acON_RAISE(msg){
		this.room.onRaise(msg)
	}
	static acADDRAISE(){
		this.room.onRaise(msg)
	}
	static acSHOW_VALUE(msg){
		this.room.showValue(msg.playerId)
	}
	static acGAME_PK(msg){
	 	this.room.onPk(msg)
		const flag = this.room.playIngs.length
		if(flag<2){
			this._finishGame()
			this._reset()	
			this.room.num==this.room.numTotal&&rooms.splice(i, 1);
		}
	}
	static acGAME_PASS(){
		this.room.onPass(msg)
		const flag = this.room.playIngs.length
		if(flag<2){
			this._finishGame()
	 		this._reset()	
	 		this.room.num==this.room.numTotal&&rooms.splice(i, 1); 	
	 	}
	}
	static addfontMsg(msg){
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
	 	if(msg.acType === acType.GAME_PK||msg.acType === ON_RAISE){	
	 		Object.assign(frontRoomPlayers, {raiseMoney:msg.raiseMoney});
	 	}	
		return {
			acType:msg.acType,
			roomPlayers:this.room,
			backObj:frontRoomPlayers
		}
	}
	static _finishGame(){
		this.room.winObj = this.room.playIngs[0]
		this.room.playIngs = []
		this.room.winObj.raiseTotalMoney +=this.room.totalRaiseMoney
	}
	static _reset(){
		this.room.players.forEach(function(v,k) { 
		    v.state = acType.ON_COME
			if(this.room.fangzhu.id==v.id){
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
module.exports=Gameengin
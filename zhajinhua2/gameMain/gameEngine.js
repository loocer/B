// var gameObj=require('./serverGameMain');
var RoomPlayers = require('./roomPlayers');
var rooms=require('./rooms');
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
	 				rooms[i].winObj = rooms[i].playIngs[0]
	 				rooms[i].playIngs = []
	 				frontRoomPlayers.acType = acType.GAME_OVER
	 				const room = resetRoomPlayer(rooms[i])
	 				sendObj = {acType:acType.GAME_OVER,roomPlayers:room,backObj:frontRoomPlayers}	 	
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
	 				rooms[i].winObj = rooms[i].playIngs[0]
	 				rooms[i].playIngs = []
	 				frontRoomPlayers.acType = acType.GAME_OVER
	 				const room = resetRoomPlayer(rooms[i])
	 				sendObj = {acType:acType.GAME_OVER,roomPlayers:room,backObj:frontRoomPlayers}	 	
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
function resetRoomPlayer(roomPlayers){
	for(let r in roomPlayers.players){
		roomPlayers.players[r].state = acType.ON_COME
		if(roomPlayers.fangzhu.id==roomPlayers.players[r].id){
			roomPlayers.players[r].state = acType.ON_READY
		}
		roomPlayers.players[r].isShow = false
	}
	roomPlayers.playIngs = [roomPlayers.fangzhu]
	roomPlayers.doingObj = roomPlayers.players[0]
	roomPlayers.stepType = 'BEGEN'
	roomPlayers.fontAcObject.clear();
	return roomPlayers;
}
module.exports=main
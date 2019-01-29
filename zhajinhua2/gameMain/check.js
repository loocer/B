const constant=require('./constant');
const acType = constant.acType
const stepType = constant.stepType
const check = (msg, room)=>{
	const actype = msg.acType
	const roomPlayers = room.players
	if(actype == acType.ON_COME){
		if(room.stepType != stepType.DOING){
			if(roomPlayers.length>room.peopleNum){
				return false
			}else{
				return true
			}
		}else{
			return false
		}
	}
	if(actype == acType.ON_READY){
		if(room.stepType != stepType.DOING){
			return true
		}else{
			return false
		}
	}
	if(actype == acType.ON_START){
		if(room.stepType != stepType.DOING){
			if(room.fangzhu.id ==msg.playerId){
				if(room.players.length >=room.playIngs.length){
					return true
				}else{
					return false
				}
			}else{
				return false
			}
		}else{
			return false
		}
	}
	if(actype == acType.SHOW_VALUE){
		if(room.stepType == stepType.DOING){
			const tempPlayer = room.getPlayerById(msg.playerId)
			if(tempPlayer.isShow){
				return false
			}
			return true
		}else{
			return false
		}
	}
	return true
}
module.exports=check
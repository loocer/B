class Player{
	constructor(){
		this.id = null
		this.user = null
        this.text = ""
		this.state = null
		this.position = []
		this.raiseMoney = 200
        this.pokerValue = []
		this.raiseTotalMoney = 200
	}
	setPokerValue(val){
		this.pokerValue = val
	}
}

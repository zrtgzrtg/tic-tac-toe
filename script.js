
const game = (function() {

    let gameboard;
    function init() {
        gameboard = Array(9).fill().map(() => new squareState())
    }
    function getGameboard(){
        return gameboard
    }
    function changeSquare(index, playerSymbol) {
        const square = gameboard[index]
        if(square.getState() === "empty") {
            square.changeState(playerSymbol)
        } else {
            throw Error ("Square Already filled!!")
        }
        evaluateGame(playerSymbol)
    }
    function evaluateGame(playerSymbol) {
        const winOptions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        for(let i = 0; i<winOptions.length;i++){
            let res = evalWinOption(winOptions[i],playerSymbol)
            if(res === true) {
                console.log("Game Finished. Player with Symbol: " + playerSymbol + " won!!")
            }
            
        }
    }
    function evalWinOption(arr3val,playerSymbol) {
        if(gameboard[arr3val[0]].getState()===gameboard[arr3val[1]].getState()){
           let res = gameboard[arr3val[0]].getState()===gameboard[arr3val[2]].getState()
           return (gameboard[arr3val[0]].getState()===playerSymbol) ? res:false; 
        } else {
            return false
        }
    }
    return {
        init,
        getGameboard,
        changeSquare
    }

})()
const squareState = function() {
    let currentstate = "empty"
    function changeState(playerSymbol) {
        currentstate = playerSymbol
    }
    function getState() {
        return currentstate
    }
    return {
        changeState,
        getState,
    }
}

game.init()
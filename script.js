
const game = (function() {

    let gameboard        = null;
    let containerHtml    = null;    
    let restartButtonDiv = null; 
    let playerXturn      = null;
    let playerXname      = null;
    let playerOname      = null;
    let playerXScore     = null;
    let playerOScore     = null;
    const formDivPlayerX = document.querySelector(".player1")
    const formDivPlayerO = document.querySelector(".player2")
    const scoreDiv = document.querySelector(".score-div")
    const playerWonDiv = document.querySelector(".player-won")
    console.log(formDivPlayerX)
    function init() {
        containerHtml    = document.querySelector(".container")
        restartButtonDiv = document.querySelector(".restart-buttons")    
        bindListener()
        bindListenerGameboard()
    }
    function initGameboard() {
        gameboard = Array(9).fill().map(() => new squareState())
        playerXturn = true
        playerXname = "X-player"
        playerOname = "O-player"
        playerXScore = 0
        playerOScore = 0         
        delDOM()
        genDOM()
    }
    function softInitGameboard() {
        gameboard = Array(9).fill().map(() => new squareState())
        playerXturn = true
        delDOM()
        genDOM()
    }
    function getGameboard(){
        return gameboard
    }
    function changeSquare(index, playerSymbol) {
        const square = gameboard[index]
        if(square.getState() === "empty") {
            square.changeState(playerSymbol)
        } else {
              throw Error("Square Already filled!!")
        }
        evaluateGame(playerSymbol)
    }
    function evaluateGame(playerSymbol) {
        const winOptions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        for(let i = 0; i<winOptions.length;i++){
            let res = evalWinOption(winOptions[i],playerSymbol)
            if(res === true) {
                if(playerSymbol==="x") {
                    playerXScore++
                    console.log(playerXScore)
                    containerHtml.removeEventListener("click",bindListenerGameboardFunction)
                    updateWonPlayer("Player with Symbol: " + playerXname + " won!!")
                } else if(playerSymbol==="o") {
                    playerOScore++
                    console.log(playerOScore)
                    containerHtml.removeEventListener("click",bindListenerGameboardFunction)
                    updateWonPlayer("Player with Symbol: " + playerOname + " won!!")
                }
                return
            }
        }
            if(checkTie()){
                updateWonPlayer("Tie!! No more Squares available!")
                playerXScore = playerXScore + 0.5
                playerOScore = playerOScore + 0.5
                containerHtml.removeEventListener("click",bindListenerGameboardFunction)
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
    function checkTie(){
        let res = true
        gameboard.forEach(element => {
            if(element.getState()==="empty"){
                res = false
            }
        });
            return res
    }
    function genDOM() {
        for(let i = 0;i<gameboard.length;i++) {
            const square = document.createElement("div")
            square.setAttribute("class", "game-square")
            square.setAttribute("id", `${i}`)
            containerHtml.appendChild(square)
    
        }
    }
function delDOM() {
while(containerHtml.firstChild) {
    containerHtml.removeChild(containerHtml.firstChild)
}
}
    function updateDOM(playerXturn, eventid) {
        const children = containerHtml.children
        let svgString = playerXturn ? "svg/x.svg" : "svg/circle.svg"
        let svgPic = document.createElement("img")
        svgPic.setAttribute("src", svgString)
        let res =(gameboard[eventid].getState()==="empty") ? null : svgPic 
            if(res !== null) {
            children[eventid].appendChild(res) 
            }
            updateScore()
        }
    function bindListenerGameboard() {
        containerHtml.addEventListener("click",bindListenerGameboardFunction)
        }
    function bindListenerGameboardFunction(event){
            let playerSymbol = playerXturn ? "x" : "o"
            changeSquare(event.target.id, playerSymbol)
            updateDOM(playerXturn, event.target.id)
            playerXturn = !playerXturn
}
            
    function bindListener(){
        restartButtonDiv.addEventListener("click", (event)=> {
            if(event.target.id==="start-button"){
                initGameboard()
                bindListenerGameboard()
                resetScoreboard()
            } else {
                (playerOScore===null&&playerXScore===null) ? initGameboard() : softInitGameboard()
                bindListenerGameboard()
                resetScoreboardTextOnly()
                console.log("reached")
            }
        })
        formDivPlayerX.addEventListener("submit", (event)=> {
            event.preventDefault()
            const form = event.target
            const formData = new FormData(form)
            let eventInput = event.target.elements["player1Name"]

            if(playerXname==="X-player") {
            playerXname = formData.get("player1Name")
            }
            eventInput.value = ""
            console.log(playerXname)
        }) 
        formDivPlayerO.addEventListener("submit", (event)=> {
            event.preventDefault()
            const form = event.target
            const formData = new FormData(form)
            let eventInput = event.target.elements["player2Name"]

            if(playerOname==="O-player"){
            playerOname = formData.get("player2Name")
            }
            eventInput.value = ""
            console.log(playerOname)
        })
    }
    function updateScore() {
        scoreDiv.textContent = `${playerXScore} : ${playerOScore}`
    }
    function updateWonPlayer(text) {
        playerWonDiv.textContent = text
    }
    function resetScoreboard() {
        scoreDiv.textContent = "0 : 0"
        playerWonDiv.textContent = ""
    }
    function resetScoreboardTextOnly() {
        playerWonDiv.textContent = ""
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
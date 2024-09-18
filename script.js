
const game = (function() {

    let gameboard;
    const containerHtml = document.querySelector(".container")
    let playerXturn = true
    const restartButtonDiv = document.querySelector(".restart-buttons")
    let playerXname = null
    let playerOname = null
    let playerXScore = 0
    let playerOScore = 0
    const formDivPlayerX = document.querySelector(".player1")
    const formDivPlayerO = document.querySelector(".player2")
    console.log(formDivPlayerX)
    function init() {
        bindListener()
        console.log(restartButtonDiv)
    }
    function initGameboard() {
        gameboard = Array(9).fill().map(() => new squareState())
        genDOM()
        bindListenerGameboard()
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
                console.log("Game Finished. Player with Symbol: " + playerSymbol + " won!!")
                return
            }
        }
            if(checkTie()){
                console.log("Game Finished. No more Squares available!")
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
    function updateDOM(playerXturn, eventid) {
        const children = containerHtml.children
        let svgString = playerXturn ? "svg/x.svg" : "svg/circle.svg"
        let svgPic = document.createElement("img")
        svgPic.setAttribute("src", svgString)
        let res =(gameboard[eventid].getState()==="empty") ? null : svgPic 
            if(res !== null) {
            children[eventid].appendChild(res) 
            }
        }
    function bindListenerGameboard() {
        
        containerHtml.addEventListener("click",(event) => {
            let playerSymbol = playerXturn ? "x" : "o"
            changeSquare(event.target.id, playerSymbol)
            updateDOM(playerXturn, event.target.id)
            playerXturn = !playerXturn
        })
            }
    function bindListener(){
        restartButtonDiv.addEventListener("click", (event)=> {
            if(event.target.id==="start-button"){
                initGameboard()
            } else {
                initGameboard()
            }
        })
        formDivPlayerX.addEventListener("submit", (event)=> {
            event.preventDefault()
            const form = event.target
            const formData = new FormData(form)
            let eventInput = event.target.elements["player1Name"]

            if(playerXname===null) {
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

            if(playerOname===null){
            playerOname = formData.get("player2Name")
            }
            eventInput.value = ""
            console.log(playerOname)
        })

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
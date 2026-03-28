let arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
console.log(arr);
let move = false;
let movesArr = [null, null, null, null, null, null, null, null, null];
let winOne = null;
let winTwo = null;
let winThree = null;
let winnerPlayer = null;
function checkWin(movesArr, arr) {
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i];
        if ((movesArr[temp[0]] != null && movesArr[temp[1]] != null && movesArr[temp[2]] != null) && (movesArr[temp[0]] === movesArr[temp[1]] && movesArr[temp[0]] === movesArr[temp[2]])) {
            winnerPlayer = (movesArr[temp[0]] === true) ? "X" : "O";
            winOne = temp[0].toString();
            winTwo = temp[1].toString();
            winThree = temp[2].toString();
            return true;
        }
    }
    return false;
}
function filled(movesArr) {
    let filledCount = 0;
    for (let i = 0; i < movesArr.length; i++) {
        if ((movesArr[i] !== null)) filledCount++;
    }
    return (filledCount === 9) ? true : false;
}
let boxes = document.querySelectorAll(".box");
boxes.forEach((val) => {
    let indx = Number(val.id);
    val.onclick = () => {
        movesArr[indx] = move;
        val.innerText = (move === true) ? "X" : "O";
        move = !move;
        val.disabled = true;
        let win = checkWin(movesArr, arr);
        if (win) {
            let winDashBrd = document.querySelector(".winner");
            let wt = document.querySelector(".winnerText");
            wt.innerHTML = `Winner : ${winnerPlayer}<br> &hearts; Congratulations &hearts;`;
            winDashBrd.style.visibility = "visible";

            let minB = document.querySelectorAll(".Minibox");
            minB.forEach((val) => {
                let indx = val.id;
                if (movesArr[Number(indx)] === null) {
                    val.innerText = "";
                } else {
                    val.innerText = (movesArr[Number(indx)] === true) ? "X" : "O";
                }
                if (indx === winOne || indx === winTwo || indx === winThree) {
                    val.style.backgroundColor = "#626bb3";
                }
            });

            document.querySelector(".board").classList.add("dim");
            document.querySelector(".board").style.pointerEvents = "none";



        } else if ((filled(movesArr))) {
            let winDashBrd = document.querySelector(".winner");
            let wt = document.querySelector(".winnerText");
            wt.innerHTML = `Game was Draw !!<br> Play Again&hearts;`;
            winDashBrd.style.visibility = "visible";
            let minB = document.querySelectorAll(".Minibox");
            minB.forEach((val) => {
                let indx = val.id;
                if (movesArr[Number(indx)] === null) {
                    val.innerText = "";
                } else {
                    val.innerText = (movesArr[Number(indx)] === true) ? "X" : "O";
                }
            });

            document.querySelector(".board").classList.add("dim");
            document.querySelector(".board").style.pointerEvents = "none";

        }
    };

});

let resetBtn = document.querySelector(".reset");
let gameReset = () => {
    boxes.forEach((val) => {
        movesArr[Number(val.id)] = null;
        val.innerText = "";
        val.disabled = false;
    })
    move = false;
    winnerPlayer = null;
    let w = document.querySelector(".winner");
    w.style.visibility = "hidden";

    let minBx = document.querySelectorAll(".Minibox");
    minBx.forEach((val) => {
        val.innerText = "";
        let indx = val.id;
        if (indx === winOne || indx === winTwo || indx === winThree) {
            val.style.backgroundColor = "#C1C6EA";
        }
    });
    document.querySelector(".board").classList.remove("dim");
    document.querySelector(".board").style.pointerEvents = "auto";
}
resetBtn.addEventListener("click", gameReset);


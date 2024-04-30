/* -------------
Grobal Constant
------------- */

const choices = document.querySelectorAll('.choice');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');

const scoreWin = document.getElementById('scoreWin');
const scoreLose = document.getElementById('scoreLose');
const scoreDraw = document.getElementById('scoreDraw');

const scoreboard = {
    player: 0,
    computer: 0,
    draw: 0,
    count: 0
};

const yourname2 = document.getElementById('yourname')


/* -------------
Event Listeners
------------- */
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
yourname2.addEventListener('click', writePlayerName);


// Play game
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
};


// Get computers choice
function getComputerChoice() {
    const randomNumber = Math.random();
    if (randomNumber < 0.34) {
        return 'グー';
    } else if (randomNumber <= 0.67) {
        return 'パー';
    } else {
        return 'チョキ';
    }
};


// Get game winner
function getWinner(p, c) {
    if (p === c) {
        return 'あいこ';
    } else if (p === 'グー') {
        if (c === 'パー') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'パー') {
        if (c === 'チョキ') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'チョキ') {
        if (c === 'グー') {
            return 'computer';
        } else {
            return 'player';
        }
    }
};


function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        // SFX
        document.getElementById('sfxWin').currentTime = 0; //連続クリックに対応
        document.getElementById('sfxWin').play(); //クリックしたら音を再生
        // Inc player score
        scoreboard.player++;
        scoreboard.count++;
        // Show modal result
        result.innerHTML = `
            <h1 class="text-win">You Win</h1>
            <h3 class="text-win">${playerName.outerHTML}<br>あなたの勝ち</h3>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>コンピュータは <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    } else if (winner === 'computer') {
        // SFX
        document.getElementById('sfxLose').currentTime = 0;
        document.getElementById('sfxLose').play();
        // Inc computer score
        scoreboard.computer++;
        scoreboard.count++;
        // Show modal result
        result.innerHTML = `
            <h1 class="text-lose">You Lose</h1>
            <h3 class="text-lose">${playerName.outerHTML}<br>あなたの負け</h3>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>コンピュータは <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    } else {
        // SFX
        document.getElementById('sfxDraw').currentTime = 0;
        document.getElementById('sfxDraw').play();
        // Inc computer score
        scoreboard.draw++;
        scoreboard.count++;
        // Show modal result
        result.innerHTML = `
            <h1>It's A Draw</h1>
            <h3>${playerName.outerHTML}<br>引き分け</h3>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>コンピュータは <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    }
    // Show score
    scoreWin.innerHTML = `
    <p> ${playerName.textContent} Win: ${scoreboard.player}</p>
    `;
    scoreLose.innerHTML = `
    <p> ${playerName.textContent} Win: ${scoreboard.computer}</p>
    `;
    scoreDraw.innerHTML = `
    <p> Draw: ${scoreboard.draw}</p>
    `;
    scoreCount.innerHTML = `
    <p> Count: ${scoreboard.count}</p>
    `;

    modal.style.display = 'block';
};


// Restart game
function restartGame() {
    document.getElementById('sfxReset').currentTime = 0;
    document.getElementById('sfxReset').play();

    setTimeout(() => {
        location.reload();
    }, 3000);

    // scoreboard.player = 0;
    // scoreboard.computer = 0;
    // scoreboard.draw = 0;
    // scoreboard.count = 0;
    // scoreWin.innerHTML = `
    // <p>Player Win: ${scoreboard.player}</p>
    // `;
    // scoreLose.innerHTML = `
    // <p>Computer Win: ${scoreboard.computer}</p>
    // `;
    // scoreDraw.innerHTML = `
    // <p>Draw: ${scoreboard.draw}</p>
    // `;
    // scoreCount.innerHTML = `
    // <p>Count: ${scoreboard.count}</p> 
    // `;
    // playerName.textContent = `
    // `
};


// Clear modal
function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};


// SFX Volume
const v1 = document.getElementById('sfxWin');
v1.volume = 1.0;
const v2 = document.getElementById('sfxLose');
v2.volume = 0.7;
const v3 = document.getElementById('sfxDraw');
v3.volume = 0.6;
const v4 = document.getElementById('sfxReset')
v4.volume = 1.0;


// Player Name
const input = document.getElementById('input');
const playerName = document.getElementById('playername');
input.addEventListener('input', function () {
    playerName.textContent = this.value;
});


// Player Name hidden Button
document.querySelector('#yourname').addEventListener('click', () => {
    const element = document.getElementById('input');
    element.remove();
});


// Player name hidden Button hidden
const yourname = document.querySelector('#yourname');
yourname.addEventListener('click', () => {
    yourname.remove();
    playerName.remove();
});


// write Player Name
function writePlayerName() {
    scoreWin.innerHTML = `
    <p>${playerName.textContent} Win: ${scoreboard.player}</p>
    `;
    scoreLose.innerHTML = `
    <p>${playerName.textContent} Lose: ${scoreboard.computer}</p>
    `;
};




/* -----------------
下キー＆右キーを検出する
----------------- */

let isDownPressed = false;
let isRightPressed = false;

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
        isDownPressed = true;
    } else if (event.key === 'ArrowRight') {
        isRightPressed = true;
        // } else if (event.key === 'p') {
        //     isP_Pressed = true;
    } if (isDownPressed && isRightPressed) {
        console.log('下キーと右キーが同時に押されました');
        restartGame();
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowDown') {
        isDownPressed = false;
    } else if (event.key === 'ArrowRight') {
        isRightPressed = false;
    }
});


// × Allow → ○ Arrow, shiftKeyは"k"だとダメ！！

/* ---------------------------------------
キー入力に対して、予め指定した動作を行う（工事中）
--------------------------------------- */

// document.addEventListener('keydown', function (e) {
//     // Enter押したらプレイ発動したいね
//     if (e.key === 'Enter') {
//         play(e);
//     }
//     if (e.key === 'ArrowLeft') {
//         console.log('左が押されたよ');
//     }
//     if (e.shiftKey && e.key === 'ArrowRight') {
//         console.log('shift + 右 が押されたよ');
//     }
//     if (e.key === 'ArrowDown' && e.key === 'ArrowRight') {
//         console.log('下 + 右 が押されたよ');
//     }
// });


/* -------------------------
キー入力を配列に格納する（工事中）
------------------------- */

window.addEventListener('DOMContentLoaded', function () {
    let key_input = new Array();

    window.addEventListener('keydown', function (e) {
        e.preventDefault();
        key_input.push(e.key);
    });

    window.addEventListener('keyup', function (e) {
        if (0 < key_input.length) {
            console.log(key_input);
            key_input = new Array();  //配列を初期化しないと、ログが蓄積され続ける
        }

        // let commandResult = key_input.includes('ArrowDown', 'ArrowDown', 'ArrowRight', 'ArrowRight', 'p');
        // console.log(commandResult);
        // includesメソッドは、要素の複数指定ができない

        // let filterResult = key_input.filter(function (filterValue) {
        //     return filterValue === 'p';
        // })
        // console.log(filterResult);
        // filterメソッドも何となくダメ

    });
});
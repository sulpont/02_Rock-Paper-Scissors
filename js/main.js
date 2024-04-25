const choices = document.querySelectorAll('.choice');
const scoreWin = document.getElementById('scoreWin');
const scoreLose = document.getElementById('scoreLose');
const scoreDraw = document.getElementById('scoreDraw');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0,
    draw: 0,
    count: 0
};


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
            <h3>引き分け</h3>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p>コンピュータは <strong>${computerChoice.charAt(0).toUpperCase() +
            computerChoice.slice(1)}</strong></p>
    `;
    }
    // Show score
    scoreWin.innerHTML = `
    <p>Player Win: ${scoreboard.player} （${winRate.result}）</p>
    `;
    scoreLose.innerHTML = `
    <p> Computer Win: ${scoreboard.computer}</p>
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
    scoreboard.player = 0;
    scoreboard.computer = 0;
    scoreboard.count = 0;
    scoreWin.innerHTML = `
    <p>Player Win: ${scoreboard.player}</p>
    `;
    scoreLose.innerHTML = `
    <p>Computer Win: ${scoreboard.computer}</p>
    `;
    scoreDraw.innerHTML = `
    <p>Draw: ${scoreboard.draw}</p>
    `;
    scoreCount.innerHTML = `
    <p>Count: ${scoreboard.count}</p> `
};

// Clear modal
function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);

// SFX Volume
const v1 = document.getElementById('sfxWin');
v1.volume = 1.0;
const v2 = document.getElementById('sfxLose');
v2.volume = 0.7;
const v3 = document.getElementById('sfxDraw');
v3.volume = 0.6;

// Player Name
const $input = document.getElementById('input');
const $playerName = document.getElementById('playerName');
$input.addEventListener('input', function () {
    $playerName.textContent = this.value;
});

// Player Name hidden Button
document.querySelector('#hidden').addEventListener('click', () => {
    const element = document.getElementById('input');
    element.remove();
});

// Player name hidden Button hidden
const hidden = document.querySelector('.hidden');
hidden.addEventListener('click', () => {
    hidden.remove();
});

// winning rate Calc
const winRate = (scoreWin, scoreCount) => {
    const winRateResult = (scoreWin / scoreCount) * 100;
    winRate.textContent = `${winRateResult}% `;
}
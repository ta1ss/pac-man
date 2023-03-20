import TileMap from "./map.js"

// game stuff
let gameOver = false
let gameWon = false
let inputEnabled = true;

const backgroundMusic = new Audio('/sounds/backgroundmusic2.wav')
backgroundMusic.volume = 0.3
backgroundMusic.loop = true
const gameOverSound = new Audio('/sounds/gameOver.wav')
gameOverSound.volume = 0.4
const gameWonSound = new Audio('/sounds/gameWin.wav')
gameWonSound.volume = 0.4
const coinInsert = new Audio('/sounds/coin.mp3')
coinInsert.volume = 0.3
const soundButton = document.querySelector('.sound-button');
soundButton.addEventListener('click', toggleSound);

const soundOnLogo = new Image();
soundOnLogo.src = '/media/sound-on.png';
const soundOffLogo = new Image();
soundOffLogo.src = '/media/sound-off.png';

let lives = 3
let stopTimer = false;

//scoreboard stuff
document.addEventListener("DOMContentLoaded", fetchScores);
let allScores = [];
let onlyScores = [];
let currentPage = 1;
let campaignScore = false

// map stuff
const tileSize = 32
let tileMap = new TileMap(tileSize, true)

// pacman stuff
const velocity = 1
let pacman = tileMap.getPacman(velocity)

// ghost stuff
let ghosts = tileMap.getGhost(velocity)

//timer stuff
let totalPauseTime = 0;
let elapsedTime = 0;
let startTime = performance.now();
let pauseStartTime = 0;
let pauseEndTime = 0;
let endTime = 0;

//fps stuff
const fpsDiv = document.getElementById('fps')
let lastTime = performance.now();
let frameCount = 0;
let fpsTotal = 0;
let averageFps = 0;
const fpsUpdateInterval = 10;
const fpsLimit = 90;
let lastFrameTime = 0;
let gameStarted = false;

// pause stuff
let paused = false;
const arenaContainer = document.getElementById('arena-container');
const pauseMenu = document.getElementById('pausemenu');

// campaign/regular stuff 
const campaignScreen = document.getElementById('campaign-story');
const textElement = document.getElementById("campaign-text");
const previousButton = document.getElementById("campaign-back");
const nextButton = document.getElementById("campaign-next");
const campaignInput = document.getElementById("campaign-input");
const campaignLetsGo = document.getElementById("campaign-submit");
const campaignNameInput = document.getElementById("campaign-name");
const campaignNemesisNameInput = document.getElementById("campaign-nemesis-name");
const continueGame = document.getElementById('campaign-checkpoint')
const continueButton = document.getElementById('continue-campaign')


//prevBtn & nextBtn
document.addEventListener("click", (e) => {
  if (e.target.classList.contains('prev')) {
    prevPage();
  }
  if (e.target.classList.contains('next')) {
    nextPage();
  }
});

// pause key, restart key, and sound button
document.addEventListener("keydown", (e) => {
  if (e.key === "r" && inputEnabled) {
    location.reload();
  }

  if (e.key === "p" && inputEnabled) {
    paused = !paused;
    if (paused && !gameOver && !gameWon) {
      pauseStartTime = performance.now();
      pauseMenu.classList.remove('hidden');
    } else if (!paused && !gameOver && !gameWon) {
      pauseEndTime = performance.now();
      totalPauseTime += pauseEndTime - pauseStartTime;
      pauseMenu.classList.add('hidden');
    }
  }
  if(e.key === "m" && inputEnabled){
    toggleSound();
  }
});

//resume & restart buttons
document.addEventListener("click", (e) => {
  if (e.target.id === 'resume-btn'){
    paused = !paused;
    pauseMenu.classList.add('hidden');
  }
  if (e.target.id === 'restart-btn') {
    location.reload();
  }
});

function toggleSound() {
  const cookie = document.cookie;
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    soundButton.src = soundOnLogo.src;
    soundButton.alt = 'Sound on';
    if(cookie){
      document.cookie = 'bgMusic=true';
    }
  } else {
    backgroundMusic.pause();
    soundButton.src = soundOffLogo.src;
    soundButton.alt = 'Sound off';
    if(cookie){
      document.cookie = 'bgMusic=false';
    }
  }
}

// score related funcs
function fetchScores() {
  fetch("/get-scores")
    .then((response) => response.json())
    .then((scores) => {
      onlyScores = scores.map((score) => score.score);
      allScores = scores;
      displayScores(currentPage);
    });
}

function displayScores(page) {
  const pageSize = 5;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const scoresToDisplay = allScores.slice(start, end);

  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = ""; 

  scoresToDisplay.forEach((score) => {
    updateScoreboard(score);
  });
  updateButtonsState(page);
}

function updateScoreboard(score) {
  const scoreboard = document.getElementById("scoreboard");
  const scoreElement = document.createElement("div");
  scoreElement.classList.add("scoreboard-score");
  scoreElement.textContent = `${score.rank}. ${score.name} - ${score.time} - ${score.score}`;
  scoreboard.appendChild(scoreElement);
}

async function sendScores() {
  const gameWon = document.getElementById('game-won');
  let name
  if (gameWon.classList.contains('hidden')) {
    name = document.getElementById('lost-name').value;
  } else {
    name = document.getElementById('won-name').value;
  }
  const score = tileMap.score;
  const time = formatTime(elapsedTime);
  const data = { name, score, time };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch('/post-score', options);

    if (response.ok) {
      location.reload();
    } else {
      console.error('Error sending scores:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function percentileRank(scores, currentScore) {
  const sortedScores = scores.slice().sort((a, b) => a - b);
  const index = sortedScores.findIndex(score => score >= currentScore);
  const percentile = (index / sortedScores.length) * 100;
  return Math.round(percentile);
}

function nextPage() {
  if (campaignScore) {
    return
  } else {
    currentPage += 1;
    fetchScores(currentPage);
  }
}

function prevPage() {
  if (campaignScore) {
    return
  } else {
    if (currentPage > 1) {
      currentPage -= 1;
      fetchScores(currentPage);
    }
  }
}

function updateButtonsState(currentPage) {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const totalPages = Math.ceil(allScores.length / 5);
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
}

function calculateFPS() {
  let currentTime = performance.now();
  fpsTotal += Math.round(1000 / (currentTime - lastTime));
  lastTime = currentTime;
  frameCount++;

  if (frameCount === fpsUpdateInterval) {
    averageFps = Math.round(fpsTotal / fpsUpdateInterval);
    fpsDiv.innerHTML = "FPS: " + averageFps;
    fpsTotal = 0;
    frameCount = 0;
  }
}

function displayTimer() {
  const timerElement = document.getElementById('timer');
  if (gameStarted && !stopTimer) {
    timerElement.textContent = formatTime(elapsedTime);
  } else if (!gameStarted){
    timerElement.textContent = '00:00';
  } else if (stopTimer) {
    timerElement.textContent = formatTime(endTime);
  }
}

function displayScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: ' + tileMap.score;
}

function displayLives() {
  const livesElement = document.getElementById('lives');
  livesElement.textContent = 'Lives: ' + lives;
}

function formatTime(timeInMilliseconds) {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const prefix = paused ? '-' : ''; // add a negative sign when paused
  return `${prefix}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function started() {
  return !pacman.madeFirstMove || gameOver || gameWon;
}

function bgMusicCookie() {
  const cookie = document.cookie;
  if (cookie) {
    const cookieArray = cookie.split('=');
    if (cookieArray[1] === 'false') {
      backgroundMusic.pause();
      soundButton.src = soundOffLogo.src;
      soundButton.alt = 'Sound off';
      return false
    } 
  } else {
    document.cookie = 'bgMusic=true';
    return true
  }
  return true
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      if(lives === 1) {
        stopTimer = true;
      }
      inputEnabled = false;
      pacman.inputEnabled = false;
      gameOverSound.play()
      endTime = elapsedTime

      if (campaignScore) {
        const pausemenu = document.querySelector('#game-over-campaign');
        document.querySelector('#elapsed-time-campaign').textContent = formatTime(elapsedTime);
        document.querySelector('#sub-score-campaign').textContent = tileMap.score;
        pausemenu.classList.remove('hidden');
      } else {
        const pausemenu = document.querySelector('#game-over');
        const precentileScore = percentileRank(onlyScores, tileMap.score);
        document.querySelector('#elapsed-time').textContent = formatTime(elapsedTime);
        document.querySelector('#sub-score').textContent = tileMap.score;
        document.querySelector('#percentile').textContent = precentileScore;
        pausemenu.classList.remove('hidden');
  
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains('submit')) {
            sendScores();
          }
        });
      }
    }
  }
}

function checkGameWin() {
  if (!gameWon) {
    gameWon = tileMap.didWin()
    if (gameWon) {
      backgroundMusic.volume = 0.1
      gameWonSound.play()
      inputEnabled = false;
      pacman.inputEnabled = false;

      if (tileMap.currentLevel < tileMap.mapsLenght -1 ) {
        tileMap.currentLevel++
        if (tileMap.currentLevel === tileMap.mapsLenght -1 && campaignScore) {
              continueGame.classList.remove('hidden')
              continueButton.addEventListener('click', () => {
              gameWon = false
              backgroundMusic.volume = 0.3
              resetGame()
              inputEnabled = true;
              pacman.inputEnabled = true;
              continueGame.classList.add('hidden')
          })
        } else {
        setTimeout(() => {
          gameWon = false
          backgroundMusic.volume = 0.3
          resetGame()
          inputEnabled = true;
          pacman.inputEnabled = true;
        }, 4000)
      }

      } else {
      backgroundMusic.pause()
      endTime = elapsedTime
      stopTimer = true;

      if (campaignScore) {
        const gameWon = document.getElementById('game-won-campaign');
        document.querySelector('#elapsed-time1-campaign').textContent = formatTime(elapsedTime);
        document.querySelector('#sub-score1-campaign').textContent = tileMap.score;
        gameWon.classList.remove('hidden');
        fakeWonScoreboard()
      } else {
        const gameWon = document.getElementById('game-won');
        const precentileScore = percentileRank(onlyScores, tileMap.score);
        document.querySelector('#elapsed-time1').textContent = formatTime(elapsedTime);
        document.querySelector('#sub-score1').textContent = tileMap.score;
        document.querySelector('#percentile1').textContent = precentileScore;
        gameWon.classList.remove('hidden');
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains('submit')) {
            sendScores();
          }
        });
        }
      }
    }
  }
}

function isGameOver() {
  if (lives > 1) {
    if (ghosts.some(ghost => !pacman.powerDotActive && ghost.collideWith(pacman))){
      backgroundMusic.volume = 0.1
      gameOverSound.play()
      const pacmanId = document.getElementById('pacman');
      pacmanId.style.visibility = 'hidden';
      pacman.animateDeath()
      paused = true;
      inputEnabled = false;
      pacman.inputEnabled = false;

      setTimeout(() => {
        totalPauseTime += 3000;
        paused = false;
        const pacmanDeath = document.getElementById('pacman-death');
        pacmanDeath.remove();
        pacmanId.style.visibility = 'visible';
        backgroundMusic.volume = 0.3
        inputEnabled = true;
        pacman.inputEnabled = true;
      }, 3000);
      lives -= 1;
      tileMap.score = (tileMap.score > 50) ? (tileMap.score - 50) : 0;
      resetPacman();
      resetGhosts();
      resetPowerDots();
      return false;
    }
  } else {
  return ghosts.some(ghost => !pacman.powerDotActive && ghost.collideWith(pacman));
  }
}

function showCampaignText(){
  const campaignPages = tileMap.campaignPages
  let currentPage = tileMap.currentCampaignPage
  campaignScreen.classList.remove('hidden');
  campaignLetsGo.classList.add('hidden');

  function showText() {
    textElement.innerHTML = campaignPages[currentPage];
    if (currentPage === 0) {
      campaignInput.classList.remove('hidden');
      previousButton.classList.add('hidden');
    } else {
      campaignInput.classList.add('hidden');
      previousButton.classList.remove('hidden');
    }
  }

  showText()

  previousButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--
      showText()
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage === 0 && (!campaignNameInput.value || !campaignNemesisNameInput.value)) {
      alert('Please enter your name and your nemesis name')
      return;
    }
    if (currentPage < campaignPages.length - 1) {
      fakeScoreboard();
      currentPage++;
      showText();
    }

    if (currentPage === campaignPages.length -1) {
      campaignLetsGo.classList.remove('hidden');
      previousButton.classList.add('hidden');
      nextButton.classList.add('hidden');
    }
  });
}

function fakeScoreboard() {
      const scoreboard = document.getElementById("scoreboard");
      scoreboard.innerHTML = ""; 

      const score1 = document.createElement("div");
      score1.classList.add("scoreboard-score");
      score1.innerText = `1. ${campaignNemesisNameInput.value} - 06:12 - 4260`;

      const score2 = document.createElement("div");
      score2.classList.add("scoreboard-score");
      score2.innerText = `2. ${campaignNameInput.value} - 05:34 - 4130`;

      const score3 = document.createElement("div");
      score3.classList.add("scoreboard-score");
      score3.innerText = `3. gmrgrl - 05:54 - 3980`;

      const score4 = document.createElement("div");
      score4.classList.add("scoreboard-score");
      score4.innerText = `4. 80085 - 05:42 - 3760`;

      const score5 = document.createElement("div");
      score5.classList.add("scoreboard-score");
      score5.innerText = `5. AAAAAA - 05:41 - 3750`;

      scoreboard.appendChild(score1);
      scoreboard.appendChild(score2);
      scoreboard.appendChild(score3);
      scoreboard.appendChild(score4);
      scoreboard.appendChild(score5);
}

function fakeWonScoreboard() {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = ""; 


  const score1 = document.createElement("div");
  score1.classList.add("scoreboard-score");
  score1.innerText = `1. ${campaignNameInput.value} - ${formatTime(elapsedTime)} - ${tileMap.score}`;

  const score2 = document.createElement("div");
  score2.classList.add("scoreboard-score");
  score2.innerText = `2. ${campaignNemesisNameInput.value} - 06:12 - 4260`;

  const score3 = document.createElement("div");
  score3.classList.add("scoreboard-score");
  score3.innerText = `3. gmrgrl - 05:54 - 3980`;

  const score4 = document.createElement("div");
  score4.classList.add("scoreboard-score");
  score4.innerText = `4. 80085 - 05:42 - 3760`;

  const score5 = document.createElement("div");
  score5.classList.add("scoreboard-score");
  score5.innerText = `5. AAAAAA - 05:41 - 3750`;

  scoreboard.appendChild(score1);
  scoreboard.appendChild(score2);
  scoreboard.appendChild(score3);
  scoreboard.appendChild(score4);
  scoreboard.appendChild(score5);
}

function showWelcomeScreen() {
  inputEnabled = false;
  pacman.inputEnabled = false;
  const welcomeScreen = document.getElementById('welcome-screen');
  const campaignButton = document.getElementById('campaign-button');
  const regularButton = document.getElementById('regular-button');

  let music = false;
  music = bgMusicCookie();

  campaignButton.addEventListener('click', () => {
    campaignScore = true
    welcomeScreen.style.display = 'none';
    showCampaignText();
    campaignLetsGo.addEventListener('click', () => {
      coinInsert.play()
      setTimeout(() => {
        campaignScreen.classList.add('hidden');
        nextButton.classList.remove('hidden');
        previousButton.classList.remove('hidden')
        loadData(true);
      }, 800)
      
    })
  });

  regularButton.addEventListener('click', () => {
    loadData(false);
  });

  function loadData(campaign) {
    tileMap = null;
    tileMap = new TileMap(tileSize, campaign);
    pacman = tileMap.getPacman(velocity)
    ghosts = tileMap.getGhost(velocity)
    tileMap.initializeMap()
    startGame(); 
  }

  function startGame() {
    welcomeScreen.style.display = 'none';
    if(music) {
      backgroundMusic.play()
    }
    inputEnabled = true;
    pacman.inputEnabled = true;
    requestAnimationFrame(gameLoop);
  }
  welcomeScreen.style.display = 'block';
}

// reset funcs
function resetGame() {
  tileMap.resetMap()
  pacman = tileMap.getPacman(velocity);
  ghosts = tileMap.getGhost(velocity)
}

function resetPacman() {
  const pacmanStart = tileMap.pacmanStart[tileMap.currentLevel];
  pacman.y = pacmanStart[0] * tileMap.tileSize;
  pacman.x = pacmanStart[1] * tileMap.tileSize;
  pacman.madeFirstMove = false;
}

function resetGhosts() {
  if(ghosts.length < tileMap.ghostStart.length){
    for (let i = ghosts.length; i < tileMap.ghostStart.length; i++) {
      tileMap.reviveGhost(ghosts, velocity)
    }
  }

  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].x = tileMap.ghostStart[i][1] * tileMap.tileSize;
    ghosts[i].y = tileMap.ghostStart[i][0] * tileMap.tileSize;
  }
}

function resetPowerDots(){
  for(let i = 0; i < tileMap.powerDotStart.length; i++){
    const row = tileMap.powerDotStart[i][0];
    const col = tileMap.powerDotStart[i][1];
    tileMap.map[row][col] = 2;
  }
} 


showWelcomeScreen()

// main function
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastFrameTime;
  const currentTime = performance.now();

  if (!gameStarted) {
    if(!started()) {
      startTime = currentTime;
      gameStarted = true;
    }
  }

  if (deltaTime >= (1000 / fpsLimit)) {
    lastFrameTime = timestamp;
    calculateFPS()
    if(!paused){
      tileMap.draw();
      pacman.draw(started(), ghosts);
      ghosts.forEach(ghost => ghost.draw(started(), pacman));

      elapsedTime = currentTime - startTime - totalPauseTime;
      displayTimer();
      displayScore();
      displayLives();
    }
    checkGameOver()
    checkGameWin()
  }
  requestAnimationFrame(gameLoop);
}
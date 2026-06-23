const reasons = [
  { text: "Reason 1: I'm really fun (I think)", img:"img/lachen.webp"},
  { text: "Reason 2: I will be loyal (alwaaaays)", img: "img/smile.webp" },
  { text: "Reason 3: I don't cheat (why should I?)", img: "img/liiiiiiiiiiiiiiike.webp" },
  { text: "Reason 4: I reply fast (95% of the time, sometimes my brain is kinda slow)", img: "img/huuuuh.webp" },
  { text: "Reason 5: I will always be there for you and love you", img: "img/ring.webp" }
];

let currentReasonIndex = -1; 
let noClickCount = 0;

function updateContent() {
  const reasonElement = document.getElementById('reason');
  const imgElement = document.getElementById('main-img');
  const navControls = document.getElementById('nav-controls');
  const specialButton = document.getElementById('special-button');
  
  if (!reasonElement || !imgElement || !navControls || !specialButton) return;

  const backButton = document.querySelector('.navigation .nav-button:first-child');
  const nextButton = document.querySelector('.navigation .nav-button:last-child');

  if (currentReasonIndex !== -1) {
    reasonElement.textContent = reasons[currentReasonIndex].text;
    imgElement.src = reasons[currentReasonIndex].img; 
    navControls.style.display = 'flex';

    if (currentReasonIndex === 0) {
      backButton.style.display = 'none';
    } else {
      backButton.style.display = 'block';
    }

    if (currentReasonIndex === reasons.length - 1) {
      nextButton.style.display = 'none';
      specialButton.textContent = "Continue";
      specialButton.style.display = 'block';
    } else {
      nextButton.style.display = 'block';
      specialButton.style.display = 'none';
    }
  }
}

function handleAction() {
  if (currentReasonIndex === -1) {
    currentReasonIndex = 0;
    updateContent();
  } else {
    window.location.href = "final.html";
  }
}

function nextReason() {
  if (currentReasonIndex !== -1 && currentReasonIndex < reasons.length - 1) {
    currentReasonIndex++;
    updateContent();
  }
}

function previousReason() {
  if (currentReasonIndex > 0) {
    currentReasonIndex--;
    updateContent();
  }
}

function sayYes() {
  const imgElement = document.getElementById('final-img');
  const textElement = document.getElementById('final-text');
  const buttonGroup = document.getElementById('button-group');
  const loveMessage = document.getElementById('love-message');

  if (imgElement && textElement) {
    imgElement.src = "img/2.webp";
    textElement.textContent = "yaaaaaaaaaay ";
  }
  
  if (buttonGroup) {
    buttonGroup.style.display = 'none';
  }

  if (loveMessage) {
    loveMessage.style.display = 'block';
  }
}
function teleportButton(e) {
  if (e) {
    e.preventDefault();
  }

  const noBtn = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  if (!noBtn || !yesBtn) return;

  noClickCount++;
  noBtn.classList.add('absolute-btn');

  const padding = 30;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const yesRect = yesBtn.getBoundingClientRect();

  let randomX, randomY;
  let overlapsYes = true;
  let attempts = 0;

  while (overlapsYes && attempts < 100) {
    randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    const noLeft = randomX;
    const noRight = randomX + noBtn.offsetWidth;
    const noTop = randomY;
    const noBottom = randomY + noBtn.offsetHeight;

    const buffer = 15;
    const hitX = noRight > (yesRect.left - buffer) && noLeft < (yesRect.right + buffer);
    const hitY = noBottom > (yesRect.top - buffer) && noTop < (yesRect.bottom + buffer);

    if (!(hitX && hitY)) {
      overlapsYes = false;
    }
    attempts++;
  }

  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';

  let scaleValue = 1 + (noClickCount * 0.15);
  yesBtn.style.transform = `scale(${scaleValue})`;
  
  if (noClickCount >= 5) {
    yesBtn.style.width = '100%';
  }
}

function createBackgroundHearts() {
  const bg = document.getElementById('heart-bg');
  if (!bg) return;
  
  const heartTypes = ['❤️', '💖', '✨', '🌸', '💕'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    bg.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 600);
}

function createBackgroundFlowers() {
  const bg = document.getElementById('heart-bg'); 
  if (!bg) return;
  
  setInterval(() => {
    const flower = document.createElement('div');
    flower.classList.add('floating-flower');
    
    flower.style.left = Math.random() * 100 + 'vw';
    
    const randomScale = Math.random() * 0.8 + 0.5; 
    flower.style.transform = `scale(${randomScale})`;
    
    flower.style.animationDuration = (Math.random() * 4 + 5) + 's, ' + (Math.random() * 2 + 2) + 's';
    
    bg.appendChild(flower);
    
    setTimeout(() => {
      flower.remove();
    }, 9000);
  }, 400); 
}

document.addEventListener("DOMContentLoaded", () => {
  createBackgroundFlowers();
  createBackgroundHearts();
});
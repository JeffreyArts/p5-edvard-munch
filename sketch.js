let backgroundImage 
let topLip 
let bottomLip 
let scream 
let automatischSluitenMond
let screamStarted = false

const audioCheckbox = document.getElementById("allowAudio")
const mouth = {
  volume: 1,
  top: {
    height: 30,
    width: 36,
    x: 522,
    y: 775,
  },
  bottom: {
    height: 24,
    width: 36,
    x: 522,
    y: 805,
  }
}

// Laad alle bestanden in.
function preload() {
  topLip = loadImage('/assets/mond-boven.png');
  bottomLip = loadImage('/assets/mond-onder.png');
  backgroundImage = loadImage('/assets/scream.jpg');
  scream = loadSound('/assets/man-screaming-1-minute.mp3');
}

// Crëeer canvas
function setup() {
  createCanvas(1020, 1305);
  closeMouth()
}

// Teken loop
function draw() {
  background(220);

  // Mute audio wanneer checbox checked is
  if (!audioCheckbox.checked) {
    mouth.volume = 0
  } 

  // Bepaal volume van de audio
  scream.amp(mouth.volume)

  // Teken de edited versie van The Scream by Edvard Munch
  image(backgroundImage, 0, 0);

  // Teken bovenlip
  image(topLip, mouth.top.x, mouth.top.y, mouth.top.width, mouth.top.height);
  
  // Teken onderlip
  image(bottomLip, mouth.bottom.x, mouth.bottom.y, mouth.bottom.width, mouth.bottom.height);

}

function closeMouth() {
  // Mond hoeft niet meer automatisch gesloten te worden wanneer deze functie wordt uitgevoerd
  clearTimeout(automatischSluitenMond)

  // Animeer onderkant mond
  gsap.to(mouth.bottom, {
    height: 10,
    duration: .4
  })
  
  // Animeer bovenkant mond
  gsap.to(mouth.top, {
    height: .1,
    y: 805,
    duration: .4
  })
  
  // "Animeer" de fade out van het geluidsfragment
  gsap.to(mouth, {
    volume: 0,
    duration: .4,
    onComplete: function() {
      scream.stop()
      screamStarted = false
    }
  })
}

function openMouth() {
  // Stop alle lopenende gsap animaties om te voorkomen dat de onComplete wordt uitgevoerd om de audio te steoppen
  gsap.killTweensOf(mouth)
  
  // Check of audio niet al is begonnen met spelen, en start met het afspelen ervan wanneer dit niet het geval is
  mouth.volume = 1
  if (!screamStarted) {
    scream.play()
    screamStarted = true
  }

  // Animeer onderkant mond
  gsap.to(mouth.bottom, {
    height: 30,
    duration: .4
  })

  // Animeer bovenkant mond
  gsap.to(mouth.top, {
    height: 32,
    y: 773,
    duration: .4
  })

  // Sluit mond na 70 seconden automatisch
  automatischSluitenMond = setTimeout(function() {
    closeMouth()
  },70*1000)
}

// Event listeners voor toetsenbord
document.addEventListener("keydown", openMouth)
document.addEventListener("keyup", closeMouth)

// Event listeners voor muis
document.addEventListener("mousedown", openMouth)
document.addEventListener("mouseup", closeMouth)
# P5 Edvard Munch – The Scream °No 5 (interactieve reproductie)

Dit project toont een interactieve reproductie van The Scream (Edvard Munch). De mond van het figuur opent en sluit wanneer je op de afbeelding drukt en speelt een schreeuw-geluidsfragment af via p5.sound. Je kunt de mond openen/sluiten met toetsenbord, muis of touch. Een checkbox in de UI schakelt audio aan/uit.

## Project Structuur

- `index.html` – Laadt styles en libraries (`gsap`, `p5`, `p5.sound`) en bevat de audio-checkbox UI
- `sketch.js` – Hoofdscript met pre-loaden van assets, canvas-setup, tekenloop, animaties en input-afhandeling
- `style.css` – Styling voor canvas-layout en de audio-checkbox
- `assets/` – Afbeeldingen en audio:
  - `scream.jpg` – Achtergrondafbeelding
  - `mond-boven.png` – Bovenlip-overlay
  - `mond-onder.png` – Onderlip-overlay
  - `man-screaming-1-minute.mp3` – Geluidsfragment
- `libraries/` – Externe libraries (`gsap.min.js`, `p5.min.js`, `p5.sound.min.js`)

## Variabelen Uitleg

### Afbeeldingen & Audio
- `backgroundImage` – p5.Image van de achtergrond (`assets/scream.jpg`)
- `topLip` – p5.Image van de bovenlip (`assets/mond-boven.png`)
- `bottomLip` – p5.Image van de onderlip (`assets/mond-onder.png`)
- `scream` – p5.SoundFile met het schreeuw-geluidsfragment

### UI & State
- `audioCheckbox` – Verwijzing naar de checkbox (`#allowAudio`) om audio te (de-)activeren
- `automatischSluitenMond` – Timer ID (van `setTimeout`) om de mond automatisch te sluiten
- `screamStarted` – Boolean die bijhoudt of het audiofragment al is gestart (voorkomt dubbel starten)

### Mondconfiguratie
- `mouth` – Object dat mondparameters en volume bevat:
  - `volume` – Huidig volumedoel (0–1) voor het geluidsfragment
  - `top` – Bovenlippositie en -afmetingen:
    - `height`, `width` – Hoogte en breedte van de bovenlip
    - `x`, `y` – Canvaspositie van de bovenlip
  - `bottom` – Onderlippositie en -afmetingen:
    - `height`, `width` – Hoogte en breedte van de onderlip
    - `x`, `y` – Canvaspositie van de onderlip

## Functies Uitleg

### preload()
Laadt alle benodigde assets vóórdat `setup()` start:
- Laadt `mond-boven.png`, `mond-onder.png`, `scream.jpg` en `man-screaming-1-minute.mp3` met p5-loaders.

### setup()
Initialiseert het canvas en de beginsituatie:
- Maakt een canvas van 1020×1305 (past bij de artwork-verhouding)
- Roept `closeMouth()` aan om de mond in gesloten beginsituatie te zetten

### draw()
Wordt elke frame uitgevoerd en tekent de scene:
1. Stelt een neutrale achtergrondkleur in
2. Schakelt audio uit als de checkbox niet is aangevinkt: zet `mouth.volume = 0`
3. Past het audioniveau toe met `scream.amp(mouth.volume)`
4. Tekent de achtergrondafbeelding
5. Tekent de bovenlip en onderlip op basis van `mouth.top` en `mouth.bottom`

### openMouth()
Opent de mond en start audio (indien nog niet spelend):
1. Stopt actieve GSAP-animaties op `mouth` om conflicten te voorkomen
2. Zet `mouth.volume = 1` en start het `scream`-geluid als het nog niet gestart is
3. Animeert onderlip naar open-stand (`height: 30`)
4. Animeert bovenlip naar open-stand (`height: 32`, `y: 773`)
5. Start een timer die na 70 seconden automatisch `closeMouth()` aanroept

### `closeMouth()`
Sluit de mond en stopt audio netjes:
1. Annuleert de automatische sluit-timer (indien aanwezig)
2. Animeert onderlip naar gesloten-stand (`height: 10`)
3. Animeert bovenlip naar gesloten-stand (`height: 0.1`, `y: 805`)
4. Animeert volume naar 0 en stopt daarna het geluid; reset `screamStarted`

### Event Listeners
- Toetsenbord: `keydown` → `openMouth()`, `keyup` → `closeMouth()`
- Muis: `mousedown` → `openMouth()`, `mouseup` → `closeMouth()`
- Touch: `touchstart` → `openMouth()`, `touchend` → `closeMouth()`

## P5.js Lifecycle Functies

### preload()
Wordt één keer uitgevoerd vóór `setup()` om assets te laden.

### setup()
Wordt één keer uitgevoerd bij start; maakt het canvas en zet de starttoestand.

### draw()
Loopt continu; tekent achtergrond en lip-overlays en past audio toe.

## Technische Details

### Audio met p5.sound
- Volumeregeling via `scream.amp(mouth.volume)`
- Geluid start één keer per open-actie dankzij `screamStarted`
- Audio kan effectief gedempt worden door de checkbox (zet `mouth.volume` op 0)

### Animaties met GSAP
- Lip-hoogtes en -posities worden vloeiend geanimeerd met `gsap.to`
- Volume-fade-out bij sluiten via GSAP-animatie op `mouth.volume`

### Input-afhandeling
- Zowel toetsenbord, muis als touch worden ondersteund voor toegankelijkheid
- Automatisch sluiten na 70 seconden voorkomt oneindig afspelen

### Layout & Responsiviteit
- Het canvas heeft een vaste aspectverhouding, en schaalt via CSS (`aspect-ratio`, `max-width`, `max-height`)
- Het canvas wordt gecentreerd met een subtiele rand en schaduw
- De audio-toggle (`label` + checkbox) is gepositioneerd rechtsonder

## Gebruik

1. Open `index.html` in een moderne webbrowser
2. Zorg dat de checkbox "Audio" aangevinkt is als je geluid wilt horen
3. Houd een toets ingedrukt, klik met de muis, of raak het scherm aan om de mond te openen
4. Laat los om de mond te sluiten; na 70s sluit de mond automatisch

## Inspiratie

Deze interactieve studie is gebaseerd op Edvard Munchs The Scream en is onderdeel van een [bredere serie digitale reproducties](https://github.com/search?q=owner%3AJeffreyArts+p5&type=repositories) met p5.js. De lip-overlays en het geluidsfragment versterken de expressie van de schreeuw, terwijl eenvoudige input de interactie intuïtief houdt. 



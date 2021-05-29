// Speech recognition api - https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

const msgEl = document.getElementById('msg')

// GENERATE RANDOM NUMBER FROM 1 - 100
const randomNumber = Math.floor(Math.random() * (100 - 1) + 1)
// console.log(randomNumber)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

// START RECOGNITION AND GAME - TURN ON MICROPHONE
recognition.start()

// CAPTURE USER SPEAK INPUT
function onSpeak(e) {
    // console.log(e)
    // console.log(e.results[0][0].transcript) // result of speak

    const wordSpeaked = e.results[0][0].transcript

    writeMessage(wordSpeaked)
    checkNumber(wordSpeaked)
}

// WRITE WHAT USER SPEAKS
function writeMessage(message) {

    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${message}</span>
    `
}

// CHECK MESSAGE AND COMPARE WITH NUMBER
function checkNumber(message) {
    const num = +message
    // console.log(typeof num)
    // console.log(num, randomNumber)
    // console.log(num === randomNumber)

    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div><strong>That is not a valid number</strong></div>   
        `
        return
    }

    // Check in range
    if (num > 100 || num < 0) {
        msgEl.innerHTML += `
        <div><strong>Number must be between 1 and 100</strong></div>
        `
        return
    }

    // Check number
    if (num === randomNumber) {
        document.body.innerHTML = `
        <h2>Congrats!<br> You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `
    } else if (num > randomNumber) {
        msgEl.innerHTML += `
        <div> GO LOWER </div>
        `
    } else if (num < randomNumber) {
        msgEl.innerHTML += `
        <div> GO HIGHER </div>
        `
    }
}

// SPEAK RESULT - EVENT
recognition.addEventListener('result', onSpeak)

// END RECOGNITION SERVICE - it recognition ends, start again and again and again ...
recognition.addEventListener('end', () => recognition.start())

// PLAY AGAIN BUTTON IF USER GUESS NUMBER
document.addEventListener('click', (e) => {
    if (e.target.id === "play-again") {
        window.location.reload()
    }
})
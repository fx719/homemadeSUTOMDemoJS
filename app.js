import words from './data/words.js'
import keyboardLetters from './data/keyboardLetters.js'
import createBox from './functions/createBox.js'
import generateVirtualKeyboard from './functions/generateVirtualKeyboard.js'
import appointBoxes from './functions/appointBoxes.js'
import fillBoxes from './functions/fillBoxes.js'
import eraseLetterBoxLetter from './functions/eraseLetter.js'
import { submitAnswer } from './functions/submitAnswer.js'
import { decrementTimer } from './functions/timer.js'



// Points zone filler
let playerPointsNumber = 0
localStorage.setItem("player_points", playerPointsNumber)
const demoPlayerPointsZone = document.querySelector(".demo_player_points_zone")

let playerPointsStorage = localStorage.getItem("player_points")
const pointsDiv = document.createElement("div")
pointsDiv.innerHTML = `Votre nombre de points actuel : ${playerPointsStorage}`
pointsDiv.classList.add("player_points")
demoPlayerPointsZone.appendChild(pointsDiv)



//Word boxes' generation

const wordIndex = (arrayLength) => Math.floor(Math.random() * arrayLength)





const mainContent = document.querySelector('main')

const letterBoxes = document.querySelector(".letterBoxes")

const letterBox = document.createElement("div")
letterBox.innerText = "."
letterBox.classList.add("letterBox")

let wordToTest = words[wordIndex(words.length)]

const letterBoxesParent = document.querySelector(".letterBoxesObserver")


createBox(wordToTest, letterBoxes, letterBox)

const virtualKeyboard = document.querySelector('.virtualKeyboard')
const virtualKeyboardLetters = document.querySelector('.keyboardLetters')

generateVirtualKeyboard(keyboardLetters, virtualKeyboardLetters)

// ---------------------------------------  Partie assignation id des linees puis boxes -------------------


const letterBoxesLines = document.querySelectorAll('.letterBoxes')
appointBoxes(letterBoxesLines)

let linesArray = Array.from(letterBoxesLines)


linesArray.map((lineX) => {
    lineX.firstChild.innerText = wordToTest[0].toUpperCase()
})


// ------------------------------------------   Partie écriture réponse -----------------------------

const everyKeyboardLetter = document.querySelectorAll('.keyboardLetter')
const eraseLetterButton = document.getElementById('eraseLetterButton')

for (let i = 0; i < everyKeyboardLetter.length; i++) {
    everyKeyboardLetter[i].addEventListener('click', (e) => fillBoxes(linesArray, e.target.innerText))
}

function keydownLetterHandler(e) {
    const expression = /[a-z]/
    if (!expression.test(e.key) || e.key.length > 1) {
    } else {
        fillBoxes(linesArray, e.key)
    }
}

document.body.addEventListener('keydown', keydownLetterHandler)

eraseLetterButton.addEventListener('click', () => {
    try {
        eraseLetterBoxLetter(linesArray)
    } catch (error) { }
})

document.body.addEventListener('keydown', (e) => {
    try {
        if (e.key === 'Backspace') {
            e.preventDefault()
            eraseLetterBoxLetter(linesArray)
        }
    } catch (error) {
        console.error(error)
    }
})





//      -------- Partie soumission réponse -------------------------
const enterButton = document.getElementById('enterButton')



const submitWordWithEnterKey = (triggeredEvent) => {
    if (triggeredEvent.key === 'Enter') {
        triggeredEvent.preventDefault()

        submitAnswer(words, linesArray, mainContent, wordToTest)
    }
}

document.body.addEventListener('keydown', submitWordWithEnterKey)




enterButton.addEventListener('click', async () => {
    submitAnswer(words, linesArray, mainContent, wordToTest)
})

//  ------------ Partie déclenchement timer ----------------------------------

const timerNumbers = document.querySelector(".timerNumbers")
const minutesNumber = document.createElement("p")
const secondsNumber = document.createElement("p")
const timeColon = document.createElement("p")
const decrementButton = document.getElementById("decrementButton")

const boxesToDisable = document.querySelectorAll(".letterBoxes")
for (let box of boxesToDisable) {
    box.setAttribute("disabled", true)
}

timeColon.innerHTML = ":"
minutesNumber.innerHTML = 5
secondsNumber.innerHTML = "00"

timerNumbers.appendChild(minutesNumber)
timerNumbers.appendChild(timeColon)
timerNumbers.appendChild(secondsNumber)




decrementTimer(decrementButton, minutesNumber, secondsNumber, boxesToDisable, enterButton, eraseLetterButton, virtualKeyboard, timerNumbers, submitWordWithEnterKey, keydownLetterHandler, mainContent)


//boxesRecreation

console.log(wordToTest)
const optionsBoxesObserver = { childList: true, CharacterData: false }

const recreateBoxes = async (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            if (mutation.removedNodes.length > 0) {
                wordToTest = words[wordIndex(words.length)]
                console.log(wordToTest)
                const newLetterBoxes = document.createElement("div")
                newLetterBoxes.classList.add("letterBoxes")
                letterBoxesParent.appendChild(newLetterBoxes)
                const newLetterBox = document.createElement("div")
                newLetterBox.innerText = "."
                newLetterBox.classList.add("letterBox")


                playerPointsNumber += 10
                localStorage.setItem("player_points", playerPointsNumber)
                playerPointsStorage = localStorage.getItem("player_points")
                pointsDiv.innerHTML = `Votre nombre de points actuel : ${playerPointsStorage}`

                createBox(wordToTest, newLetterBoxes, newLetterBox)
                const newlines = document.querySelectorAll('.letterBoxes')
                appointBoxes(newlines)


                linesArray = Array.from(newlines)
                linesArray.map((newlineX) => {
                    newlineX.firstChild.innerText = wordToTest[0].toUpperCase()
                })

                break
            }
        }

    }
}

const boxesObserver = new MutationObserver(recreateBoxes)


boxesObserver.observe(letterBoxesParent, optionsBoxesObserver)




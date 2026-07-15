import words from './data/words.js'
import keyboardLetters from './data/keyboardLetters.js'
import createBox from './functions/createBox.js'
import generateVirtualKeyboard from './functions/generateVirtualKeyboard.js'
import appointBoxes from './functions/appointBoxes.js'
import fillBoxes from './functions/fillBoxes.js'
import eraseLetterBoxLetter from './functions/eraseLetter.js'
import { submitAnswer } from './functions/submitAnswer.js'
import flashMessage from './functions/flashMessage.js'
import flashMessagesLibrary from "../data/flashMessages.js"


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




/**
 * Initializes a countdown timer when the decrement button is clicked.
 *
 * - Resets the timer display to 9 minutes and 59 seconds.
 * - Enables previously disabled boxes.
 * - Starts a countdown that decrements seconds every second.
 * - Removes the decrement button once the timer starts.
 * - When time runs out or invalid values are detected, it clears the timer,
 *   removes interactive elements (buttons, keyboard, timer UI),
 *   detaches keydown event handlers, and flashes a "time's up" message.
 *
 * @event click
 * @listens HTMLButtonElement#click
 * @returns {void} Modifies the DOM and game state directly, does not return a value.
 */


/**
 * Starts a countdown timer that updates every second.
 *
 * This interval decreases the displayed seconds and manages the rollover of minutes.
 * When the timer reaches 0 or invalid values are detected, it stops the timer,
 * removes game controls, detaches keyboard event listeners, and shows a "time's up" message.
 * @function createClickWordSubmissionHandler
 * @constant
 * @type {number} Returns the interval ID which can be used with clearInterval().
 */
decrementButton.addEventListener("click", () => {
    minutesNumber.innerHTML = 4
    secondsNumber.innerHTML = 59



    for (let box of boxesToDisable) {
        box.removeAttribute("disabled")
    }
    const timerDecrement = setInterval(() => {

        decrementButton.remove()

        secondsNumber.innerHTML--
        if (minutesNumber.innerHTML < 0 || secondsNumber.innerHTML < 0 || minutesNumber.innerHTML > 10) {
            clearInterval(3)
            enterButton.remove()
            eraseLetterButton.remove()
            virtualKeyboard.remove()
            timerNumbers.remove()
            document.body.removeEventListener('keydown', submitWordWithEnterKey)
            document.body.removeEventListener('keydown', keydownLetterHandler)
            flashMessage(mainContent, flashMessagesLibrary.timeIsUp, false, 5000)
        }
        if (secondsNumber.innerHTML < 1) {
            if (minutesNumber.innerHTML < 1) {
                clearInterval(3)
                enterButton.remove()
                eraseLetterButton.remove()
                virtualKeyboard.remove()
                timerNumbers.remove()
                document.body.removeEventListener('keydown', submitWordWithEnterKey)
                document.body.removeEventListener('keydown', keydownLetterHandler)
                flashMessage(mainContent, flashMessagesLibrary.timeIsUp, false, 5000)
            }
            secondsNumber.innerHTML = 59
            minutesNumber.innerHTML--
        }


    }, 1000)


},
    { once: true }

)


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



//boxesRecreation


const optionsBoxesObserver = { childList: true, CharacterData: false }

const recreateBoxes = async (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            if (mutation.removedNodes.length > 0) {
                wordToTest = words[wordIndex(words.length)]
                const newLetterBoxes = document.createElement("div")
                newLetterBoxes.classList.add("letterBoxes")
                letterBoxesParent.appendChild(newLetterBoxes)
                const newLetterBox = document.createElement("div")
                newLetterBox.innerText = "."
                newLetterBox.classList.add("letterBox")

                //addPointsLocal()


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
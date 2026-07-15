import words from './data/words.js'
import keyboardLetters from './data/keyboardLetters.js'
import createBox from './functions/createBox.js'
import generateVirtualKeyboard from './functions/generateVirtualKeyboard.js'
import appointBoxes from './functions/appointBoxes.js'
import fillBoxes from './functions/fillBoxes.js'
import eraseLetterBoxLetter from './functions/eraseLetter.js'
import { submitAnswer } from './functions/submitAnswer.js'



const wordIndex = (arrayLength) => Math.floor(Math.random() * arrayLength)



const mainContent = document.querySelector('main')

const letterBoxes = document.querySelector(".letterBoxes")

const letterBox = document.createElement("div")
letterBox.innerText = "."
letterBox.classList.add("letterBox")

let wordToTest = words[wordIndex(words.length)]

const letterBoxesParent = document.querySelector(".letterBoxesObserver")


createBox(wordToTest, letterBoxes, letterBox)

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

/**
 * Handles word submission when the "Enter" key is pressed.
 *
 * This function listens for the Enter key and, when triggered, validates the user's input:
 * - Iterates over each line in `linesArray` to find the active, writable line.
 * - Checks if the line is complete; if not, displays a "too short" flash message.
 * - Checks if the proposed word exists in the dictionary (`words`); if not, displays a "not in dictionary" message.
 * - If the word is complete and valid, colors the boxes using `colorBoxes`.
 * - If the proposed word matches the target word (`wordToTest`), it displays a points gain message, removes all lines after a short delay, and selects a new target word.
 * - Otherwise, it displays a fail message.
 *
 * @function submitWordWithEnterKey
 * @param {KeyboardEvent} triggeredEvent - The keydown event triggered by the user pressing a key.
 * @returns {void} Modifies the DOM directly by updating letters' colors, removing lines, and showing flash messages; does not return a value.
 */

const submitWordWithEnterKey = (triggeredEvent) => {
    if (triggeredEvent.key === 'Enter') {
        triggeredEvent.preventDefault()

        submitAnswer(words, linesArray, mainContent, wordToTest, wordIndex)
    }
}

document.body.addEventListener('keydown', submitWordWithEnterKey)


/**
 * Handles word submission when the "Enter" button is clicked.
 *
 * This asynchronous event listener performs the following steps:
 * - Iterates over each line in `linesArray` to find the active, writable line.
 * - Retrieves the user's proposed word by removing newline characters.
 * - Checks if the line is incomplete (last box is "."); if so, displays a "too short" flash message.
 * - Checks if the proposed word exists in the dictionary (`words`); if not, displays a "not in dictionary" message.
 * - If the line is complete and the word is valid:
 *   - Colors the boxes according to correctness using `colorBoxes`.
 *   - If the proposed word matches the target word (`wordToTest`):
 *     - Displays a points gain flash message.
 *     - Removes all lines after a short delay.
 *     - Chooses a new target word from the `words` array.
 *   - Otherwise, displays a fail message.
 *
 * @event click
 * @listens HTMLButtonElement#click
 * @returns {void} Modifies the DOM directly by coloring boxes, removing lines, and showing flash messages; does not return a value.
 */

enterButton.addEventListener('click', async () => {
    submitAnswer(words, linesArray, mainContent, wordToTest, wordIndex)
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
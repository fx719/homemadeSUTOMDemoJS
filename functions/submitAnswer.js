import flashMessagesLibrary from "../data/flashMessages.js"
import { colorBoxes } from "./colorBoxes.js"
import flashMessage from "./flashMessage.js"


/**
 * Handles word submission when the "Enter" key is pressed or clicked (on the virtual Keyboard).
 *
 * This function listens for the Enter key and, when triggered, validates the user's input:
 * - Iterates over each line in wordLines Array to find the active, writable line.
 * - Checks if the line is complete; if not, displays a "too short" flash message.
 * - Checks if the proposed word exists in the dictionary (wordsArray); if not, displays a "not in dictionary" message.
 * - If the word is complete and valid, colors the boxes using `colorBoxes`.
 * - If the proposed word matches the target word (wordToGuess), it displays a points gain message, removes all lines after a short delay.
 * - Otherwise, it displays a fail message.
 * @param {Array} wordsArray 
 * @param {Array} wordLines 
 * @param {HTMLElement} mainPageSection 
 * @param {string} wordToGuess 
 */

export const submitAnswer = (wordsArray, wordLines, mainPageSection, wordToGuess) => {
    for (let i = 0; i < wordLines.length; i++) {

        let proposedWord = wordLines[i].innerText.replaceAll('\n', '')
        const wordIsInDictionnary = wordsArray.includes(proposedWord.toUpperCase())


        if (!wordLines[i].attributes.disabled && wordLines[i].lastChild.innerText === '.') {
            flashMessage(mainPageSection, flashMessagesLibrary.tooShort, false, 2000)

            break
        }

        if (!wordIsInDictionnary && wordLines[i].lastChild.innerText !== '.') {
            flashMessage(mainPageSection, flashMessagesLibrary.wordIsNotInDictionnary, false, 2000)
            break
        } else {


            if (!wordLines[i].attributes.disabled && wordLines[i].lastChild.innerText !== '.') {
                colorBoxes(wordToGuess, wordLines[i])

                if (proposedWord === wordToGuess.toUpperCase()) {


                    flashMessage(mainPageSection, flashMessagesLibrary.victoryMessage, true, 3000)

                    setTimeout(() => {
                        wordLines.map((linesX) => {
                            linesX.remove()
                        })
                    }, 2000)


                } else {

                    flashMessage(mainPageSection, flashMessagesLibrary.failMessage, false, 3000)
                }
                break
            }
        }
    }
}
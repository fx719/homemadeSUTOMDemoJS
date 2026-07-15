import flashMessagesLibrary from "../data/flashMessages.js"
import { colorBoxes } from "./colorBoxes.js"
import flashMessage from "./flashMessage.js"

export const submitAnswer = (wordsArray, wordLines, mainPageSection, wordToGuess, findNewWord) => {
    for (let i = 0; i < wordLines.length; i++) {

        let proposedWord = wordLines[i].innerText.replaceAll('\n', '')
        const wordIsInDictionnary = wordsArray.includes(proposedWord.toUpperCase())

        console.log(`proposedWord: ${proposedWord}`)
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


                    wordToGuess = wordsArray[findNewWord(wordsArray.length)]

                } else {

                    flashMessage(mainPageSection, flashMessagesLibrary.failMessage, false, 3000)
                }
                break
            }
        }
    }
}
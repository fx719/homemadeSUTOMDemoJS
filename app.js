import words from './data/words.js'
import keyboardLetters from './data/keyboardLetters.js'
import createBox from './functions/createBox.js'
import generateVirtualKeyboard from './functions/generateVirtualKeyboard.js'

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
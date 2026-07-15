import { colorInGreenOrYellow } from "./colorInGreenOrYellow.js"

/**
 * Colors all boxes in a line based on the user's submitted word.
 *
 * This function iterates over each letter of the user's word in both
 * forward and reverse order, calling `colorInGreenOrYellow` to apply
 * the correct coloring (green for correct letters, yellow for letters
 * in the word but in the wrong position). After processing, the line
 * of boxes is disabled to prevent further editing.
 *
 * @async
 * @function colorBoxes
 * @param {string} wordFromArray - The target word of the game.
 * @param {HTMLElement} lineOfBoxes - The container element representing the row of letter boxes for the user's guess.
 * @returns {Promise<void>} Modifies the DOM directly to color the boxes and disables the line of boxes.
 * @throws {Error} If any unexpected error occurs during the coloring process.
 */



export const colorBoxes = async (wordFromArray, lineOfBoxes) => {


    try {
        let occurences = []
        const wordFromArraySorted = Array.from(wordFromArray.toUpperCase()).slice().sort()

        const userWordArray = []

        const userLetters = lineOfBoxes.children
        for (let i = 0; i < userLetters.length; i++) {
            userWordArray.push(userLetters[i].innerText)
        }
        const userWord = userWordArray.join('')



        for (let i = 0; i < wordFromArray.length; i++) {

            colorInGreenOrYellow(wordFromArray, i, userWord, occurences, wordFromArraySorted, lineOfBoxes, false)

        }


        for (let x = wordFromArray.length - 1; x >= 0; x--) {

            colorInGreenOrYellow(wordFromArray, x, userWord, occurences, wordFromArraySorted, lineOfBoxes, true)

        }

        lineOfBoxes.setAttribute('disabled', true)

    } catch (error) {
        console.error(error)
    }

}
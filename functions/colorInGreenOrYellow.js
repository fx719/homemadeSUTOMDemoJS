/**
 * Colors the letter boxes in green or yellow based on the user's guess.
 *
 * This function checks each letter of the user's submitted word (`wordSentByUser`)
 * against the game's target word (`gamesWord`). 
 *
 * - If a letter is in the correct position and matches the game's word, the corresponding
 *   box is colored green.
 * - If a letter exists in the game's word but in a different position, the box is colored yellow.
 * - Handles multiple occurrences of the same letter and uses a reverse loop flag to prevent
 *   double coloring in certain conditions.
 *
 * The function modifies the DOM directly by setting the `backgroundColor` of the boxes
 * with a small timeout for visual effect.
 *
 * @function colorInGreenOrYellow
 * @param {string} gamesWord - The correct target word of the game.
 * @param {number} gamesWordIndex - The current index of the letter being checked in the word.
 * @param {string} wordSentByUser - The word submitted by the player.
 * @param {string[]} occurencesUsersWordAndGamesWord - Array tracking occurrences of letters already processed to handle duplicates correctly.
 * @param {string[]} gamesWordArraySorted - Sorted array of letters in the target word, used for duplicate handling.
 * @param {HTMLElement} targetedLetterBoxesLine - The container element representing the row of letter boxes for the current guess.
 * @param {boolean} isExecutedInAReverseLoop - Flag to indicate if the function is being executed in a reverse loop (used for duplicate letter handling).
 * @returns {void} Modifies the DOM directly, does not return a value.
 */





export const colorInGreenOrYellow = (gamesWord, gamesWordIndex, wordSentByUser, occurencesUsersWordAndGamesWord, gamesWordArraySorted, targetedLetterBoxesLine, isExecutedInAReverseLoop) => {

    const letter = gamesWord[gamesWordIndex].toUpperCase()

    const userLetter = wordSentByUser[gamesWordIndex]
    let letterFound = gamesWord.toUpperCase().indexOf(userLetter)

    //if letter is in the game'word
    if (letterFound != -1) {

        //if it's a perfect occurence
        if (letter === userLetter) {
            //letter perfectly matches the other word's one, color in green
            if (!isExecutedInAReverseLoop) {
                occurencesUsersWordAndGamesWord.push(userLetter)
                occurencesUsersWordAndGamesWord.sort()
            }
            let result = occurencesUsersWordAndGamesWord.lastIndexOf(userLetter) - occurencesUsersWordAndGamesWord.indexOf(userLetter)
            let resultgamesWord = gamesWordArraySorted.lastIndexOf(userLetter) - gamesWordArraySorted.indexOf(userLetter)

            if (result > resultgamesWord) {
            } else {
                let boxToFill = document.getElementById(`${targetedLetterBoxesLine.id}-${gamesWordIndex}`)
                if (boxToFill === null) { } else {
                    setTimeout(() => { boxToFill.style.backgroundColor = 'rgb(90, 214, 90)' }, gamesWordIndex * 300)
                }
            }
        }
        //if it's not a perfect occurence but the userLetter does exist in the game's word
        else if (letter != userLetter) {


            if (isExecutedInAReverseLoop) {
                const userLetterExistsLaterInWordArray = gamesWord.toUpperCase().lastIndexOf(userLetter) < wordSentByUser.indexOf(userLetter)
                const userLetterExistsLaterInwordSentByUser = wordSentByUser.lastIndexOf(userLetter) < wordSentByUser.indexOf(userLetter)

                if (userLetterExistsLaterInwordSentByUser && userLetterExistsLaterInWordArray) {


                } else {

                    occurencesUsersWordAndGamesWord.push(userLetter)
                    occurencesUsersWordAndGamesWord.sort()

                    let result = occurencesUsersWordAndGamesWord.lastIndexOf(userLetter) - occurencesUsersWordAndGamesWord.indexOf(userLetter)
                    let resultgamesWord = gamesWordArraySorted.lastIndexOf(userLetter) - gamesWordArraySorted.indexOf(userLetter)


                    if (result > resultgamesWord) {
                    } else {
                        let boxToFill = document.getElementById(`${targetedLetterBoxesLine.id}-${gamesWordIndex}`)
                        if (boxToFill === null) { } else {
                            setTimeout(() => { boxToFill.style.backgroundColor = 'rgba(218, 169, 10, 0.97)' }, gamesWordIndex * 300)
                        }
                    }

                }

            } else {

                const userLetterExistsLaterInWordArray = gamesWord.toUpperCase().lastIndexOf(userLetter) > wordSentByUser.indexOf(userLetter)
                const userLetterExistsLaterInwordSentByUser = wordSentByUser.lastIndexOf(userLetter) > wordSentByUser.indexOf(userLetter)

                if (userLetterExistsLaterInwordSentByUser && userLetterExistsLaterInWordArray) {


                } else {

                    occurencesUsersWordAndGamesWord.push(userLetter)
                    occurencesUsersWordAndGamesWord.sort()

                    let result = occurencesUsersWordAndGamesWord.lastIndexOf(userLetter) - occurencesUsersWordAndGamesWord.indexOf(userLetter)
                    let resultgamesWord = gamesWordArraySorted.lastIndexOf(userLetter) - gamesWordArraySorted.indexOf(userLetter)


                    if (result > resultgamesWord) {
                    } else {
                        let boxToFill = document.getElementById(`${targetedLetterBoxesLine.id}-${gamesWordIndex}`)
                        if (boxToFill === null) { } else {
                            setTimeout(() => { boxToFill.style.backgroundColor = 'rgba(218, 169, 10, 0.97)' }, gamesWordIndex * 300)
                        }
                    }
                }
                //if the letter doesn't exist in the word at all, do nothing
            }
        }
    }
    else {

    }

}
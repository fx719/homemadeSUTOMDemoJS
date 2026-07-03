/**
 * Fills the first empty box in the active line with the provided key.
 *
 * This function iterates over each line in `linesOfBoxesArray`. 
 * For the first line that is not disabled and has empty boxes (denoted by "."),
 * it fills the first empty box with the provided key in uppercase.
 *
 * @function fillBoxes
 * @param {HTMLElement[]} linesOfBoxesArray - An array of row elements, each containing child box elements representing letters.
 * @param {string} key - The letter to fill into the first empty box of the active line.
 * @returns {void} Modifies the DOM directly by inserting the letter in the active line, does not return a value.
 */

export default function fillBoxes(linesOfBoxesArray, key) {

    for (let i = 0; i < linesOfBoxesArray.length; i++) {
        const targetedLine = linesOfBoxesArray[i]

        const targetedLineIsUncomplete = targetedLine.lastChild.innerText === "."
        const targetedLineIsWritable = !targetedLine.attributes.disabled

        if (targetedLineIsUncomplete && targetedLineIsWritable) {

            for (let i = 0; i < targetedLine.children.length; i++) {

                const targetedBoxIsEmpty = targetedLine.children[i].innerText === "."
                if (targetedBoxIsEmpty) {
                    targetedLine.children[i].innerText = key.toUpperCase()
                    break
                }
            }


            break
        }

        if (!targetedLineIsWritable) {
            continue
        }
        break

    }
}




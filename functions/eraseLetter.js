/**
 * Erases the last letter entered in the active line of boxes.
 *
 * This function iterates over each line in the `linesOfBoxesArray`. 
 * For the first line that is not disabled, it checks the letters and replaces 
 * the last entered letter with a placeholder ("."). It also handles special cases 
 * where letters are in the middle of the line to correctly erase the intended box.
 *
 * @function eraseLetterBoxLetter
 * @param {HTMLElement[]} linesOfBoxesArray - An array of row elements, each containing child box elements representing letters.
 * @returns {void} Modifies the DOM directly by erasing letters in the active line, does not return a value.
 */

export default function eraseLetterBoxLetter(linesOfBoxesArray) {
    for (let lineIndex = 0; lineIndex < linesOfBoxesArray.length; lineIndex++) {
        if (!linesOfBoxesArray[lineIndex].attributes.disabled) {
            const targetedLine = linesOfBoxesArray[lineIndex]
            if (linesOfBoxesArray[lineIndex].lastChild.innerText === ".") {

                for (let i = 0; i < targetedLine.children.length; i++) {
                    if (targetedLine.children[i].nextSibling === null || targetedLine.children[i].previousSibling === null) {
                    } else {
                        if (targetedLine.children[i].nextSibling.innerHTML === "." && targetedLine.children[i].previousSibling.innerText !== ".") {
                            const targetedBox = targetedLine.children[i]
                            targetedBox.innerText = "."

                        }
                    }
                }

            }
            else if (targetedLine.lastChild.innerText !== ".") {
                targetedLine.lastChild.innerText = "."
            }
        }
    }
}
/**
 * Creates a grid of letter boxes for the game.
 *
 * This function generates a row of boxes for the given word (`requestedWord`)
 * by cloning a template `box` element. It then duplicates the row multiple
 * times to create several lines for multiple attempts.
 *
 * @function createBox
 * @param {string} requestedWord - The word that determines the number of boxes per line.
 * @param {HTMLElement} boxes - The container element where the boxes for the first line will be appended.
 * @param {HTMLElement} box - The template box element to clone for each letter.
 * @returns {void} Modifies the DOM directly by appending cloned box elements.
 */

export default function createBox(requestedWord, boxes, box) {

    let i = 0
    while (i < requestedWord.length) {
        boxes.appendChild(box.cloneNode(true))
        i++
    }

    const lign2 = boxes.insertAdjacentElement('afterend', boxes.cloneNode(true))
    const lign3 = boxes.insertAdjacentElement('afterend', lign2.cloneNode(true))
    const lign4 = boxes.insertAdjacentElement('afterend', lign3.cloneNode(true))
    const lign5 = boxes.insertAdjacentElement('afterend', lign4.cloneNode(true))
    const lign6 = boxes.insertAdjacentElement('afterend', lign5.cloneNode(true))


}
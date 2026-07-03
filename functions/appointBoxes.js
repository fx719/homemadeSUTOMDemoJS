/**
 * Assigns unique IDs to a set of rows and their child boxes.
 *
 * This function iterates over each row in the given array (`lignsOfBoxes`)
 * and assigns an `id` in the format `lign{rowIndex}` to the row element.
 * It also assigns IDs to each child box of the row in the format
 * `lign{rowIndex}-{boxIndex}`.
 *
 * Example:
 *   Row 0 → id="lign0"
 *   First child of row 0 → id="lign0-0"
 *
 * @function appointBoxes
 * @param {HTMLElement[]} lignsOfBoxes - An array of row elements containing child box elements.
 * @returns {void} Modifies the DOM elements in place, does not return a value.
 */



export default function appointBoxes(lignsOfBoxes) {
    for (let lignNumber = 0; lignNumber < lignsOfBoxes.length; lignNumber++) {
        lignsOfBoxes[lignNumber].setAttribute('id', `lign${lignNumber}`)
        for (let boxNumber = 0; boxNumber < lignsOfBoxes[lignNumber].children.length; boxNumber++) {
            lignsOfBoxes[lignNumber].children[boxNumber].setAttribute(
                'id',
                `lign${lignNumber}-${boxNumber}`
            )
        }
    }
}
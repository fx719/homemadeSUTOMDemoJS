/**
 * 
 * @param {HTMLDivElement} bodyContainer 
 * @param {String} flashMessage 
 * @param {boolean} positiveMessage 
 * @param {number} delayMs 
 */
export default function flashMessage(bodyContainer, flashMessage, positiveMessage, delayMs) {
    const flashDiv = document.createElement("div")
    flashDiv.innerHTML = flashMessage
    if (positiveMessage) { flashDiv.classList.add("flashGoodMessage") } else {
        flashDiv.classList.add("flashMessage")
    }
    bodyContainer.insertAdjacentElement('afterbegin', flashDiv)
    setTimeout(() => {
        flashDiv.remove()
    }, delayMs)
}
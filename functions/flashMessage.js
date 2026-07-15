/**
 * 
 * @param {HTMLDivElement} bodyContainer 
 * @param {String} flashMessage 
 * @param {boolean} isPositiveMessage 
 * @param {number} delayMs 
 */
export default function flashMessage(bodyContainer, flashMessage, isPositiveMessage, delayMs) {
    const flashDiv = document.createElement("div")
    flashDiv.innerHTML = flashMessage
    if (isPositiveMessage) { flashDiv.classList.add("flashGoodMessage") } else {
        flashDiv.classList.add("flashMessage")
    }
    bodyContainer.insertAdjacentElement('afterbegin', flashDiv)
    setTimeout(() => {
        flashDiv.remove()
    }, delayMs)
}
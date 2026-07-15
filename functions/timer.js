import flashMessagesLibrary from "../data/flashMessages.js"
import flashMessage from "./flashMessage.js"




const stopGame = (virtualKeyboardEnterButton, virtualKeyboardEraseButton, virtualKeyboardDiv, clock, enterKeyPressedHandler, physicalKeyLetterHandler, contentContainer) => {
    virtualKeyboardEnterButton.remove()
    virtualKeyboardEraseButton.remove()
    virtualKeyboardDiv.remove()
    clock.remove()
    document.body.removeEventListener('keydown', enterKeyPressedHandler)
    document.body.removeEventListener('keydown', physicalKeyLetterHandler)
    flashMessage(contentContainer, flashMessagesLibrary.timeIsUp, false, 5000)
}




export const decrementTimer = (startTimerButton, minutesDisplayed, secondsDisplayed, boxes, virtualKeyboardEnterButton, virtualKeyboardEraseButton, virtualKeyboardDiv, clock, enterKeyPressedHandler, physicalKeyLetterHandler, contentContainer) => {

    startTimerButton.addEventListener("click", () => {
        minutesDisplayed.innerHTML = 4
        secondsDisplayed.innerHTML = 59



        for (let box of boxes) {
            box.removeAttribute("disabled")
        }
        const timerDecrement = setInterval(() => {

            startTimerButton.remove()
            secondsDisplayed.innerHTML--
            if (minutesDisplayed.innerHTML < 0 || secondsDisplayed.innerHTML < 0 || minutesDisplayed.innerHTML > 10) {
                clearInterval(timerDecrement)
                stopGame(virtualKeyboardEnterButton, virtualKeyboardEraseButton, virtualKeyboardDiv, clock, enterKeyPressedHandler, physicalKeyLetterHandler, contentContainer)
            }
            if (secondsDisplayed.innerHTML < 1) {
                if (minutesDisplayed.innerHTML < 1) {
                    clearInterval(timerDecrement)
                    stopGame(virtualKeyboardEnterButton, virtualKeyboardEraseButton, virtualKeyboardDiv, clock, enterKeyPressedHandler, physicalKeyLetterHandler, contentContainer)
                }
                secondsDisplayed.innerHTML = 59
                minutesDisplayed.innerHTML--
            }


        }, 1000)


    },
        { once: true }

    )
}








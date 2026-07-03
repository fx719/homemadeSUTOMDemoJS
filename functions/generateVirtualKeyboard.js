export default function generateVirtualKeyboard(virtualKeyboardLettersArray, virtualKeyboard) {
    for (let i = 0; i < virtualKeyboardLettersArray.length; i++) {
        const virtualKeyboardLetter = document.createElement('div')
        virtualKeyboardLetter.classList.add('keyboardLetter')
        virtualKeyboardLetter.innerText = virtualKeyboardLettersArray[i]
        virtualKeyboard.appendChild(virtualKeyboardLetter)
    }
}
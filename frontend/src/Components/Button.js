import './Button.css'

const ButtonSize = Object.freeze({
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
})

/**
 * A basic button component.
 *
 * @param {string} text The text to show on the button.
 * @param {function} onClick The function to call when the button is clicked.
 * @param {boolean} [isDelete=false] Whether the button should be styled as a delete
 * button.
 * @param {ButtonSize} [size=ButtonSize.MEDIUM] The size of the button to render.
 */
function Button({text, onClick, isDelete = false, size=ButtonSize.SMALL, disabled=false}) {
    var className = `button ${size} ${isDelete ? 'delete' : ''}`
    return <button className={className} onClick={onClick} disabled={disabled}>{text}</button>
}

export default Button
export {ButtonSize}
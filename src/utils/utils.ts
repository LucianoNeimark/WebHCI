export const isAlphaNumeric = (expression : string) => {
    return /^[a-zA-Z0-9_ ]*$/.test(expression)
}
export const isValidLength = (expression : string) => {
    return expression.length <= 60
}

export const isColor = (expression : string) => {
    return /^[0-9A-F]{6}$/i.test(expression)
}

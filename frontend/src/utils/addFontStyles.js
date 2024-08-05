export const addFontStyles = (fontStyles) => {

    const handledFontStyles = []

    if (fontStyles.includes('underline') && fontStyles.includes('linethrough')) {

        const arr = fontStyles.filter(item => item !== 'underline' && item !== 'linethrough')

        arr.forEach(item => handledFontStyles.push(item))

        handledFontStyles.push('linethrough-underline')

    } else {
        fontStyles.forEach(item => {
            handledFontStyles.push(item)
        })
    }

    return handledFontStyles.join(' ')
}
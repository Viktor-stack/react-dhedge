export const strUtils = (str: string, config?: any): string => {
    let strArr = str.split(/(['A-Z'][a-z]*)/g)
    for (let i = 0; i < strArr.length; i++) {
        if (config !== undefined && str === config[str]) {
            if (strArr[i] === 'Dto') {
                let idx = strArr.indexOf("Dto")
                if (idx !== -1) {
                    strArr.splice(idx, 1);
                }
            }

        }

        if (i === 0) {
            strArr[i] = ucFirst(strArr[i])
        } else {
            strArr[i] = ucLast(strArr[i])
        }
    }

    function ucFirst(str: string) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    function ucLast(str: string) {
        if (!str) return str
        return str[0].toLowerCase() + str.slice(1)
    }

    return strArr.join(' ')
}

export function timeConverter(UNIX_timestamp: string): string {
    let data = new Date(UNIX_timestamp)

    return data.toLocaleString()
}

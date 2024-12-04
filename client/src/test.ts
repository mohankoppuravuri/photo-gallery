const mul = (num1) => {
    const secondFunction =  (num2) => {
        const thridFunction = (num3) => {
            return num1 * num2 * num3
        }
        return  thridFunction
    }

    return secondFunction
}

console.debug(mul(2)(3)(5))
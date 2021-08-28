function eval() {
    // Do not use eval!!!
    return
}

function expressionCalculator(expr) {
    let array = expr.replace(/\s/g, '').split('')
    let stack = []
    let actions = {}
    let deep = 0
    let isBefore = true

    for (let i = 0; i < array.length; i++) {
        if (array[i - 1] === '/' && array[i] === '0') throw 'TypeError: Division by zero.'

        switch (array[i]) {
            case '(':
                deep++
                stack.push(array[i])
                isBefore = true
                break
            case ')':
                if (stack.length === 0) throw new Error('ExpressionError: Brackets must be paired')
                deep--
                stack.pop()
                isBefore = false
                break
            default:
                actions[deep] = (actions[deep] !== undefined)
                    ? (isBefore)
                        ? [actions[deep][0] += array[i], actions[deep][1]]
                        : [actions[deep][0], actions[deep][1] += array[i]]
                    : (isBefore)
                        ? [array[i], '']
                        : ['', array[i]]
                break
        }
    }

    if (stack.length > 0) throw 'ExpressionError: Brackets must be paired'

    let res = 0

    for (let i = Object.keys(actions).length - 1; i > -1; i--) {
        if (i === Object.keys(actions).length - 1) {
            res = new Function(`return ${actions[i][0]}`)()
        } else {
            res = new Function(`return ${actions[i][0]}${res}${actions[i][1]}`)()
        }
    }

    return res
}

module.exports = {
    expressionCalculator
}
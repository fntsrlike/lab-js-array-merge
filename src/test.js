
function GenerateRandomNumbers(length, max) {
    return [...new Array(length)].map((_, i) => Math.round(Math.random() * max))
}

let a = GenerateRandomNumbers(10, 1000)
console.log(a)
const leftPad = require('left-pad')
const algorithms = require('./algorithms')

function Main() {
  const unit = 20000
  let nodes = GenerateArrays(unit)
  let elementsNumber = GetTotalLength(nodes)
  let sample = GenerateSample(nodes, 20)
  let results = Evaluate(sample, elementsNumber)
  Output(results)
}

function Evaluate(sample, elementsNumber) {
  let mergedResults = {}
  let efficacyResults = {}

  for (let [name, execution] of Object.entries(algorithms)) {
    let begin = process.hrtime()
    let result = execution(sample, elementsNumber, 128)
    efficacyResults[name] = process.hrtime(begin)
    mergedResults[name] = result
  }

  Assertion(mergedResults)

  return efficacyResults
}

function Assertion(results) {
  let isFirst = true
  let comparison, previousResult, currentResult
  let message = '\'s result is different from previous one!'

  for (let [name, result] of Object.entries(results)) {
    if (isFirst) {
      currentResult = result
      isFirst = false
      continue
    }

    previousResult = currentResult
    currentResult = result
    comparison = CompareIntegerArray(previousResult, currentResult)

    console.assert(comparison, name + message)
  }
  console.log('Assert successfully!\n')
}

function Output(results) {
  for (let [algorithmName, time] of Object.entries(results)) {
    let seconds = leftPad(time[0], 3)
    let millionSeconds = leftPad((time[1]/1000000).toFixed(4), 11)
    console.log(seconds + 's ' + millionSeconds  + " ms in " + algorithmName)
  }
}

/**
 * @return {boolean}
 */
function CompareIntegerArray(array1, array2) {
  if (array1.length !== array2.length) return false

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false
  }
  return true
}

function GenerateArrays(unit) {
  const maxNumber = Number.MAX_VALUE
  let arrays = []

  arrays.push(GenerateRandomNumbers(unit, maxNumber))
  arrays.push(GenerateRandomNumbers(2 * unit, maxNumber))
  arrays.push(GenerateRandomNumbers(3 * unit, maxNumber))
  arrays.push(GenerateRandomNumbers(4 * unit, maxNumber))
  arrays.push(GenerateRandomNumbers(5 * unit, maxNumber))
  arrays.push(GenerateRandomNumbers(6 * unit, maxNumber))

  return arrays
}

function GenerateRandomNumbers(length, max) {
  return [...new Array(length)].map((_, i) => Math.round(Math.random() * max))
}

/**
 * @return {number}
 */
function GetTotalLength(nodes) {
  let length = 0
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    length += node.length
  }

  return length
}

function GenerateSample(nodes, len) {
  let sample = []
  for (let i = 0; i < len; i++) {
    let random = Math.floor(Math.random() * nodes.length)
    sample.push(nodes[random])
  }
  return sample
}

Main()
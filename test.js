const unit = 20000;
var n1 = new Array(unit).fill(128)
var n2 = new Array(2 * unit).fill(256)
var n3 = new Array(3 * unit).fill(512)
var n4 = new Array(4 * unit).fill(768)
var n5 = new Array(5 * unit).fill(1024)
var n6 = new Array(6 * unit).fill(1280)
const len = n1.length + n2.length + n3.length + n4.length + n5.length + n6.length

let combo = [n1, n2, n3, n4, n5, n6, n2, n3, n4, n2, n3, n4, n2, n3, n4, n2, n3, n4, n2, n3, n4, n2, n3, n4, n2, n3, n4, n2]
let results = []
let methods = {}
methods['locateA'] = LocateA
methods['locateB'] = LocateB
methods['pushA'] = PushA
methods['pushB'] = PushB
methods['pushC1'] = PushC1
methods['pushC2'] = PushC2
methods['pushC3'] = PushC3

for (let key in methods) {
  if (!methods.hasOwnProperty(key)) continue

  let method = methods[key]
  console.time(key)
  let result = method()
  console.timeEnd(key)

  results.push(result)
}

for (let i = 0; i < results.length; i++) {
  let isFirst = (i === 0)
  if (isFirst ) continue

  let previousResult = results[i-1]
  let currentResult = results[i]

	console.assert(CompareIntegerArray(previousResult, currentResult))
}


/**
 * @return {boolean}
 */
function CompareIntegerArray(array1, array2) {
  if (array1.length !== array2.length) return false

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i])
      return false
  }
  return true
}

function Method (callback) {
  for (let i = 0; i < combo.length; i++) {
    callback(combo[i])
  }
}

function LocateA () {
  var locateA = new Array(len).fill(128)
  var indexA = 0
  Method(function (node) {
    LoopReplace(locateA, node, indexA)
    indexA += node.length
  })

  return locateA

  function LoopReplace (all, sub, loc) {
    for (var i = 0; i < sub.length; i++) {
      all[loc + i] = sub[i]
    }
  }
}

function LocateB () {
  var locateB = new Array(len).fill(128)
  var indexB = 0
  Method(function (node) {
    SpliceReplace(locateB, node, indexB)
    indexB += node.length
  })

  return locateB

  function SpliceReplace (all, sub, loc) {
    var args = sub.slice()
    args.unshift(loc, sub.length)
    all.splice.apply(all, args);
  }
}

function PushA () {
  var pushA = []
  Method(function (node) {
    pushA.push.apply(pushA, node)
  })

  return pushA
}

function PushB () {
  var pushB = []
  Method(function (node) {
    Array.prototype.push.apply(pushB, node)
  })

  return pushB
}

function PushC1 () {
  var pushC1 = []
  pushC1 = [].concat.apply(pushC1, combo)

  return pushC1
}

function PushC2 () {
  var pushC2 = []
  Method(function (node) {
    pushC2 = pushC2.concat(node)
  })

  return pushC2
}

function PushC3 () {
  var tmp = []
  Method(function (node) {
    tmp.push(node)
  })
  var pushC3 = [].concat.apply([], tmp)

  return pushC3
}

// 預先規劃好元素總量長度的陣列，並填入預設值
//
let LocateWithLoopReplace = function (sample, size, defaultValue = 128) {
    let result = new Array(size).fill(defaultValue)
    let index = 0

    for (let node of sample) {
        LoopReplace(result, node, index)
        index += node.length
    }

    return result

    function LoopReplace (all, sub, loc) {
        for (let i = 0; i < sub.length; i++) {
            all[loc + i] = sub[i]
        }
    }
}

let LocateWithSpliceApply = function (sample, size, defaultValue = 128) {
    let result = new Array(size).fill(defaultValue)
    let index = 0

    for (let node of sample) {
        SpliceReplace(result, node, index)
        index += node.length
    }

    return result

    function SpliceReplace (all, sub, loc) {
        let args = sub.slice()
        args.unshift(loc, sub.length)
        all.splice.apply(all, args);
    }
}

let PushWithApply = function (sample) {
    var result = []

    for (let node of sample) {
        result.push.apply(result, node)
    }

    return result
}

let PushWithPrototypeApply = function (sample) {
    var result = []

    for (let node of sample) {
        Array.prototype.push.apply(result, node)
    }

    return result
}

function Concat (sample) {
    var result = []

    for (let node of sample) {
        result = result.concat(node)
    }

    return result
}

let ConcatPrototypeApply = function(sample) {
    return [].concat.apply([], sample) // as Array.prototype.concat.apply
}

export {
    LocateWithLoopReplace,
    LocateWithSpliceApply,
    PushWithApply,
    PushWithPrototypeApply,
    Concat,
    ConcatPrototypeApply
}
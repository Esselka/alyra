const crypto = require('crypto')

const calc_hash = function(input) {
  h = crypto.createHash('sha256').update(input).digest('hex')
  return h.substring(0, 15) //Result are easier to read. Don't use it on real code.
}


class MerkleTree {
  constructor(input) {
    this.input = input
    this.tree = {}
    this.depth = this.merkleDepth()

    // create empty datastructure for the Merkle Tree
    for(var i=0; i<this.depth; i++) {
      this.tree[i] = []
    }

    // create the first line of the tree using the inputs
    for(var entry in input) {
      var entryHash = calc_hash(input[entry])
      this.tree[0].push(entryHash)
    }

    // create all following line until the final hash
    var depth = 0
    while(this.tree[depth].length > 1) {
      var lastHash = ''
      for(var i=0; i<this.tree[depth].length; i++) {
        if(i == this.tree[depth].length-1 && i % 2 == 0) {
          var newHash = calc_hash(this.tree[depth][i])
          this.tree[depth+1].push(newHash)
        } else if (i%2 == 0) {
          lastHash = this.tree[depth][i]
        } else {
          var newStr = Buffer.from(lastHash, 'hex') + Buffer.from(this.tree[depth][i], 'hex')
          var newHash = calc_hash(newStr)
          this.tree[depth+1].push(newHash)
        }
      }
      depth += 1
    }
  }

  merkleDepth() {
    var inputSize = Object.keys(this.input).length
    for(var n=0; Math.pow(2,n) < inputSize; n++) {}
    return n+1
  }

  getMerkleHead() {
    return this.tree[this.depth-1]
  }

  isInTree(key) {
    // check that hash of entry is in tree
    var hashKey = calc_hash(key)
    var index = this.tree[0].indexOf(hashKey)
    if(index == -1) {
      console.log('entry has no corresponding hash in tree')
      console.log('calculated: ' + hashKey)
      return false
    }

    // check consistency by navigating to head of tree
    for(var depth = 0; depth < this.depth-1; depth++) {
      var indexParent = Math.floor(index/2)

      var hashCurrent = this.tree[depth][index]

      if(index == this.tree[depth].length-1 && index%2 == 0) {
        var strParent = hashCurrent
        var hashParentCalc = calc_hash(strParent)
        console.log(hashCurrent + ' => ' + hashParentCalc)
      } else {
        if(index%2 == 0) {
          var hashNext = this.tree[depth][index+1]
          var strParent = Buffer.from(hashCurrent, 'hex') + Buffer.from(hashNext, 'hex')
        } else {
          var hashNext = this.tree[depth][index-1]
          var strParent = Buffer.from(hashNext, 'hex') + Buffer.from(hashCurrent, 'hex')
        }
        var hashParentCalc = calc_hash(strParent)
        console.log(hashCurrent + ' + ' + hashNext + ' => ' + hashParentCalc)
      }
      var hashParentRead = this.tree[depth+1][indexParent]

      if(hashParentCalc != hashParentRead) {
        console.log('calculated hash does not match tree; ' + hashCurrent +
                    ' + ' + hashNext + ' != ' + hashParentRead)
        return false
      }
      index = indexParent
    }
    return true
  }

}


inputData = {}
inputData.A = 'mouton'
inputData.B = 'chat'
inputData.C = 'agneau'
inputData.D = 'vache'
inputData.E = 'elephant'
inputData.X = 'test'

var merkleTree = new MerkleTree(inputData)

console.log('Merkle Tree:')
console.log(merkleTree.tree)

console.log('\nHead of the tree:')
console.log(merkleTree.getMerkleHead())

//Alteration test
merkleTree.tree[1][0] = ''
console.log(merkleTree.tree)


var strList = ['agneau', 'elephant', 'elefant']
for(var i in strList) {
  str = strList[i]
  console.log('\nChecking that the string is in the Merkle Tree: ' + str)
  console.log(merkleTree.isInTree(str))
}

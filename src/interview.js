/**
 * You have been hired by a shipping company to help streamline their manual packaging service. Employees are handling packaging for millions of internal and external products. Products are packaged within different-sized cardboard boxes, wooden shipping crates, or steel containers. These boxes can also be stored within other boxes: such as a cardboard box, in a wooden crate, in a steel container. Each box, however, can only be sealed with an appropriate lid (wood box with wood lid, etc.).  Because of the way clients have requested organization, it is possible to find ourselves with a large nesting of these boxes, sometimes with them only requesting one type of box.
You notice that as the nest of packages gets larger, it is impossible for regular employees to tell if it was packaged correctly. 

You decide to write a program that will read through the packaging records and determine if a product was validly packaged, and thus ready to be shipped.
The packaging record is represented in your system as a string ‘s’. These strings contain identifying symbols for the bottom and top of each box within the order: 
(c : C, w: W, s : S).
 Each box must be closed with a lid, with the same type of lid, and cannot be closed out of order.
Write a method to determine if the current record is valid and the boxes are ready to be shipped. 

Packing Record 1: 
Input: s = "cCwWsS"
Output: True 
Packing Record 2: 
Input: s = "cCcCcCcC" 
Output: True 
Packing Record 3: 
Input: s = "swcCWS" 
Output: True
Packing Record 4: 
Input: s = "wS"
Output: False
Note:
S will be between 1 to 10000 characters long and only contain the packaging characters outlined above.
 * 
 */


/**
 * Rules:
 * Once hitting a lid, it must be closed with the complement of the most recently open
 * 
 * Steps:
 * Store the types of boxes => hashMap
 * Store bottom containers in a stack
 * Once we hit a top...
 * ...if the most recent bottom is not the correct, return false
 * ...keep moving
 * 
 */

const packBoxes = (boxes) => {
  if (!boxes.length) return false

  //add type of boxes to hash
  const hash = {
    "W": "w",
    "S": "s",
    "C": "c",
    "A": "a"
  }

  //store the bottom in a stack
  const stack = []

  for (let piece of boxes) {
    //check if closed on open
    if (piece in hash) {
      const mostRecentBottom = stack.pop()
      if (hash[piece] !== mostRecentBottom) return [false, `Error - Order Mismatch: Cannot close box type ${piece} with type ${mostRecentBottom}`]
    } else {
      stack.push(piece)
    }
  }

  return [stack.length === 0, ""]
}

const packWithFeedback = (boxes) => {
  //store count and errors
  const countHash = {}
  const errors = []


  //count the occurrences
  for (let piece of boxes) {
    countHash[piece] = 1 + (countHash[piece] || 0)
  }

  for (key in countHash) {
    const lower = key.toLowerCase()
    const upper = key.toUpperCase()

    //adding count errors
    if (countHash[lower] !== countHash[upper]) {
      errors.push(`Error - Count Mismatch: ${lower}'s count of: ${countHash[lower] || 0} does not equal ${upper}'s count of ${countHash[upper] || 0}`)
    }

  }

  const [isComplete, error] = packBoxes(boxes)

  if (!isComplete && error.length > 0) {
    errors.push(error)
  }

  return errors.length ? errors : true
}

// console.log(packBoxes("cCwWsS"))
// console.log(packBoxes("cCcCcCcC"))
// console.log(packBoxes("wS"))
// console.log(packBoxes("wsS"))
// console.log(packBoxes("wwwwwwwww"))
// console.log(packBoxes("sSw"))
// console.log(packWithFeedback("cCwWsS"))
// console.log(packWithFeedback("cCcCcCcC"))
// console.log(packWithFeedback("wS"))
// console.log(packWithFeedback("wsS"))
// console.log(packWithFeedback("wwwwwwwww"))
// console.log(packWithFeedback("sSw"))
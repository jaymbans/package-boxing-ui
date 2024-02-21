import React, { useState } from 'react'
import CalculatorIcon from "../media/calculator-icon.png"
import PuzzleIcon from "../media/puzzle-icon.png"
import TruckIcon from "../media/truck-icon.png"

function PackageStatusCard() {
  //data
  const steps = [
    {
      icon: CalculatorIcon,
      iconName: "calculator",
      stepTitle: "Counting Package Pieces",
      error: false,
      success: false
    },
    {
      icon: PuzzleIcon,
      iconName: "puzzle",
      stepTitle: "Matching Package Pieces",
      error: false,
      success: false
    },
    {
      icon: TruckIcon,
      iconName: "truck",
      stepTitle: "Shipping Status",
      error: false,
      success: false
    },
  ]

  //state
  const [errors, setErrors] = useState([])
  const [countError, setCountError] = useState(false)
  const [orderError, setOrderError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [packageStr, setPackageStr] = useState("")

  //functions
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

  const submitRecord = (e) => {
    setErrors("")

    e.preventDefault()

    const boxes = packageStr
    console.log(boxes)

    //store count and errors
    const countHash = {}
    const errors = []


    //count the occurrences
    for (let piece of boxes) {
      countHash[piece] = 1 + (countHash[piece] || 0)
    }

    for (let key in countHash) {
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

    if (errors.length > 0) {
      setErrors(errors.sort((a, b) => a - b))
    } else {
      setSuccess(true)
    }

    return
  }

  const onChange = (e) => {
    setPackageStr(e.target.value)
    const cleaned = e.target.value
      .replace(/[^wsc]/gi, "")

    if (e.target.value.length !== cleaned.length) {
      setErrors(["Invalid package record: Please only include the following characters: w,W,s,S,c,C"])
    } else {
      setErrors([])
    }
  }

  return (
    <form onSubmit={submitRecord}>
      <h1>Package Status</h1>
      <input
        onChange={onChange}
        type="text" placeholder='Enter package record' />
      <div className="stepper-container">
        {
          steps.map((step, i) => {
            return (
              <div className="step">
                <div className="text">
                  <img alt={step.iconName} src={step.icon} />
                  <h5>{step.stepTitle}</h5>
                  {
                    step.error && <img
                      className='icon'
                      alt='error-icon'
                      src={require("../media/error-icon.png")}
                    />
                  }
                  {
                    step.success && <img
                      className='icon'
                      alt='success-icon'
                      src={require("../media/success-icon.png")} />
                  }
                </div>
                {
                  i < steps.length - 1 &&
                  <div className="divider"></div>
                }
              </div>
            )
          })
        }
      </div>
      {
        success && <h5 className='success'>Success! Your package record has been validated</h5>
      }
      {
        errors.length > 0 && (
          <>
            <h5 className='error'>There were errors with your package record</h5>
            <div className="error-container">
              {errors.map(err => <p><img alt="error icon"
                src={require("../media/error-icon.png")}
              />{err}</p>)}
            </div>
          </>
        )
      }
      <input disabled={errors.length > 0} className='submit-btn' type="submit" value="SUBMIT" />
    </form>
  )
}

export default PackageStatusCard
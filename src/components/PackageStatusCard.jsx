import React, { useState } from 'react'
import CalculatorIcon from "../media/calculator-icon.png"
import PuzzleIcon from "../media/puzzle-icon.png"
import TruckIcon from "../media/truck-icon.png"

function PackageStatusCard() {
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

  const [errors, setErrors] = useState([])
  const [countError, setCountError] = useState(false)
  const [orderError, setOrderError] = useState(false)
  const [success, setSuccess] = useState(false)

  return (
    <form>
      <h1>Package Status</h1>
      <input type="text" placeholder='Enter package record' />
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
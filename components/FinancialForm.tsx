'use client'

import { useState, useEffect } from 'react'
import { FormData, Question } from '@/types'
import { questions } from '@/lib/questions'
import { calculateFinancialScore } from '@/lib/scoreCalculator'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import CharacterAvatar from './CharacterAvatar'
import ResultScreen from './ResultScreen'

export default function FinancialForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    dob: '',
    gender: '',
    employmentType: '',
    companyName: '',
    monthlyIncome: '',
    houseType: '',
    familyMembers: [],
    twoWheelersCount: 0,
    twoWheelerNumbers: [],
    twoWheelerInsurance: { hasInsurance: false },
    fourWheelersCount: 0,
    fourWheelerNumbers: [],
    fourWheelerInsurance: { hasInsurance: false },
    healthInsurance: { hasInsurance: false },
    termInsurance: { hasInsurance: false },
    lifeInsurance: { hasInsurance: false },
    loans: {},
    creditCards: { hasCards: false },
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('financialFormData')
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    if (currentStep > 0 && !isSubmitted) {
      localStorage.setItem('financialFormData', JSON.stringify(formData))
    }
  }, [formData, currentStep, isSubmitted])

  const filteredQuestions = questions.filter(q => {
    if (!q.condition) return true
    return q.condition(formData)
  })

  const currentQuestion = filteredQuestions[currentStep]
  const progress = ((currentStep + 1) / filteredQuestions.length) * 100

  const handleNext = () => {
    if (currentStep < filteredQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Calculate financial score
    const score = calculateFinancialScore(formData)
    const finalData = { ...formData, financialScore: score }
    
    try {
      // Send data to Google Sheets
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
      
      if (scriptUrl) {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        })
        
        console.log('Data submitted to Google Sheets')
      }
      
      // Clear localStorage
      localStorage.removeItem('financialFormData')
      
      setFormData(finalData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting data:', error)
      alert('There was an error submitting your data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return <ResultScreen formData={formData} />
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <ProgressBar progress={progress} currentStep={currentStep + 1} totalSteps={filteredQuestions.length} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Character Avatar */}
        <div className="hidden lg:flex items-center justify-center">
          <CharacterAvatar formData={formData} />
        </div>
        
        {/* Question Card */}
        <div className="flex items-center justify-center">
          <QuestionCard
            question={currentQuestion}
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={currentStep === 0}
            isLast={currentStep === filteredQuestions.length - 1}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
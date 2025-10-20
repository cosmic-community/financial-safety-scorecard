import { FormData, Question } from '@/types'

interface QuestionCardProps {
  question: Question
  formData: FormData
  setFormData: (data: FormData) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  isLoading: boolean
}

export default function QuestionCard({
  question,
  formData,
  setFormData,
  onNext,
  onBack,
  isFirst,
  isLast,
  isLoading,
}: QuestionCardProps) {
  const getValue = (field: string): any => {
    const keys = field.split('.')
    let value: any = formData
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key as keyof typeof value]
      } else {
        return ''
      }
    }
    
    return value ?? ''
  }

  const setValue = (field: string, value: any) => {
    const keys = field.split('.')
    const newData = { ...formData }
    let current: any = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!key) continue
      if (!current[key]) {
        current[key] = {}
      }
      current = current[key]
    }
    
    const lastKey = keys[keys.length - 1]
    if (lastKey) {
      current[lastKey] = value
    }
    
    setFormData(newData)
  }

  const isValid = (): boolean => {
    const value = getValue(question.field)
    
    if (question.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0
    }
    
    if (question.type === 'radio' || question.type === 'dropdown') {
      return value !== '' && value !== undefined && value !== null
    }
    
    if (question.type === 'number') {
      return value !== '' && value !== undefined && !isNaN(Number(value))
    }
    
    return value !== '' && value !== undefined && value !== null
  }

  const renderInput = () => {
    const currentValue = getValue(question.field)

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            className="input-field"
            value={currentValue || ''}
            onChange={(e) => setValue(question.field, e.target.value)}
            placeholder="Enter your answer..."
          />
        )

      case 'number':
        return (
          <input
            type="tel"
            className="input-field"
            value={currentValue || ''}
            onChange={(e) => setValue(question.field, e.target.value)}
            placeholder="Enter number..."
          />
        )

      case 'date':
        return (
          <input
            type="date"
            className="input-field"
            value={currentValue || ''}
            onChange={(e) => setValue(question.field, e.target.value)}
          />
        )

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div
                key={option}
                className={`radio-option ${currentValue === option ? 'selected' : ''}`}
                onClick={() => setValue(question.field, option)}
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(currentValue) && currentValue.includes(option)}
                  onChange={(e) => {
                    const current = Array.isArray(currentValue) ? currentValue : []
                    if (e.target.checked) {
                      setValue(question.field, [...current, option])
                    } else {
                      setValue(question.field, current.filter((v: string) => v !== option))
                    }
                  }}
                  className="w-5 h-5 text-primary"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'dropdown':
        return (
          <select
            className="input-field"
            value={currentValue || ''}
            onChange={(e) => setValue(question.field, e.target.value)}
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      default:
        return null
    }
  }

  return (
    <div className="question-card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.title}</h2>
      
      <div className="mb-8">{renderInput()}</div>

      <div className="flex gap-4">
        {!isFirst && (
          <button
            onClick={onBack}
            className="btn-secondary flex-1"
            disabled={isLoading}
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          className="btn-primary flex-1"
          disabled={!isValid() || isLoading}
        >
          {isLoading ? 'Submitting...' : isLast ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}
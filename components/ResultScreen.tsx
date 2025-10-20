'use client'

import { FormData } from '@/types'

interface ResultScreenProps {
  formData: FormData
}

export default function ResultScreen({ formData }: ResultScreenProps) {
  const score = formData.financialScore || 0
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919965317160'
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getScoreMessage = (score: number) => {
    if (score >= 70) return 'Excellent! Your financial safety is strong. 🎉'
    if (score >= 50) return 'Good! You have a decent financial foundation. 👍'
    return 'Needs Improvement. Consider building your financial safety net. 💡'
  }

  const handleWhatsAppShare = () => {
    const message = `Financial Score Report for ${formData.name} is ${score}%25`
    const url = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center animate-fade-in">
        <div className="mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Thank You, {formData.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            Your Financial Safety Assessment is Complete
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
          <p className="text-gray-700 text-lg mb-4">Your Financial Safety Score</p>
          <div className={`text-7xl font-bold mb-4 ${getScoreColor(score)}`}>
            {score}%
          </div>
          <p className="text-xl font-semibold text-gray-700">
            {getScoreMessage(score)}
          </p>
        </div>

        <div className="space-y-4 mb-8 text-left bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">Score Breakdown:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Base Score:</span>
              <span className="font-semibold">50 points</span>
            </div>
            {formData.houseType === 'Own' && (
              <div className="flex justify-between text-green-600">
                <span>Own House:</span>
                <span className="font-semibold">+10 points</span>
              </div>
            )}
            {(formData.healthInsurance.hasInsurance || formData.termInsurance.hasInsurance || formData.lifeInsurance.hasInsurance) && (
              <div className="flex justify-between text-green-600">
                <span>Insurance Coverage:</span>
                <span className="font-semibold">+5 to +15 points</span>
              </div>
            )}
            {formData.monthlyIncome.includes('1L+') || formData.monthlyIncome.includes('50k–100k') && (
              <div className="flex justify-between text-green-600">
                <span>Income Level:</span>
                <span className="font-semibold">+10 points</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleWhatsAppShare}
          className="btn-primary w-full text-lg flex items-center justify-center gap-3"
        >
          <span className="text-2xl">💬</span>
          Share Results on WhatsApp
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Your data has been securely saved. We'll be in touch soon!
        </p>
      </div>
    </div>
  )
}
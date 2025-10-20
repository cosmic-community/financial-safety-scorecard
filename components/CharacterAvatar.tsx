import { FormData } from '@/types'

interface CharacterAvatarProps {
  formData: FormData
}

export default function CharacterAvatar({ formData }: CharacterAvatarProps) {
  const hasInsurance = formData.healthInsurance.hasInsurance || 
                       formData.termInsurance.hasInsurance || 
                       formData.lifeInsurance.hasInsurance
  
  const hasLoans = Object.values(formData.loans).some(loan => loan?.hasLoan)
  
  return (
    <div className="relative w-full max-w-md h-96 bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
      {/* Main Character */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-8xl animate-bounce-slow">
          {formData.gender === 'Male' ? '🧑' : formData.gender === 'Female' ? '👩' : '🧑'}
        </div>
      </div>

      {/* Family Members */}
      {formData.familyMembers.length > 0 && (
        <div className="absolute top-4 left-4 flex gap-2">
          {formData.familyMembers.map((member, index) => (
            <div key={index} className="text-2xl animate-fade-in">
              {member === 'Father' && '👨'}
              {member === 'Mother' && '👩'}
              {member === 'Spouse' && '💑'}
              {member === 'Kids' && '👶'}
            </div>
          ))}
        </div>
      )}

      {/* Employment Type */}
      {formData.employmentType && (
        <div className="absolute top-4 right-4 text-4xl animate-pulse-slow">
          {formData.employmentType === 'Salaried' ? '💼' : '🏢'}
        </div>
      )}

      {/* House Type */}
      {formData.houseType && (
        <div className="absolute bottom-4 left-4 text-4xl">
          {formData.houseType === 'Own' ? '🏠' : '🏘️'}
        </div>
      )}

      {/* Vehicles */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {formData.twoWheelersCount > 0 && (
          <div className="text-2xl animate-fade-in">
            🏍️ {formData.twoWheelersCount > 1 && `×${formData.twoWheelersCount}`}
          </div>
        )}
        {formData.fourWheelersCount > 0 && (
          <div className="text-2xl animate-fade-in">
            🚗 {formData.fourWheelersCount > 1 && `×${formData.fourWheelersCount}`}
          </div>
        )}
      </div>

      {/* Insurance Badge */}
      {hasInsurance && (
        <div className="absolute top-1/2 right-8 text-4xl animate-pulse-slow">
          🛡️
        </div>
      )}

      {/* Loan Warning */}
      {hasLoans && (
        <div className="absolute top-1/2 left-8 text-4xl animate-pulse-slow">
          ⚠️
        </div>
      )}
    </div>
  )
}
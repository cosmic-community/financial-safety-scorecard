interface ProgressBarProps {
  progress: number
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full bg-white rounded-full shadow-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">Progress</span>
        <span className="text-sm font-semibold text-primary">
          {currentStep} / {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
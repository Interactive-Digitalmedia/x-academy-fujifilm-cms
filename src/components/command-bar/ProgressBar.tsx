interface ProgressBarProps {
  currentStep: number
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className='flex justify-center gap-2'>
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1 w-[74px] rounded-full ${step <= currentStep ? 'bg-[#00A76F]' : 'bg-[#EDEDED]'}`}
        />
      ))}
    </div>
  )
}

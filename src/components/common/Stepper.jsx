/**
 * Stepper — komponen step navigator
 *
 * Props:
 *   steps       — Array of { label: string }
 *   currentStep — step aktif (1-based, default: 1)
 *   onStepChange — (step: number) => void
 *
 * Usage:
 *   <Stepper
 *     steps={[{label: 'Resume'}, {label: 'Email'}, {label: 'Salary'}]}
 *     currentStep={activeStep}
 *     onStepChange={setActiveStep}
 *   />
 */

export default function Stepper({ steps = [], currentStep = 1, onStepChange }) {
  return (
    <div className="stepper flex items-center justify-start gap-x-[var(--m)] overflow-x-auto pb-[var(--xxs)]"
      style={{ scrollbarWidth: 'thin' }}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-x-[var(--xxs)]">

          {/* Step Item */}
          <div className="flex items-center gap-x-[var(--xxs)]">
            <div
              onClick={() => onStepChange?.(index + 1)}
              className={`flex items-center justify-center min-w-[var(--xxxx)] min-h-[var(--xxxx)] max-w-[var(--xxxx)] max-h-[var(--xxxx)] rounded-full text-[length:var(--s)] font-medium cursor-pointer transition-colors
                ${currentStep === index + 1 ? 'bg-primary text-bg' : 'bg-link text-bg hover:bg-primary'}`}
            >
              {index + 1}
            </div>
            <div className="whitespace-nowrap font-medium">{step.label}</div>
          </div>

          {/* Divider */}
          {index < steps.length - 1 && (
            <div className="h-[1px] min-w-[111px] bg-primary" />
          )}

        </div>
      ))}
    </div>
  )
}

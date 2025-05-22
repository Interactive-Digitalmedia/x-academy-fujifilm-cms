const PlannerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
  >
    <path
      d='M1 8.312C1 3.93757 1.93757 3 6.312 3H13.688C18.0624 3 19 3.93757 19 8.312V13.688C19 18.0624 18.0624 19 13.688 19H6.312C1.93757 19 1 18.0624 1 13.688V8.312Z'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path d='M4 3V1' stroke='currentColor' stroke-linecap='round' strokeWidth='1.5' />
    <path d='M16 3V1' stroke='currentColor' stroke-linecap='round' strokeWidth='1.5' />
    <path d='M5 7H15' stroke='currentColor' stroke-linecap='round' strokeWidth='1.5' />
  </svg>
)

export default PlannerIcon

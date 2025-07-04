import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type T = {
  children: React.ReactNode //the trigger element
  text: string
}
export function TooltipComponent({ children, text }: T) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300} disableHoverableContent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
  <p className="bg-gradient-to-r from-gray-400 to-yellow-400 bg-clip-text text-transparent font-medium text-sm z-50">
    {text}
  </p>
</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

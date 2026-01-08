import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-ocean text-white hover:text-white hover:bg-ocean/90 hover:shadow-lg dark:bg-sky dark:text-ocean dark:hover:text-ocean dark:hover:bg-sky/90",
        cta: "relative overflow-hidden cta-shine bg-gradient-to-r from-ocean to-sky text-white hover:text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus-visible:ring-ocean dark:from-sky dark:to-ocean dark:text-white dark:hover:text-white",
        sky: "bg-sky bg-gradient-to-r from-sky to-sky/90 text-ocean hover:from-sky/90 hover:to-sky shadow-md hover:shadow-lg focus-visible:ring-sky",
        earth: "bg-earth bg-gradient-to-r from-earth to-earth/90 text-gray-900 hover:from-earth/90 hover:to-earth shadow-md hover:shadow-lg focus-visible:ring-earth",
        care: "bg-care bg-gradient-to-r from-care to-care/90 text-gray-900 hover:from-care/90 hover:to-care shadow-md hover:shadow-lg focus-visible:ring-care",
        leaf: "bg-leaf bg-gradient-to-r from-leaf to-leaf/90 text-ocean hover:from-leaf/90 hover:to-leaf shadow-md hover:shadow-lg focus-visible:ring-leaf",
        sun: "bg-sun bg-gradient-to-r from-sun to-sun/90 text-ocean hover:from-sun/90 hover:to-sun shadow-md hover:shadow-lg focus-visible:ring-sun",
        destructive:
          "bg-destructive text-white hover:text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { buttonVariants }
export default Button

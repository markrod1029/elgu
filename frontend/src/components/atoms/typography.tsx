import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "text-4xl font-bold tracking-tight",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      p: "leading-7",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      medium: "text-md font-medium",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: "normal",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, weight, as, ...props }, ref) => {
    const Comp = as || (variant === "p" ? "p" : "div")
    
    return (
      <Comp
        ref={ref as any}
        className={cn(typographyVariants({ variant, weight, className }))}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography }
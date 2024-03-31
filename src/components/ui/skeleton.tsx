import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[rgba(143,239,223,0.1)]", className)}
      {...props}
    />
  )
}

export { Skeleton }

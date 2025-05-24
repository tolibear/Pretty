import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  showText?: boolean
}

/**
 * Pretty Logo Component
 * 
 * Uses the official Pretty brand SVG from public/brand/pretty-logo.svg
 * This includes both the star icon and "Pretty" text in Gabarito font
 * 
 * @example
 * // Standard logo (default)
 * <Logo />
 * 
 * @example
 * // Custom size (maintains aspect ratio)
 * <Logo width={200} height={54} />
 * 
 * @example
 * // Icon only (no text)
 * <Logo showText={false} />
 * 
 * @example
 * // With custom styling
 * <Logo className="text-white" width={150} height={41} />
 */
export function Logo({ className, width = 125, height = 34, showText = true }: LogoProps) {
  if (!showText) {
    // Return just the icon when showText is false
    return <LogoIcon className={className} size={height} />
  }

  return (
    <div className={cn("flex items-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 251 68"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
      >
        <text 
          fontFamily="Gabarito-Regular_Bold, Gabarito" 
          fontSize="73.49" 
          fontWeight="bold" 
          letterSpacing="-2.524268" 
          fill="currentColor"
        >
          <tspan x="59.7950654" y="54">Pretty</tspan>
        </text>
        <path 
          d="M28.13653,0.4997 C30.52323,0.4997 31.82013,2.1599 32.24593,2.7692 C32.46859,3.08951 32.67952,3.45279 32.86702,3.8044 L33.3514,4.75362 L39.578,17.19462 L52.016,23.42122 C52.54334,23.68294 53.3676,24.08138 54.0043,24.52672 C54.57852,24.92516 56.0707,26.08922 56.2543,28.20252 L56.273831,28.63611 L56.2543,29.0697 C56.07071,31.183 54.5785,32.347 54.0043,32.7455 C53.36758,33.19081 52.5434,33.58925 52.016,33.851 L39.578,40.0737 L33.3514,52.5147 C33.08968,53.04204 32.69124,53.8663 32.2459,54.503 C31.82012,55.11237 30.5232,56.7725 28.1365,56.7725 C25.7498,56.7725 24.4529,55.1123 24.0271,54.503 C23.58179,53.86628 23.18335,53.0421 22.9216,52.5147 L16.6989,40.0737 L4.2539,33.851 C3.73046,33.58928 2.9062,33.19084 2.2695,32.7455 C1.66013,32.31972 -1.42108547e-14,31.0228 -1.42108547e-14,28.6361 C-1.42108547e-14,26.2494 1.6602,24.9525 2.2695,24.5267 C2.90622,24.08139 3.7304,23.68295 4.2539,23.4212 L16.6989,17.1946 L22.9216,4.7536 C23.18332,4.23016 23.58176,3.4059 24.0271,2.7692 C24.42554,2.19498 25.5896,0.7028 27.7029,0.5192 L28.13653,0.4997 Z" 
          fill="currentColor" 
          fillRule="nonzero"
        />
      </svg>
    </div>
  )
}

/**
 * Icon-only version for smaller spaces
 * 
 * @example
 * // Small icon
 * <LogoIcon size={16} />
 * 
 * @example
 * // With custom styling
 * <LogoIcon className="text-blue-500" size={32} />
 */
export function LogoIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 57 57"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <path
        d="M28.13653,0.4997 C30.52323,0.4997 31.82013,2.1599 32.24593,2.7692 C32.46859,3.08951 32.67952,3.45279 32.86702,3.8044 L33.3514,4.75362 L39.578,17.19462 L52.016,23.42122 C52.54334,23.68294 53.3676,24.08138 54.0043,24.52672 C54.57852,24.92516 56.0707,26.08922 56.2543,28.20252 L56.273831,28.63611 L56.2543,29.0697 C56.07071,31.183 54.5785,32.347 54.0043,32.7455 C53.36758,33.19081 52.5434,33.58925 52.016,33.851 L39.578,40.0737 L33.3514,52.5147 C33.08968,53.04204 32.69124,53.8663 32.2459,54.503 C31.82012,55.11237 30.5232,56.7725 28.1365,56.7725 C25.7498,56.7725 24.4529,55.1123 24.0271,54.503 C23.58179,53.86628 23.18335,53.0421 22.9216,52.5147 L16.6989,40.0737 L4.2539,33.851 C3.73046,33.58928 2.9062,33.19084 2.2695,32.7455 C1.66013,32.31972 -1.42108547e-14,31.0228 -1.42108547e-14,28.6361 C-1.42108547e-14,26.2494 1.6602,24.9525 2.2695,24.5267 C2.90622,24.08139 3.7304,23.68295 4.2539,23.4212 L16.6989,17.1946 L22.9216,4.7536 C23.18332,4.23016 23.58176,3.4059 24.0271,2.7692 C24.42554,2.19498 25.5896,0.7028 27.7029,0.5192 L28.13653,0.4997 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  )
} 
"use client"

import { useEffect, useRef, useState } from "react"

interface DexScreenerChartProps {
  pairAddress: string
}

export function DexScreenerChart({ pairAddress }: DexScreenerChartProps) {
  const container = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://widgets.dexscreener.com/main.js"
    script.async = true
    script.onerror = () => setError("Failed to load DexScreener widget")
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = `<div class="dexscreener-embed" data-embed="1" data-widget="chart" data-fullscreen="1" data-width="100%" data-height="100%" data-pair="${pairAddress}"></div>`
    }
  }, [pairAddress])

  if (error) {
    return <div className="h-[600px] flex items-center justify-center">{error}</div>
  }

  return <div ref={container} className="w-full h-[600px]" />
}


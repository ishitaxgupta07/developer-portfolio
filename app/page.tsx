"use client"

import dynamic from "next/dynamic"
import LoadingScreen from "@/components/loading-screen"

const CosmicPortfolio = dynamic(
  () => import("@/components/cosmic-portfolio"),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
)

export default function CosmicPortfolioClient() {
  return <CosmicPortfolio />
}


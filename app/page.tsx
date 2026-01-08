import dynamic from "next/dynamic"
import { Suspense } from "react"
import LoadingScreen from "@/components/loading-screen"

const CosmicPortfolio = dynamic(() => import("@/components/cosmic-portfolio"), {
  ssr: false,
  loading: () => <LoadingScreen />,
})

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CosmicPortfolio />
    </Suspense>
  )
}

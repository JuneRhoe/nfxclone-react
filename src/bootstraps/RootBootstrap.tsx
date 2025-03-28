import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import ModalBootstrap from '@/bootstraps/ModalBootstrap'

interface Props {
  rootContainer: HTMLElement
  children: React.ReactElement
}

export default function RootBootstrap({ rootContainer, children }: Props) {
  return (
    <ModalBootstrap rootContainer={rootContainer}>
      <>
        {children}
        <Analytics />
        <SpeedInsights />
      </>
    </ModalBootstrap>
  )
}

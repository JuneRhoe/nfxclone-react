import clsx, { ClassValue } from 'clsx'
import MediaSlider from './components/MediaSlider'

interface Props {
  className?: ClassValue[] | string
}

export default function MediaContainer({ className }: Props) {
  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <MediaSlider title="Title1" />
      <MediaSlider title="Title2" />
    </div>
  )
}

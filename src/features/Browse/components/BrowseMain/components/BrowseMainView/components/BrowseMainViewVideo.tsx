import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  faRotateRight,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useIntersection } from '@/submodule/hooks'
import { MainViewMediaInfo } from '@/features/Browse/hooks'
import IconButton from '@/submodule/components/IconButton/IconButton'

const INTERSECTION_MARGIN = '-200px'

export interface MainViewVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  mediaInfo: MainViewMediaInfo | null
  isVideoStarted: boolean
  isVideoEnded: boolean
  onVideoStarted: (started: boolean) => void
  onVideoEnded: (ended: boolean) => void
  onVideoVisible: (visible: boolean) => void
}

export default function BrowseMainViewVideo({
  videoRef,
  mediaInfo,
  isVideoStarted,
  isVideoEnded,
  onVideoStarted,
  onVideoEnded,
  onVideoVisible,
}: MainViewVideoProps) {
  const isVideoVisible = useIntersection(videoRef, INTERSECTION_MARGIN)

  const [isShowMute, setShowMute] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    onVideoVisible(isVideoVisible)
  }, [onVideoVisible, isVideoVisible])

  useEffect(() => {
    if (!isVideoStarted || isVideoEnded) {
      return
    }

    const timerId = setTimeout(() => setShowMute(true), 800)

    return () => clearTimeout(timerId)
  }, [isVideoStarted, isVideoEnded])

  useEffect(() => {
    if (!isVideoEnded) {
      return
    }

    setShowMute(false)
  }, [isVideoEnded])

  return (
    <>
      <video
        ref={videoRef}
        className={clsx(
          `w-full absolute z-1 top-[-1px] transition-opacity duration-500 opacity-0
          bg-[#171717] `,
          { 'opacity-100': isVideoStarted && !isVideoEnded },
        )}
        muted={isMuted}
        loop={false}
        onPlaying={() => {
          onVideoEnded(false)
          onVideoStarted(true)
        }}
        onEnded={() => onVideoEnded(true)}
      >
        {mediaInfo && <source src={mediaInfo.mediaPreview} type="video/mp4" />}
      </video>

      <div
        className="flex justify-end items-center text-white absolute z-3 bottom-[20%] right-[5%]
          transition-all duration-300"
      >
        {isShowMute && (
          <IconButton
            icon={isMuted ? faVolumeXmark : faVolumeHigh}
            buttonProps={{ onClick: () => setIsMuted(!isMuted) }}
          />
        )}
        {isVideoStarted && isVideoEnded && (
          <IconButton
            icon={faRotateRight}
            buttonProps={{ onClick: () => videoRef.current?.play() }}
          />
        )}
      </div>
    </>
  )
}

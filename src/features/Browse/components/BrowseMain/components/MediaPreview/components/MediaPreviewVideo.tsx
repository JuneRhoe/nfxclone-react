import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  faRotateRight,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useIntersection } from '@/submodule/hooks'
import IconButton from '@/submodule/components/IconButton/IconButton'
import { MediaInfo } from '@/mock/mock-data-definitions'

const INTERSECTION_MARGIN = '-200px'
const SHOW_MUTE_CONTROL_DELAY = 800

export interface MediaPreviewVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  mediaInfo: MediaInfo | null
  isSetAutoPlay: boolean
  isAutoPlayed: boolean
  isVideoCanPlay: boolean
  isVideoPlaying: boolean
  isVideoEnded: boolean
  onVideoCanPlay: (canPlay: boolean) => void
  onVideoPlaying: (playing: boolean) => void
  onVideoEnded: (ended: boolean) => void
  onVideoVisible: (visible: boolean) => void
}

export default function MediaPreviewVideo({
  videoRef,
  mediaInfo,
  isSetAutoPlay,
  isAutoPlayed,
  isVideoCanPlay,
  isVideoPlaying,
  isVideoEnded,
  onVideoCanPlay,
  onVideoPlaying,
  onVideoEnded,
  onVideoVisible,
}: MediaPreviewVideoProps) {
  const isVideoVisible = useIntersection(videoRef, INTERSECTION_MARGIN)

  const [isMuted, setIsMuted] = useState(true)
  const [showMuteControl, setShowMuteControl] = useState(false)

  useEffect(() => {
    onVideoVisible(isVideoVisible)
  }, [onVideoVisible, isVideoVisible])

  return (
    <>
      <video
        ref={videoRef}
        className={clsx(
          'absolute z-1 w-full bg-[#171717] opacity-0 transition-opacity duration-500',
          { 'opacity-100': isVideoCanPlay && isVideoPlaying && !isVideoEnded },
        )}
        muted={isMuted}
        loop={false}
        onCanPlay={() => onVideoCanPlay(true)}
        onPlaying={() => {
          onVideoEnded(false)
          onVideoPlaying(true)
          setTimeout(() => setShowMuteControl(true), SHOW_MUTE_CONTROL_DELAY)
        }}
        onEnded={() => {
          onVideoPlaying(false)
          onVideoEnded(true)
          setShowMuteControl(false)
        }}
      >
        {mediaInfo && (
          <source src={mediaInfo.previewTrailer} type="video/mp4" />
        )}
      </video>

      <div
        className="absolute right-[1.5rem] bottom-[20%] z-3 flex items-center justify-end
          text-white transition-all duration-300 sm:right-[2.5rem]"
      >
        {isVideoPlaying && showMuteControl && (
          <IconButton
            icon={isMuted ? faVolumeXmark : faVolumeHigh}
            buttonProps={{ onClick: () => setIsMuted(!isMuted) }}
          />
        )}
        {isVideoCanPlay &&
          !isVideoPlaying &&
          (isAutoPlayed || !isSetAutoPlay) && (
            <IconButton
              icon={faRotateRight}
              buttonProps={{ onClick: () => videoRef.current?.play() }}
            />
          )}
      </div>
    </>
  )
}

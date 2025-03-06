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
const SHOW_MUTE_CONTROL_DELAY = 800

export interface MainViewVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  mediaInfo: MainViewMediaInfo | null
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

export default function BrowseMainViewVideo({
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
}: MainViewVideoProps) {
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
          `w-full absolute z-1 top-[-1px] transition-opacity duration-500 opacity-0
          bg-[#171717] `,
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
        {mediaInfo && <source src={mediaInfo.mediaPreview} type="video/mp4" />}
      </video>

      <div
        className="flex justify-end items-center text-white absolute z-3 bottom-[20%] right-[5%]
          transition-all duration-300"
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

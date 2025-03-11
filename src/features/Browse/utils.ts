
const MAX_MEDIA_COUNT = 4

export function getMainPreviewMediaInfo() {
  // Temporary generate media info instead of getting from backend due to the mockapi limitation

  const randomIndex = Math.floor(Math.random() * MAX_MEDIA_COUNT)

  return {
    mediaIndex: randomIndex,
    mediaMainImg: `/images/browse-home/media-main-${randomIndex}.jpg`,
    mediaPreview: `/images/browse-home/media-preview-${randomIndex}.mp4`,
    mediaTitleImg: `/images/browse-home/media-title-${randomIndex}.png`
  }
}
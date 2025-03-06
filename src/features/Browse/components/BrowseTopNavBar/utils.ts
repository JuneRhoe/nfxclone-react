import { To } from "react-router"
import { browseAboutPath, browseMyListPath } from "@/routes"

export function getSubTitle(selectedPath: To): string {
  switch (selectedPath) {
    case browseMyListPath:
      return 'My List'
    case browseAboutPath:
      return 'About'
  }

  return ''
}
import { To } from "react-router"
import { PATH_BROWSE_ABOUT, PATH_BROWSE_MYLIST, PATH_BROWSE_SEARCH } from "@/route/routes"

export function getSubTitle(selectedPath: To): string {
  switch (selectedPath) {
    case PATH_BROWSE_MYLIST:
      return 'My List'
    case PATH_BROWSE_ABOUT:
      return 'About Netflix Clone'
    case PATH_BROWSE_SEARCH:
      return 'Search'
  }

  return ''
}
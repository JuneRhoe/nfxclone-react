import { MediaInfo } from "./mock-data-definitions"

export const MIN_LENGTH_USER_ID = 3
export const MIN_LENGTH_USER_PASSWORD = 5

export const MOCK_MEDIA_PREVIEWS: MediaInfo[] = [
  {
    "id": "3",
    "mediaId": "mediaId 3",
    "titleImg": "titleImg 3",
    "mainCategory": "2",
    "subCategory": "9",
    "mediaType": "mediaType 3",
    "madeAt": "2024-03-12T14:00:46.856Z",
    "title": "Squid Game",
    "casts": ["Lee Jung-jae", "Lee Byung-hun", "Yim Si-wan"],
    "genres": ["TV Dramas", "Korean", "TV Thrillers"],
    "impressions": ["Violent", "Suspenseful", "Thriller"],
    "ratingSymbol": "TV-MA",
    "ratingDetails": ["gore", "language", "smoking", "violence"],
    "description": "Itaque laudantium accusamus libero quae. Voluptas odit consequuntur quia architecto consectetur ut."    
  },
  {
    "mediaId": "mediaId 9",
    "titleImg": "titleImg 9",
    "mainCategory": "2",
    "subCategory": "9",
    "mediaType": "mediaType 9",
    "madeAt": "2024-09-29T15:34:08.352Z",
    "title": "The Defenders",
    "casts": ["Finn Jones", "Mike Colter", "Charlie Cox"],
    "genres": ["Action", "Drama", "Superhero"],
    "impressions": ["Violent"],
    "ratingSymbol": "TV-MA",
    "ratingDetails": ["violence", "language"],
    "description": "Odio corrupti doloribus. Corporis alias porro maiores ducimus molestiae dicta.",
    "id": "9"
  },
  {
    "mediaId": "mediaId 20",
    "titleImg": "titleImg 20",
    "mainCategory": "7",
    "subCategory": "8",
    "mediaType": "mediaType 20",
    "madeAt": "2025-03-05T01:39:19.527Z",
    "title": "Black Mirror",
    "casts": ["Awkwafina", "Peter Capaldi", "Asim Chaudhry"],
    "genres": ["TV Dramas", "British", "Sci-Fi TV"],
    "impressions": ["Mind-Bending", "Ominous"],
    "ratingSymbol": "TV-MA",
    "ratingDetails": ["language", "nudity", "sex", "smoking"],
    "description": "Illo tempore odit. Dignissimos mollitia ut quae sint sit.",
    "id": "20"
  },
  {
    "mediaId": "mediaId 36",
    "titleImg": "titleImg 36",
    "mainCategory": "9",
    "subCategory": "7",
    "mediaType": "mediaType 36",
    "madeAt": "2024-12-05T07:05:56.224Z",
    "title": "Van Helsing",
    "casts": ["Kelly Overton", "Jonathan Scarfe"],
    "genres": ["TV Dramas", "Canadian", "TV Action"],
    "impressions": ["Violent", "Dark", "Exciting"],
    "ratingSymbol": "TV-MA",
    "ratingDetails": ["gore", "language", "nudity", "smoking"],
    "description": "Repellendus libero earum illo libero. Excepturi et laborum quia in distinctio aliquid. Nemo quo reiciendis fuga temporibus distinctio. Sapiente nemo ipsam totam maxime modi. At quas dolor inventore illo voluptates voluptatum.",
    "id": "36"
  }
]

export const MOCK_MAP_MAIN_CATEGORIES = new Map([
  ['6', 'Exciting Movies'],
  ['2', 'Action'],
  ['7', 'Mind Games'],
  ['5', 'Thrillers & Mysteries'],  
  ['4', 'Scary Movies'],
  ['1', 'Suspenseful Movies'],
  ['3', 'Blockbuster Movies'],  
  ['8', 'Adventure Movies'],
  ['9', 'Dark Movies'],
])

export const MOCK_MEDIAS: MediaInfo[] = [
  { id: '1', title: '1' }, 
  { id: '2', title: '2' }, 
  { id: '3', title: '3' }, 
  { id: '4', title: '4' }, 
  { id: '5', title: '5' }, 
  { id: '6', title: '6' }, 
  { id: '7', title: '7' }, 
  { id: '8', title: '8' }, 
  { id: '9', title: '9' }, 
  { id: '10', title: '10' }, 
  { id: '11', title: '11' }, 
]

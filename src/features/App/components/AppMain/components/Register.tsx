import { ThemeInfoContext } from '@/features/App/context'
import { useContext, useEffect } from 'react'

export default function SignUp() {
  const { setThemeType } = useContext(ThemeInfoContext)

  useEffect(() => {
    setThemeType('lightMode')

    return () => setThemeType('darkMode')
  }, [setThemeType])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white text-[#737373]">
      Register
    </div>
  )
}

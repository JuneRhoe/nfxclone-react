import { registerPath } from '@/routes'
import { useNavigate } from 'react-router'

export default function SignUp() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black text-white opacity-50">
      Sign Up ===
      <button
        onClick={() => {
          navigate(registerPath)
        }}
      >
        Get Started
      </button>
    </div>
  )
}

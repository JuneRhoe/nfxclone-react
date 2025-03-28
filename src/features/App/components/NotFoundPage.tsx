import { PATH_ROOT } from '@/route/routes'
import bgNotFound from '@/assets/images/home/bg-notFound.jpg'
import nfxcloneLogo from '@/assets/images/logo.png'
import Image from '@/submodule/components/Image/Image'
import LinkButton from '@/submodule/components/LinkButton/LinkButton'
import Button from '@/submodule/components/Button/Button'
import { useNavigate } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="relative flex h-[100vh] w-full items-center justify-center text-white">
      <div
        className={'absolute z-0 h-full w-full bg-cover bg-center opacity-100'}
        style={{ backgroundImage: `url(${bgNotFound})` }}
      />
      <div className="absolute top-0 left-0 z-1 flex h-[4rem] w-full items-center bg-black px-6">
        <LinkButton className="h-[60%]" to={PATH_ROOT}>
          <Image src={nfxcloneLogo} />
        </LinkButton>
      </div>
      <div className="relative z-2 flex flex-col items-center gap-6 text-4xl font-extrabold">
        <div>Lost your Way?</div>
        <Button
          type="solid"
          buttonProps={{ onClick: () => navigate(PATH_ROOT) }}
        >
          Netflix Clone Home
        </Button>
      </div>
    </div>
  )
}

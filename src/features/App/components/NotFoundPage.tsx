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
    <div className="relative flex w-full h-[100vh] items-center justify-center text-white">
      <div
        className={'absolute z-0 w-full h-full bg-cover bg-center opacity-100'}
        style={{ backgroundImage: `url(${bgNotFound})` }}
      />
      <div className="absolute z-1 left-0 top-0 flex items-center w-full h-[4rem] px-6 bg-black">
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

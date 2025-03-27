import MyInfo from '@/features/MyInfo/MyInfo'

export default function BrowseAbout() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start py-4">
      <div className="relative w-full px-3 md:px-8">
        <div className="flex flex-col gap-1">
          <MyInfo />

          <div className="pt-10 text-lg font-extrabold md:text-2xl">
            Technologies used to build Netflix Clone
          </div>
          <div>
            <div className="pt-4 pb-1 text-base md:text-xl">Frontend</div>
            <div className="flex flex-col text-gray-400">
              <div>React • Typescript</div>
              <div>React Router</div>
              <div>Tanstack (React Query)</div>
              <div>Redux Toolkit</div>
              <div>React Modal</div>
              <div>React Hook Form</div>
              <div>React Responsive</div>
              <div>Tailwind CSS</div>
              <div>Vite</div>
            </div>
          </div>
          <div>
            <div className="pt-4 pb-1 text-base md:text-xl">Backend</div>
            <div className="flex flex-col text-gray-400">
              <div>Mockapi.io</div>
            </div>
          </div>
          <div>
            <div className="pt-4 pb-1 text-base md:text-xl">Deployment</div>
            <div className="flex flex-col text-gray-400">
              <div>Vercel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

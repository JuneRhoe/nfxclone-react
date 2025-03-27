import clsx from 'clsx'
import { useMatch } from 'react-router'
import TabButton, {
  TabButtonProps,
} from '@/submodule/components/TabButton/TabButton'

interface Props extends Omit<TabButtonProps, 'children'> {
  children: React.ReactNode
}

export default function NavTapRegularButton(props: Props) {
  const isActive = useMatch(props.to.toString())

  return (
    <TabButton
      className={clsx('transition-opacity duration-300', {
        'font-extrabold': isActive,
        'font-normal': !isActive,
        'hover:opacity-50': !isActive,
      })}
      {...props}
      navLinkProps={{ end: true }}
    >
      {(isActive) => {
        return (
          <>
            {props.children}
            <div
              className={clsx(
                'mt-0.5 border-b-2 border-b-white transition-opacity duration-300',
                {
                  'opacity-100': isActive,
                  'opacity-0': !isActive,
                },
              )}
            />
          </>
        )
      }}
    </TabButton>
  )
}

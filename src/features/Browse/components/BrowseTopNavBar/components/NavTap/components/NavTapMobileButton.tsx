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
      {...props}
      className={clsx(
        'flex h-[2.5rem] items-center justify-center text-xs hover:bg-gray-900',
        {
          'font-extrabold': isActive,
          'font-normal': !isActive,
          'text-gray-400': !isActive,
        },
      )}
      navLinkProps={{ end: true }}
    >
      {props.children}
    </TabButton>
  )
}

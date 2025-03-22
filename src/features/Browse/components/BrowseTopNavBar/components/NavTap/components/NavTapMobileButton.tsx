import TabButton, {
  TabButtonProps,
} from '@/submodule/components/TabButton/TabButton'
import clsx from 'clsx'

interface Props extends Omit<TabButtonProps, 'children'> {
  children: React.ReactNode
}

export default function NavTapRegularButton(props: Props) {
  return (
    <TabButton {...props} navLinkProps={{ end: true }}>
      {(isActive) => (
        <div
          className={clsx(
            'flex justify-center items-center h-[2.5rem] text-xs hover:bg-gray-900',
            {
              'font-extrabold': isActive,
              'font-normal': !isActive,
              'text-gray-400': !isActive,
            },
          )}
        >
          {props.children}
        </div>
      )}
    </TabButton>
  )
}

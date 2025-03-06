import TabButton, {
  TabButtonProps,
} from '@/submodule/components/TabButton/TabButton'
import clsx from 'clsx'

interface Props extends Omit<TabButtonProps, 'children'> {
  children: React.ReactNode
}

export default function BrowseTopNavTapButton(props: Props) {
  return (
    <TabButton
      className={props.className}
      {...props}
      navLinkProps={{ end: true }}
    >
      {(isActive) => (
        <div
          className={clsx('transition-opacity duration-300', {
            'font-extrabold': isActive,
            'font-normal': !isActive,
            'hover:opacity-50': !isActive,
          })}
        >
          {props.children}
          <div
            className={clsx(
              'transition-opacity duration-300 border-b-2 border-b-white mt-0.5',
              {
                'opacity-100': isActive,
                'opacity-0': !isActive,
              },
            )}
          />
        </div>
      )}
    </TabButton>
  )
}

import { Icon } from '@iconify/react'
import { ActionIcon } from '@mantine/core'
import { APP_TITLE } from '@/constants'
import { useDrawerState } from '@/contexts/drawerContext'

export const AppHeader = () => {
  const { toggleDrawer } = useDrawerState()

  return (
    <header className="h-[64px] bg-white fixed w-full top-0 z-20 border-b border-gray-200">
      <div className="flex gap-4 items-center h-full">
        <h1 className="font-semibold px-4 whitespace-pre-line text-sm md:text-lg">{APP_TITLE}</h1>
        <ActionIcon className="md:hidden mx-auto mr-4 text-3xl" onClick={toggleDrawer}>
          <Icon icon="heroicons:adjustments-horizontal" />
        </ActionIcon>
      </div>
    </header>
  )
}

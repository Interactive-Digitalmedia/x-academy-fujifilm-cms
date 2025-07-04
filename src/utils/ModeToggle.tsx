import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'

export function ModeToggle() {
  const { setMode, setColorTheme, mode, colorTheme } = useTheme()

  const isLight =
    mode === 'light' ||
    (mode === 'system' &&
      !window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Button
          isIconOnly
          className='rounded-full border-none outline-none focus:outline-none'
        >
          {isLight ? (
            <Sun className='h-[1.2rem] w-[1.2rem]' />
          ) : (
            <Moon className='h-[1.2rem] w-[1.2rem]' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label='Theme Modes' variant='flat'>
        <DropdownItem key='label-mode' className='opacity-60' isReadOnly>
          Mode
        </DropdownItem>
        <DropdownItem
          key='light'
          onPress={() => setMode('light')}
          startContent={<Sun className='h-4 w-4' />}
          endContent={mode === 'light' && <span className={'h-3 w-3 rounded-full border-2 flex-shrink-0 bg-primary'}
          />}
        >
          Light
        </DropdownItem>
        <DropdownItem
          key='dark'
          onPress={() => setMode('dark')}
          startContent={<Moon className='h-4 w-4' />}
          endContent={mode === 'dark' && <span className={'h-3 w-3 rounded-full border-2 flex-shrink-0 bg-primary'}/> }
        >
          Dark
        </DropdownItem>
        <DropdownItem
          key='system'
          onPress={() => setMode('system')}
          startContent={<span className='text-lg'>💻</span>}
          endContent={mode === 'system' && <span className={'h-3 w-3 rounded-full border-2 flex-shrink-0 bg-primary'} />}
        >
          System
        </DropdownItem>

        <DropdownItem key='label-theme' className='mt-2 opacity-60' isReadOnly>
          Theme
        </DropdownItem>
        <DropdownItem
          key='blue'
          onPress={() => setColorTheme('blue')}
          startContent={
            <div className='h-4 w-4 rounded-full bg-[hsl(221.2,83.2%,53.3%)]' />
          }
          endContent={colorTheme === 'blue' && <span className={'h-3 w-3 rounded-full border-2 flex-shrink-0 bg-primary'} />}
        >
          Blue
        </DropdownItem>
        <DropdownItem
          key='black'
          onPress={() => setColorTheme('black')}
          startContent={<div className='h-4 w-4 rounded-full bg-black' />}
          endContent={colorTheme === 'black' && <span className={'h-3 w-3 rounded-full border-2 flex-shrink-0 bg-primary'} />}
        >
          Black
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

import clsx from 'clsx'
import Image from 'next/image'

import logo from '@/images/gphc-logo-transparent.png'

export function Logo({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      className={clsx('object-contain', className)}
      {...props}
      src={logo}
      alt="GP Human Compliance – Gutmensch Palatina"
      draggable={false}
      priority
    />
  )
}

'use client'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

interface IProps {
  session?: any
}
export default function Provider({
  children,
  session,
}: PropsWithChildren<IProps>) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

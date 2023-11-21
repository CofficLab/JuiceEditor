import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { useMemo, useState } from 'react'
import PlainTextExample from '@/examples/plaintext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PlainTextExample />
    </main>
  )
}

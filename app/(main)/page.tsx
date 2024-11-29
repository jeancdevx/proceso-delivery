import Link from 'next/link'

export default function Home() {
  return (
    <main className='mx-auto flex max-w-5xl flex-col gap-y-4 py-4'>
      <h2 className='text-center text-5xl font-semibold'>Interfaces</h2>

      <div className='flex flex-col items-center gap-y-2 text-orange-400'>
        <Link href='/interfaces/1'>Usuario 1</Link>
        <Link href='/interfaces/2'>Usuario 2</Link>
        <Link href='/interfaces/3'>Usuario 3</Link>
        <Link href='/interfaces/4'>Usuario 4</Link>
        <Link href='/interfaces/5'>Usuario 5</Link>
      </div>
    </main>
  )
}

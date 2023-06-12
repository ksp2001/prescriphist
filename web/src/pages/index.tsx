import Landing from 'public/assets/landing.svg';
import Head from 'next/head';
import Link from 'next/link';
import { Nav } from '@/components/Nav/Nav';

export default function Home() {
  return (
    <main className='md:px-32'>
      <div className='flex flex-row pt-20'>
        <div className="justify-center text-5xl font-semibold md:w-3/5">
          <div className="md:w-2/3">
            All your medical information, in one place, with <span className='font-bold text-primary'>prescriphis</span><span className='font-bold text-secondary'>+</span>.
            <div className='text-2xl font-medium pt-2 text-grayDark'>Take care of yourself and your loved ones, hassle free.</div>
          </div>
          <div className='pt-10'>
            <div className="flex justify-center">
              <Link href="/signup" className="rounded-full text-center text-white text-2xl font-semibold inline hover:bg-secondaryDark bg-secondary">
                <div className="px-5 py-2">Sign up</div>
              </Link>
            </div>
            <div className='flex justify-center font-semibold text-sm text-grayDark whitespace-pre'>Already have an account? <Link href="/login" className='inline underline hover:no-underline'>Log in</Link></div>
          </div>
        </div>
        <div className='hidden md:block'>
          <Landing width='20rem' height='20rem' />
        </div>
      </div>
    </main>
  )
}

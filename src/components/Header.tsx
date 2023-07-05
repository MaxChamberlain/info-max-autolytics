'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Header(){
  const route = usePathname()
  return(
      <div className='flex w-screen h-32 py-4 px-16 justify-center items-center gap-4'>
          <div className='w-1/6 text-white text-center tracking-widest whitespace-pre'>
              <span className='font-normal text-4xl'>
                  MAX
              </span>
              <br />
              <span className='font-thin text-3xl'>
                  AUTOLYTICS
              </span>
          </div>
          <div className='w-full text-white  text-center flex gap-8 justify-center'>
            <Link href='/'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <span className='font-normal text-lg'>
                    Home
                </span>
                {route === '/' && (
                  <motion.div layout layoutId='path-underline' className='h-1 w-full bg-white rounded-full'></motion.div>
                )}
              </div>
            </Link>
            <Link href='/data'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <span className='font-normal text-lg'>
                    Data
                </span>
                {route === '/data' && (
                  <motion.div layout layoutId='path-underline' className='h-1 w-full bg-white rounded-full'></motion.div>
                )}
              </div>
            </Link>
            <Link href='/main-dash'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <span className='font-normal text-lg'>
                Main Dashboard
                </span>
                {route === '/main-dash' && (
                  <motion.div layout layoutId='path-underline' className='h-1 w-full bg-white rounded-full'></motion.div>
                )}
              </div>
            </Link>
            <Link href='/source-dash'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <span className='font-normal text-lg'>
                    Source Dashboard
                </span>
                {route === '/source-dash' && (
                  <motion.div layout layoutId='path-underline' className='h-1 w-full bg-white rounded-full'></motion.div>
                )}
              </div>
            </Link>
          </div>
          <Link href='https://www.maxautolytics.com' className='w-1/6'>
            <div className='w-full p-4 flex justify-center items-center gap-2 text-white text-center bg-[#3D495E]/60 hover:bg-[#3D495E]/90 rounded-full text-lg cursor-pointer transition-colors duration-300'>
                Go To App
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
          </Link>
    </div>
    )
}
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import logo from '../_assets/images/autolytics_logo.png'
import Image from 'next/image'
import hamburger from '../_assets/icons/hamburger.svg'
import { useEffect, useState } from 'react'

export default function Header(){
  const route = usePathname()
  const [showNavbar, setShowNavbar] = useState<boolean>(false)
  useEffect(() => {
    setShowNavbar(false)
  }, [route])
  return(
      <div className='flex w-screen h-16 md:h-24 lg:h-32 py-4 px-16 items-center gap-4 whitespace-nowrap justify-between lg:justify-center '>
          <Link href='/'>
            <div className='w-full invert'>
              <Image src={logo} alt="Autolytics Logo" width={200} height={200} />
            </div>
          </Link>
          <div className='w-fit lg:hidden invert cursor-pointer' onClick={() => {
            setShowNavbar(was => !was)
          }}>
            <Image src={hamburger} alt="Hamburger Menu" width={50} height={50} />
          </div>
          <AnimatePresence mode='wait'>
              {showNavbar && <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-1 backdrop-blur-md`}
                  onClick={() => setShowNavbar(false)}
              />}
          </AnimatePresence>
          <motion.div id='nav-menu' className='text-white flex gap-8 text-start lg:text-center w-fit lg:w-full fixed lg:relative top-0 -right-full lg:right-0 lg:left-0 flex-col lg:flex-row h-screen lg:h-fit items-start lg:items-center pt-8 lg:pt-0 pr-8 lg:pr-0 justify-start lg:justify-end' initial={{ right: 0 }} animate={{ right: showNavbar ? 0 : '-100%' }}>
            <Link href='https://www.maxautolytics.com' className='w-full lg:hidden block'>
              <div className='w-full p-4 flex justify-center items-center gap-2 text-white text-center bg-[#3D495E]/60 hover:bg-[#3D495E]/90 rounded-full text-lg cursor-pointer transition-colors duration-300'>
                  Go To App
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
              </div>
            </Link>
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
            <Link href='https://www.maxautolytics.com' className='w-full max-w-[10rem] hidden lg:block'>
              <div className='w-full p-4 flex justify-center items-center gap-2 text-white text-center bg-[#3D495E]/60 hover:bg-[#3D495E]/90 rounded-full text-lg cursor-pointer transition-colors duration-300'>
                  Go To App
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
              </div>
            </Link>
          </motion.div>
    </div>
    )
}
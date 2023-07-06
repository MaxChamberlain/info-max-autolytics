import HomeExample from '@/components/HomeExample'
import Link from 'next/link'

export default function MainDash(){
  return(
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='w-screen flex flex-col items-center justify-center gap-16' style={{ minHeight: 'calc(100vh - 8rem)' }}>
        <div className='flex flex-col justify-around w-full gap-8 items-center'>
          <span className='text-3xl font-bold text-white text-center w-full max-w-2xl'>
            Reporting / Main
          </span>
          <span className='font-bold text-white text-center w-full max-w-2xl text-3xl sm:text-4xl md:text-5xl px-4 md:px-0'>
            How are analytics displayed?
          </span>
          <span className='text-white w-full max-w-xl text-center text-base md:text-lg lg:text-xl px-2 xl:px-0'>
            Max Autolytics is a reporting platform and as such includes different specified reports to assist in the analysis of both the performance of a store and the direction of the relevant market to that store. The overview report, found on the home page, is used to show an overview of the metrics produced by a store over a provided timespan
          </span>
        </div>
        <Link href='#main-dash-example'>
          <div className='absolute bottom-0 lg:bottom-8 flex flex-col gap-4 justify-end items-center left-0 right-0'>
            <span>
              Try It Out!
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-70 ">
              <path fillRule="evenodd" d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </div>
        </Link>
      </div>
      <div className='w-screen relative hidden xl:block'>
        <HomeExample />
      </div>
      <div className='w-screen h-96 xl:hidden flex items-center justify-center text-center bg-white/20' id='main-dash-example'>
        This works best on desktop. Come back on a desktop and try out our dashboard!
      </div>
    </main>
  )
}
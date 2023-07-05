import Image from 'next/image'
import line1 from '@/_assets/icons/line_1.svg'
import line2 from '@/_assets/icons/line_2.svg'
import blurCircle2 from '@/_assets/images/blur_circle_2.png'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='w-screen flex flex-col items-center justify-center gap-16' style={{ height: 'calc(100vh - 8rem)' }}>
        <span className='text-6xl font-bold text-white text-center w-full max-w-lg'>
            Dealer Analytics. 
            See Any Data. 
            Any Time.
        </span>
        <span className='text-xl text-white text-center w-full max-w-2xl'>
          Dig deep into your sales analytics and view any metric, for any timeframe. Using a combination of dynamic and historical data, make more informed decisions, identify market trends and compare operations side-by-side
        </span>
        <div className='w-full flex justify-center gap-12 bg-gradient-to-r from-[#F90] from-8.85% via-[#F63333] via-25% to-[#00E0FF] to-100% bg-clip-text'>
          <Link href='/data'>
            <div className='w-fit py-4 px-8 text-white hover:text-white/40 font-bold text-center text-xl cursor-pointer transition-colors duration-300 flex items-center gap-2 [text-shadow:_0_1px_10px_rgb(255_255_255_/_40%)]'>
                What data do we track?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
          </Link>
          <Link href='/main-dash'>
            <div className='w-fit py-4 px-8 text-white hover:text-white/40 font-bold text-center text-xl cursor-pointer transition-colors duration-300 flex items-center gap-2 [text-shadow:_0_1px_10px_rgb(255_255_255_/_40%)]'>
                Explain the home dashboard
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>
          </Link>
          <Link href='/source-dash'>
            <div className='w-fit py-4 px-8 text-white hover:text-white/40 font-bold text-center text-xl cursor-pointer transition-colors duration-300 flex items-center gap-2 [text-shadow:_0_1px_10px_rgb(255_255_255_/_40%)]'>
              Explain the summary by source
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
      <Image
        src={line1}
        alt="Picture of the author"
        width={1920}
        height={1080}
        className='-z-50'
      />
      <div className='w-full pr-[6.25%] flex items-center justify-center gap-12 text-center -mt-64 z-50'>
        <Image
          src={blurCircle2}
          alt="Picture of the author"
          className='w-1/2 h-full z-50'
        />
        <div className='flex flex-col justify-around w-full gap-32 items-center'>
          <span className='text-5xl font-bold text-white text-center w-full max-w-lg'>
            Our Strategy
          </span>
          <span className='text-xl text-white w-full max-w-2xl text-left'>
            We help to collect and organize both historical and dynamic data, through multiple sources. This aims to provide transparent analytics for individual dealerships as well as dynamic analytics for multiple dealerships in a side by side comparison with multiple customized levels of granularity and time periods. This all builds to assist in providing predictive market pricing and inventory valuation relative to individual dealerships to optimize efficiency, throughput and return on investment.
          </span>
        </div>
      </div>
      <Image
        src={line2}
        alt="Picture of the author"
        width={1920}
        height={1080}
        className='-z-50 -mt-32'
      />
    </main>
  )
}

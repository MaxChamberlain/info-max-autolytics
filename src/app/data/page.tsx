import Image from 'next/image'
import line3 from '@/_assets/icons/line_3.svg'
import VerticalDivider from '@/components/VerticalDivider'

const storedData = {
  historical: {
    'At Acquisition': [
      'ACV at acquisition',
      'Manheim Market Report at acquisition',
      'Asking price at acquisition',
      'Source of acquisition',
      'MSRP',
      'Stock number',
      'VIN number',
      'Year, make, model and trim of vehicle'
    ],
    'At Sale': [
      'Days to sell',
      'Selected GarGurus price options at sale',
      'Whether the vehicle is certified at sale',
      'Gross earned at sale',
      'Percent of market at sale',
      'Odometer at sale',
      'Sell Price',
    ]
  },
  dynamic: [
    'ACV at sale',
    'Selected GarGurus price at sale',
    'All GarGurus price options at sale',
    'Manheim Market Report at sale',
  ]
}

export default function Data(){
  return(
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='w-screen flex flex-col items-center justify-center gap-16 mb-64' style={{ minHeight: 'calc(100vh - 8rem)' }}>
        <div className='flex flex-col justify-around w-full gap-8 items-center'>
          <span className='text-3xl font-bold text-white text-center w-full max-w-2xl'>
            Data
          </span>
          <span className='text-5xl font-bold text-white text-center w-full max-w-2xl'>
            What data is covered?
          </span>
          <span className='text-xl text-white w-full max-w-xl text-center'>
            Max Autolytics stores an array of both static and dynamic metrics representing the details of a sale both upon acquisition and upon sale
          </span>
        </div>
        <div className='w-full max-w-5xl flex flex-col gap-24 h-full'>
          <div className='flex justify-around w-full gap-12 items-start h-[30rem]'>
            <div className='flex flex-col gap-2 w-full items-center rounded-xl p-4 border border-white/30 h-full '>
              <span className='w-full pb-8 text-center font-bold text-4xl'>  
                Historical Data
              </span>
              <div className='flex gap-4 justify-center w-full'>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold text-lg flex items-center gap-2'>
                    <div className='h-2 aspect-square bg-white rounded-full'></div>
                    At Acquisition
                  </span>
                  {storedData.historical['At Acquisition'].map((item, index) => (
                    <div key={index} className='flex items-center gap-2 ml-2'>
                      <div className='h-px w-2 bg-white rounded-full'></div>
                      <span>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='font-bold text-lg flex items-center gap-2'>
                    <div className='h-2 aspect-square bg-white rounded-full'></div>
                    At Sale
                  </span>
                  {storedData.historical['At Sale'].map((item, index) => (
                    <div key={index} className='flex items-center gap-2 ml-2'>
                      <div className='h-px w-2 bg-white rounded-full'></div>
                      <span>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full h-full items-center rounded-xl p-4 border border-white/30'>
              <span className='w-full pb-8 text-center font-bold text-4xl'>  
                Dynamic Data
              </span>
              <div className='flex flex-col gap-2'>
                {storedData.dynamic.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 ml-2'>
                    <div className='h-2 aspect-square bg-white rounded-full'></div>
                    <span>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full px-32 flex items-center justify-center gap-12 text-center z-50 h-[500px]'>
        <div className='w-1/2 aspect-square rounded-full bg-gradient-to-r from-[#F90] from-8.85% via-[#F63333] via-25% to-[#00E0FF] to-100% blur-[12rem] absolute -z-50 opacity-60'></div>
        <div className='flex flex-col justify-start w-2/3 gap-32 items-center h-full'>
          <span className='text-6xl font-bold text-white text-center w-full max-w-lg'>
            See All Your Data Real-time
          </span>
          <span className='text-xl text-white w-full max-w-2xl text-left'>
            Your sales data is all presented as you put it in, in real-time
            <br/>
            <br/>
            Set margin goals, or just view trades, any data can be viewed and changed. Whenever you like.
          </span>
        </div>
        <div className='w-full' style={{ perspective: 1500 }}>
          <div className='w-full ' style={{ transform: 'rotateY(-10deg) rotateX(5deg)' }}>
            <video autoPlay loop style={{ width: '100%', height: '500px' }}>
              <source src='videos/list.mp4' type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <Image
        src={line3}
        alt="Picture of the author"
        width={1920}
        height={1080}
        className='-z-50 -mt-32'
      />
    </main>
  )
}
export default function Header(){
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
            <div className='w-full text-white text-center flex gap-8 justify-center'>
                <span className='font-normal text-lg'>
                    Home
                </span>
                <span className='font-normal text-lg'>
                    Home
                </span>
                <span className='font-normal text-lg'>
                    Home
                </span>
                <span className='font-normal text-lg'>
                    Home
                </span>
                <span className='font-normal text-lg'>
                    Home
                </span>
            </div>
            <div className='w-1/6 p-4 text-white text-center bg-[#3D495E]/60 hover:bg-[#3D495E]/90 rounded-full text-lg cursor-pointer transition-colors duration-300'>
                Get Started
            </div>
        </div>
    )
}
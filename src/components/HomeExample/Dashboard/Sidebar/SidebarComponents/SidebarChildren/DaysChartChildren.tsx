import { motion } from "framer-motion";
import { properNumber } from "../../../../../../utils/text";

export default function DaysChartChildren({ data }: {data: any}){
    console.log(data)
    return(<div key='b'>
        <motion.div 
            className='px-4 py-12 flex flex-col rounded-t-xl items-center justify-center text-2xl font-bold text-white' 
            style={{
                background: 'linear-gradient(180deg, hsl(220, 100%, 70%) 0%, hsl(220, 100%, 50%) 100%)'
            }}
            transition={{duration: 0.1}}
            layout layoutId='blue-square'
        >
            <p className="label text-2xl font-bold">{`${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split(',')[0]}, ${data.date}`}</p>
        </motion.div>
        <br />
        <motion.div 
            className="flex flex-col gap-4 items-start font-semibold text-xl justify- w-full p-4"
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.1}}
            exit={{opacity: 0, x: 100}}
        >
            <div className='p-4 border-l-2 border-orange-400'>
                <span>{data.countOfSales} total sales</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>{data.averageSalesToDate} average sales per day</span>
            </div>
            <div className='p-4 border-l-2 flex flex-col border-orange-400'>
                <span>${properNumber(data.totalMargin + data.adjustmentsTotal)} total gross</span>
            </div>
            <div className='w-5/6 mx-auto h-px bg-stone-200 relative'>
                <div className='absolute top-0 left-0 h-4 w-px bg-stone-200'></div>
                <div className='absolute top-0 right-0 h-4 w-px bg-stone-200'></div>
                <div className='absolute bottom-0 left-1/4 -translate-1/2 h-4 w-px bg-stone-200'></div>
            </div>
            <div className='flex gap-4 w-full justify-between text-base opacity-80'>
                <span className='flex flex-col items-start'>
                    <span>${properNumber(data.totalMargin)}</span>
                    <span>Gross</span>
                </span>
                <span className='flex flex-col items-end'>
                    <span>${properNumber(data.adjustmentsTotal)}</span>
                    <span>Adjustments</span>
                </span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>${properNumber(data.averageMargin)} average gross</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>${properNumber(data.acvChange)} average ACV change</span>
            </div>
        </motion.div>
    </div>)
}
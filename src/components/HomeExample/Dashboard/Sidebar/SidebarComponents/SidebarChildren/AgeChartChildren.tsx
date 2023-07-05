import { motion } from "framer-motion";
import { properNumber } from "../../../../../../utils/text";

export default function DaysChartChildren({ 
    data
}: {
    data: any
}){
    return(<div key='b'>
        <motion.div 
            className='px-4 py-12 flex flex-col rounded-t-xl items-center justify-center text-2xl font-bold text-white' 
            style={{
                background: 'linear-gradient(180deg, hsl(220, 100%, 70%) 0%, hsl(220, 100%, 50%) 100%)'
            }}
            transition={{duration: 0.1}}
            layout layoutId='blue-square'
        >
            <p className="label text-2xl font-bold">{data.ageRange?.toUpperCase()} Days</p>
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
                Dropped <span className='label text-orange-600'>{`${String(data.countOfDroppedVehicles)}`}</span> vehicles
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                For an average of <span className='label text-orange-600'>{`$${properNumber(Math.abs(data.priceDropForAge))}`}</span> <span className='label' style={{color: data.priceDropForAge < 0 ? 'hsl(120, 80%, 40%)' : 'hsl(0, 80%, 40%)'}}>{data.priceDropForAge < 0 ? 'gain' : 'loss'}</span> each
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                Or a total of <span className='label text-orange-600'>{`$${properNumber(Math.abs(data.cumulativePriceDropToAge))}`}</span> <span className='label' style={{color: data.totalPriceDropForAge < 0 ? 'hsl(120, 80%, 40%)' : 'hsl(0, 80%, 40%)'}}>{data.totalPriceDropForAge < 0 ? 'gained' : 'lost'}</span>
            </div>
        </motion.div>
    </div>)
}
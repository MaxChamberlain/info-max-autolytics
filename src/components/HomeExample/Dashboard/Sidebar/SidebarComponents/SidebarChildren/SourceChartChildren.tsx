import { motion } from "framer-motion";
import { properNumber } from "../../../../../../utils/text";

export default function DaysChartChildren({ 
    data,
    totalDocsCount
}: {
    data: any
    totalDocsCount: number
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
            <p className="label text-2xl font-bold">{data.name?.toUpperCase()}</p>
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
                <span>{Math.round((data.countOfSales / totalDocsCount) * 100)}% of total sales</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>${properNumber(data.totalMargin)} total gross</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>${properNumber(data.averageMargin)} average gross</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>${properNumber(data.acvChange)} average ACV change</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>{properNumber(data.averagePercentToMarket)}% average market percent</span>
            </div>
            <div className='p-4 border-l-2 border-orange-400'>
                <span>{properNumber(data.countOfRollbacks)} rollbacks</span>
            </div>
        </motion.div>
    </div>)
}
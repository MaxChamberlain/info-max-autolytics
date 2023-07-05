import MarketPercent from "./SidebarComponents/MarketPercent";
import CarGurusRating from "./SidebarComponents/CarGurusRating";
import AdjustmentsDisplay from "./SidebarComponents/AdjustmentsDisplay";
import RollbacksDisplay from "./SidebarComponents/RollbacksDisplay";
import DaysToSellChart from "./SidebarComponents/DaysToSellChart";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import useDocuments from '@/hooks/useDocuments'

export default function Sidebar({ children, preppedData, loading }: { children?: React.ReactNode, preppedData: any, loading?: boolean }){
  const { adjustments } = useDocuments()
  return (
    <motion.div className='flex flex-col w-1/6 bg-white absolute right-4 top-16 bottom-4 rounded-xl'
    style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(20px)',
    }}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    >
      <AnimatePresence mode='wait' initial={false}>
        {loading
        ? <div key='c'>
            <motion.div className='px-4 py-12 flex flex-col rounded-t-xl items-center justify-center text-white' style={{
              background: 'linear-gradient(180deg, hsl(220, 100%, 70%) 0%, hsl(220, 100%, 50%) 100%)'
            }} layout layoutId='blue-square' transition={{
              duration: 0.2
            }}>
              <Skeleton
                variant='rounded'
                width={260}
                height={40}
                className='m-4'
              /> 
            </motion.div> 
            <Skeleton
              variant='rounded'
              width='calc(100% - 2rem)'
              height={80}
              className='m-4'
            /> 
            <Skeleton
              variant='rounded'
              width='calc(100% - 2rem)'
              height={180}
              className='m-4'
            /> 
            <Skeleton
              variant='rounded'
              width='calc(100% - 2rem)'
              height={80}
              className='m-4'
            /> 
            <Skeleton
              variant='rounded'
              width='calc(100% - 2rem)'
              height={80}
              className='m-4'
            /> 
          </div>
        : (children ?? <div key='a'>
          <motion.div className='px-4 py-12 flex flex-col rounded-t-xl items-center justify-center text-white' style={{
            background: 'linear-gradient(180deg, hsl(220, 100%, 70%) 0%, hsl(220, 100%, 50%) 100%)'
          }} layout layoutId='blue-square' transition={{
            duration: 0.2
          }}>
            <MarketPercent averageMarketPercent={preppedData.averagePercentToMarket} />
          </motion.div>
          <motion.div className={'w-full h-full mt-4'}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.1 }}
          >
            <CarGurusRating cargurusComparison={preppedData.cargurusComparison} />
            <DaysToSellChart days={preppedData.averageDaysToSell} />
            <div className='flex flex-col justify-around gap-4 mt-4'>
              <AdjustmentsDisplay adjustments={adjustments} />
              <RollbacksDisplay rollbacks={preppedData.rollbackMetrics} />
            </div>
          </motion.div>
        </div>)}
      </AnimatePresence>
    </motion.div>
  )
}
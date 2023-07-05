import { motion } from 'framer-motion';
import StraightIcon from '@mui/icons-material/Straight'

export default function CarGuruRating({ cargurusComparison }: {
    cargurusComparison: {
        totalCountWithCarGurus: number
        cargurusOptionsCumulative: {
          greatPrice: number
          goodPrice: number
          fairPrice: number
          highPrice: number
          overPrice: number
        }
        closestCarGurusOption: number
        closestCarGurusOptionName: string
        averageChosenCargurusPrice: number
        averageChosenCargurusNextHighest: number
        closestCarGurusOptionNextHighest: number
        closestCarGurusOptionNameNextHighest: string
        amountToMoveFromLeft: {
          amount: number
          precisionModifier: number
        }
      }
}){
    return(<div>
    <div className='w-[80%] mx-auto flex justify-between relative' style={{
        color: 'black',
        fontSize: '0.75rem',
      }}>
        <div className='h-6 text-center -ml-3 w-px absolute -top-1 z-[999] left-0'>Great</div>
        <div className='h-6 text-center -ml-3 w-px absolute -top-1 z-[999] left-[25%]'>Good</div>
        <div className='h-6 text-center -ml-3 w-px absolute -top-1 z-[999] left-[50%]'>Fair</div>
        <div className='h-6 text-center -ml-3 w-px absolute -top-1 z-[999] left-[75%]'>High</div>
        <div className='h-6 text-center -ml-3 w-px absolute -top-1 z-[999] left-[100%]'>Over</div>
      </div>
      <div className='w-[80%] mx-auto flex justify-between relative' style={{
        color: 'black',
      }}>
        <div className='h-6 bg-white w-px absolute top-9 z-[999] left-0'></div>
        <div className='h-6 bg-white w-px absolute top-9 z-[999] left-[25%]'></div>
        <div className='h-6 bg-white w-px absolute top-9 z-[999] left-[50%]'></div>
        <div className='h-6 bg-white w-px absolute top-9 z-[999] left-[75%]'></div>
        <div className='h-6 bg-white w-px absolute top-9 z-[999] left-[100%]'></div>
      </div>
      <div className='w-full mt-10'>
        <div className='w-[80%] mx-auto h-4 rounded-full relative' style={{
          background: `linear-gradient(90deg, #ff0000 0%, #00ff00 100%)`,
          filter: 'brightness(1.5)',
        }}>
          <motion.div layout className='absolute top-0 w-2 rounded-full bg-blue-600 ' style={{ height: '150%', marginTop: -4, boxShadow: '0 0 0 1.5pt black', left: `calc(${cargurusComparison.amountToMoveFromLeft.amount + cargurusComparison.amountToMoveFromLeft.precisionModifier}% - 0.25rem)` }}></motion.div>
        </div>
      </div>
      <div className='w-full flex justify-center mt-4 mb-6 items-center text-black text-center font-bold'>
          {cargurusComparison.closestCarGurusOption !== 0 && <span>${Math.abs(cargurusComparison.averageChosenCargurusPrice)} {cargurusComparison.averageChosenCargurusPrice > 0 ? 'above' : 'below'} {cargurusComparison.closestCarGurusOptionName}</span> }
          {cargurusComparison.averageChosenCargurusPrice !== 0 && <StraightIcon style={{
              color: 'hsl(120, 90%, 40%)',
              fontSize: '3rem',
          }} />}
          {cargurusComparison.averageChosenCargurusNextHighest !== 0 && <StraightIcon style={{
              color: 'hsl(0, 90%, 40%)',
              transform: 'rotate(180deg)',
              fontSize: '3rem',
          }} />}
          {cargurusComparison.averageChosenCargurusNextHighest !== 0 && <><span> ${Math.abs(cargurusComparison.averageChosenCargurusNextHighest)} {cargurusComparison.averageChosenCargurusNextHighest > 0 ? 'above' : 'below'} {cargurusComparison.closestCarGurusOptionNameNextHighest} </span></>}
      </div>
    </div>)
}
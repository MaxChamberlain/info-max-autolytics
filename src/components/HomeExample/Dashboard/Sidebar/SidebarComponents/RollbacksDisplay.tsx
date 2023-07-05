import { properNumber } from "../../../../../utils/text";

export default function RollbacksDisplay({ rollbacks }: {
    rollbacks: any
}){
    return(
        <div className='rounded-xl mx-4 p-0.5 text-black text-sm 3xl:text-lg' style={{
            background: 'linear-gradient(-45deg, hsl(20, 100%, 65%) 0%, hsl(40, 100%, 65%) 100%)'
        }}>
            <div className='bg-white rounded-xl p-4 text-center'>
                There are <span className='text-orange-500 font-bold'>
                    {rollbacks.countOfRollbacks}
                </span> rollbacks, totaling <span className='text-orange-500 font-bold'>
                    ${properNumber(rollbacks?.marginFromRollbacks ?? 0)}
                </span>
            </div>
        </div>
    )
}
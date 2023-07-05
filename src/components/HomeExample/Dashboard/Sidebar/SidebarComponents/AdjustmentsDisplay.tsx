import { properNumber } from "../../../../../utils/text";

export default function AdjustmentsDisplay({ adjustments }: { adjustments?: any[] }){
    return(
        <div className='rounded-xl mx-4 p-0.5 text-black text-sm 3xl:text-lg' style={{
            background: 'linear-gradient(-45deg, hsl(180, 100%, 45%) 0%, hsl(190, 100%, 40%) 100%)'
        }}>
            <div className='bg-white rounded-xl p-4 text-center'>
                There are <span className='text-indigo-600 font-bold'>
                    {adjustments?.length ?? 0}
                </span> adjustments, totaling <span className='text-indigo-600 font-bold'>
                    ${properNumber(adjustments?.reduce((a, b) => a + parseInt(b.adjustment_value?.toString() ?? '0'), 0) ?? 0)}
                </span>
            </div>
        </div>
    )
}
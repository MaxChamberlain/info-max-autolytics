import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function MarketPercent({ averageMarketPercent } : { averageMarketPercent: number }){
    return(<>
        <ResponsiveContainer width="100%" height={260}>
            <PieChart>
            <Pie startAngle={180}
                endAngle={0}
                outerRadius="100%"
                innerRadius="80%"
                data={[
                { name: "Transacting Percent", value: averageMarketPercent / 2 },
                { name: "", value: 100 - (averageMarketPercent / 2) },
                ]}
                dataKey="value"
                labelLine={false}
                blendStroke
                isAnimationActive={false}
            >
                <Cell fill="#44dd44" radius={80} />
                <Cell fill="#eeffee" />
            </Pie>
            </PieChart>
        </ResponsiveContainer>
        <div className='flex justify-center items-center -mt-[170px] text-2xl font-bold'>{averageMarketPercent ?? 0}%</div>
        <div className='flex justify-center items-center mt-6 text-xl font-bold'>You are transacting at this percent</div>
    </>
    )
}
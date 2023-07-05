'use client'
import { Area, Bar, CartesianGrid, Cell, ComposedChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"
import { useState } from "react"
import SourceChartChildren from "./Sidebar/SidebarComponents/SidebarChildren/SourceChartChildren"
import AgeChartChildren from "./Sidebar/SidebarComponents/SidebarChildren/AgeChartChildren"

export default function PerSourceGraph({
    data,
    ageData,
    setSidebarChildren
}: {
    data: any
    ageData: any
    setSidebarChildren: (children: React.ReactNode) => void
}){
    const [ focusedBar, setFocusedBar ] = useState<any>([undefined, undefined])
    return(
        <motion.div 
            className={`w-full p-4 rounded-t-xl flex justify-start bg-slate-800 text-white pb-8`}
            style={{
                background: 'radial-gradient(50% 50% at 50% 50%, #DDC79F 25%, #DDC79F 100%)',
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
        >
            <div className='w-[40%]'>
                <div className='text-[#203849] font-bold text-xl mb-16 w-full text-center'>Sales by Source</div>
                <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 60,
                            left: 20,
                            bottom: 50,
                        }}
                        syncMethod='value'
                        syncId='source-chart'
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 25, right: 10 }} stroke='#000819' style={{ fontSize: 12 }} interval={0} angle={45} textAnchor='start' />
                        <YAxis stroke='#000819' dataKey='countOfSales' />
                        <CartesianGrid stroke='rgba(255,255,255,0.1)' vertical={false} />
                        <Area
                            type="monotone"
                            dataKey="averageSalesToDate"
                            stroke="hsl(220, 100%, 60%)"
                            fill="hsl(220, 80%, 20%)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Bar dataKey="countOfSales" fill="#203849" barSize={25}>
                            {data.map((entry: any, index: any) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill='#203849'
                                    style={{ opacity: focusedBar[1] ? focusedBar[1] === index ? 1 : 0.5 : 1 }}
                                    onMouseEnter={() => {
                                        setFocusedBar((was: [any, any]) => [was[0], index])
                                        setSidebarChildren(<SourceChartChildren data={entry} totalDocsCount={data.reduce((a: number, b: any) => a + b.countOfSales, 0)} />)
                                    }}
                                    onMouseLeave={() => {
                                        setFocusedBar((was: [any, any]) => [was[0], undefined])
                                        setSidebarChildren(undefined)
                                    }}
                                />
                            ))}
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className='w-[40%]'>
                <div className='text-[#203849] font-bold text-xl mb-16 w-full text-center'>Price Drop by Age</div>
                <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart
                        data={ageData}
                        margin={{
                            top: 5,
                            right: 60,
                            left: 20,
                            bottom: 50,
                        }}
                        syncMethod='value'
                        syncId='age-chart'
                    >
                        <XAxis dataKey="ageRange" scale="point" padding={{ left: 25, right: 10 }} stroke='#000819' style={{ fontSize: 12 }} interval={0} angle={45} textAnchor='start' />
                        <YAxis stroke='#000819' dataKey={'countOfDroppedVehicles'} />
                        <CartesianGrid stroke='rgba(255,255,255,0.1)' vertical={false} />
                        <Bar dataKey="countOfDroppedVehicles" fill="#203849" barSize={25}>
                            {ageData.map((entry: any, index: any) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill='#203849'
                                    style={{ opacity: focusedBar[0] ? focusedBar[0] === index ? 1 : 0.5 : 1 }}
                                    onMouseEnter={() => {
                                        setFocusedBar((was: [any, any]) => [index, was[1]])
                                        setSidebarChildren(<AgeChartChildren data={entry} />)
                                    }}
                                    onMouseLeave={() => {
                                        setFocusedBar((was: [any, any]) => [undefined, was[1]])
                                        setSidebarChildren(undefined)
                                    }}
                                />
                            ))}
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}
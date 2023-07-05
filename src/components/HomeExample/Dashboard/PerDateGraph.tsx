'use client'
import { Area, Bar, CartesianGrid, Cell, ComposedChart, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { properText } from "../../../utils/text"
import { Chip } from "@mui/material"
import { motion } from "framer-motion"
import DaysChartChildren from "./Sidebar/SidebarComponents/SidebarChildren/DaysChartChildren"
import { useState } from "react"
import './perDateAnimation.css'

export default function PerDateGraph({
    data,
    setSidebarChildren,
    companyName
}: {
    data: any
    setSidebarChildren: (children: React.ReactNode) => void
    companyName?: string
}){
    const [ focusedBar, setFocusedBar ] = useState<any>(undefined)
    const loading = !(data.charts.salesByDate.length > 0 && data.totalSales)
    const loadingData = []
    for(let i = 0; i < 10; i++){
        let newObj = {
            date: new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0],
            countOfSales: 10,
            averageSalesToDate: 10,
            totalMargin: 10,
            acvChange: 10
        }
        loadingData.push(newObj)
    }
    return(
        <motion.div 
            className={`w-full p-4 rounded-b-xl bg-slate-800 text-white pb-32 -mb-24`}
            style={{
                background: 'radial-gradient(50% 50% at 50% 33%, rgb(30 41 59) 25%, hsl(220, 100%, 5%) 100%)'
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
        >
            <div className='text-white font-bold text-xl mb-16 w-full text-center'>{properText(companyName ?? '')}</div>
            <ResponsiveContainer width='80%' height={350}>
                <ComposedChart
                    data={loading ? loadingData : data.charts.salesByDate}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    syncMethod='value'
                    syncId='date-chart'
                >
                    <XAxis dataKey="date" scale="point" padding={{ left: 25, right: 10 }} stroke='#DDC79F' />
                    <YAxis stroke='#DDC79F' dataKey='countOfSales' />
                    <CartesianGrid stroke='rgba(255,255,255,0.1)' vertical={false} />
                    {!loading && <Area
                        type="monotone"
                        dataKey="averageSalesToDate"
                        stroke="#12414E"
                        fill="#42818E"
                        strokeWidth={2}
                        dot={false}
                    />}
                    <Bar dataKey="countOfSales" fill="#DDC79F" barSize={25}>
                        {data.charts.salesByDate.map((entry: any, index: number) => (loading
                            ? <Cell key={`cell-${index}`} fill='#fff' style={{ 
                                opacity: 0.5,
                                animation: 'pulse 3s infinite',
                                animationDelay: `${index * 0.05}s`
                            }} />
                            : <Cell
                                key={`cell-${index}`}
                                fill='#DDC79F'
                                style={{ opacity: focusedBar ? focusedBar === index ? 1 : 0.5 : 1 }}
                                onMouseEnter={() => {
                                    setFocusedBar(index)
                                    setSidebarChildren(<DaysChartChildren data={entry} />)
                                }}
                                onMouseLeave={() => {
                                    setFocusedBar(undefined)
                                    setSidebarChildren(undefined)
                                }}
                            />
                        ))}
                    </Bar>
                    <Legend content={<CustomLegend />} />
                </ComposedChart>
            </ResponsiveContainer>
        </motion.div>
    )

    function CustomLegend({ payload }: any) {
        return (
            <div className="flex flex-row w-full justify-center items-center mt-4 text-[#eDd7cF]">
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} className="flex flex-row items-center mr-4">
                        <Chip
                            style={{
                                backgroundColor: entry.color,
                                marginRight: '0.25rem',
                                height: '1.25rem',
                                width: '2rem'
                            }}
                        />
                        <p className="text-lg">{properText(entry.value)}</p>
                    </div>
                ))}
            </div>
        )
    }
}
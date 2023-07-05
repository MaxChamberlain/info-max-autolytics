import PerDateGraph from "./HomeExample/Dashboard/PerDateGraph"
import PerSourceGraph from "./HomeExample/Dashboard/PerSourceGraph"
import Sidebar from "./HomeExample/Dashboard/Sidebar/Sidebar"
import TileRow from "./HomeExample/Tiles/TileRow"
import TextTile from "./HomeExample/Tiles/NumberTile"
import { properNumber } from "../utils/text"
import { LinearProgress, Skeleton } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import useDocuments from '@/hooks/useDocuments'

export default function HomeExample(){
    const { documents, adjustments, loading, data, sidebarChildren, setSidebarChildren, showGrossWithAdjustments, setShowGrossWithAdjustments } = useDocuments()
    
    if(!documents) return(<LinearProgress />)
    return(
        <motion.div 
            className='flex justify-between gap-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id='main-dash-example'
        >
            <div 
                className='fixed top-0 left-0 right-0 bottom-0 z-[-1]'
                style={{
                    backgroundColor: '#ffc799',
                    opacity: 0.3,
                    backgroundImage: 'radial-gradient(at 80% 7%, hsla(293,90%,78%,1) 0px, transparent 50%), radial-gradient(at 87% 71%, hsla(202,96%,79%,1) 0px, transparent 50%), radial-gradient(at 9% 99%, hsla(183,80%,68%,1) 0px, transparent 50%), radial-gradient(at 85% 73%, hsla(42,74%,67%,1) 0px, transparent 50%), radial-gradient(at 97% 7%, hsla(44,65%,63%,1) 0px, transparent 50%), radial-gradient(at 25% 20%, hsla(244,79%,63%,1) 0px, transparent 50%), radial-gradient(at 38% 38%, hsla(146,86%,63%,1) 0px, transparent 50%)'
                }}
            ></div>
            <motion.div layout className='w-full relative'>
                <PerDateGraph
                    data={data}
                    setSidebarChildren={setSidebarChildren}
                    companyName='Toyota Store'
                />
                <Sidebar preppedData={data} loading={!(data?.cargurusComparison && data?.averageDaysToSell && data?.rollbackMetrics)} >
                    {sidebarChildren}
                </Sidebar>
                <TileRow style={{
                  flexDirection: 'row' 
                }}>
                    <TextTile
                            width='1/3'
                            title="Sales"
                            backgroundColor="bg-green-100"
                            loading={!(data.totalSales && data.charts.salesByDate && data.paceForMonth)}
                            metrics={[
                                {
                                    color: '#1E485B',
                                    metric: data?.totalSales.toString(),
                                    text: 'Total Sales'
                                },
                                {
                                    color: '#42818E',
                                    metric: Math.round(data?.totalSales / data?.charts.salesByDate.length).toString(),
                                    text: 'Average Sales'
                                },
                                {
                                    color: '#95C6A0',
                                    metric: Math.round(parseInt(data?.paceForMonth.toString())).toString(),
                                    text: 'Sales Pace'
                                }
                            ]}
                        />
                    <TextTile
                        width='1/3'
                        title="Gross"
                        backgroundColor="bg-green-100"
                        loading={!(data.totalMarginAdjustedForAdjustments && data.totalMargin && data.averageMarginAdjustedForAdjustments && data.averageMargin && data.marginPaceAdjustedForAdjustments && data.marginPace)}
                        metrics={[
                            {
                                color: '#D0AD70',
                                metric: `$${properNumber(Math.floor(showGrossWithAdjustments ? data.totalMarginAdjustedForAdjustments : data.totalMargin))}`,
                                text: 'Total Gross'
                            },
                            {
                                color: '#ECAD59',
                                metric: `$${properNumber(Math.floor(showGrossWithAdjustments ? data.averageMarginAdjustedForAdjustments : data.averageMargin))}`,
                                text: 'Average Gross'
                            },
                            {
                                color: '#F48512',
                                metric: `$${properNumber(Math.round(parseInt(showGrossWithAdjustments ? data.marginPaceAdjustedForAdjustments.toString() : data.marginPace.toString()))).toString()}`,
                                text: 'Gross Pace'
                            }
                        ]}
                    />
                    <TextTile
                        width='full'
                        title="Certified VS Uncertified"
                        backgroundColor="bg-green-100"
                        loading={!(data.charts.certifiedVehicleCount.certified && data.totalSales && data.charts.certifiedVehicleCount.certifiedMargin)}
                    >
                        <AnimatePresence mode='wait'>
                            {!(data.charts.certifiedVehicleCount.certified && data.totalSales && data.charts.certifiedVehicleCount.certifiedMargin)
                            ? <motion.div 
                                key='loading'
                                className='text-start items-center stagger-box relative w-full flex flex-col justify-between p-0 py-4 h-36 2xl:h-56'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{ opacity: 0 }}
                                layout
                            >
                                <div className='home-metric h-full flex flex-col justify-between'>
                                    <div className='font-bold text-center w-full text-xl flex items-center justify-center gap-2'>
                                        <Skeleton
                                            variant='rounded'
                                            width={80}
                                            height='100%'
                                        /> 
                                        <Skeleton
                                            variant='rounded'
                                            width={20}
                                            height='100%'
                                            style={{
                                                backgroundColor: 'transparent',
                                                color: '#aaa'
                                            }}
                                        >
                                            /
                                        </Skeleton>
                                        <Skeleton
                                            variant='rounded'
                                            width={80}
                                            height='100%'
                                        />
                                    </div>
                                    <div className='w-full px-4 h-[8px]'>
                                        <Skeleton
                                            variant='rounded'
                                            width='100%'
                                            height='100%'
                                        /> 
                                    </div>
                                    <div>
                                        <div className='p-4 flex justify-around items-center'>
                                            <Skeleton
                                                variant='rounded'
                                                width={140}
                                                height={40}
                                                className='m-4'
                                            /> 
                                            <Skeleton
                                                variant='rounded'
                                                width={260}
                                                height={40}
                                                className='m-4'
                                            /> 
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            : <motion.div 
                                key='loaded'
                                className='text-start items-center stagger-box relative w-full flex flex-col justify-between p-0 py-4 h-36 2xl:h-56'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                exit={{ opacity: 0 }}
                                layout
                            >
                                <div className='home-metric h-full flex flex-col justify-between'>
                                    <div className='font-bold text-center w-full text-xl'>
                                        {data.charts.certifiedVehicleCount.certified} / {data.totalSales}
                                    </div>
                                    <div className='w-full px-4 h-[8px]'>
                                        <LinearProgress
                                        variant='determinate'
                                        value={
                                            (data.charts.certifiedVehicleCount.certified / data.documents.length) * 100
                                        }
                                        style={{ height: 8, borderRadius: 5 }}
                                        />
                                    </div>
                                    <div>
                                        <div className='p-4 flex justify-around items-center'>
                                            <div
                                                className='font-bold w-fit whitespace-nowrap p-4 text-xl 2xl:text-xl text-center'
                                                style={{ color: 'hsl(220, 100%, 60%)' }}
                                            >
                                                $
                                                {Math.floor(
                                                    data.charts.certifiedVehicleCount.certified - data.charts.certifiedVehicleCount.uncertified
                                                )} {data.charts.certifiedVehicleCount.certifiedMargin - data.charts.certifiedVehicleCount.uncertifiedMargin > 0
                                                    ? 'More'
                                                    : 'Less'}
                                            </div>
                                            <div className='w-full text-lg font-bold'>
                                                for certified vs uncertified (<span style={{
                                                color: 'hsl(220, 100%, 60%)'
                                                }}> {Math.floor(
                                                    (data.charts.certifiedVehicleCount.certifiedMargin /
                                                    data.charts.certifiedVehicleCount.uncertifiedMargin) *
                                                    100
                                                ) - 100}
                                                %</span>)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>}
                        </AnimatePresence>
                    </TextTile>
                </TileRow>
                <PerSourceGraph
                    data={data.charts.salesBySource}
                    ageData={data.charts.priceDropByAge}
                    setSidebarChildren={setSidebarChildren}
                />
            </motion.div>
        </motion.div>
    )
}
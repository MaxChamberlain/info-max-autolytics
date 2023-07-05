import React from 'react'
import { Skeleton, Switch } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

export default function TextTile ({
  width,
  title,
  loading,
    metrics,
    children,
    modifier,
    containerStyle,
    metricStyle
}: {
  width: string | null | undefined
  title?: string
  loading?: boolean
    backgroundColor?: string
    metrics?: {
      color: string
      metric: string | React.ReactNode
      text: string
  }[]
  children?: React.ReactNode | null
    modifier?: [string, boolean, React.Dispatch<React.SetStateAction<boolean>>]
    containerStyle?: React.CSSProperties
    metricStyle?: React.CSSProperties
}) {
  return (
    <motion.div
      className={`border border-stone-200 rounded-xl mx-auto items-stretch flex flex-col h-full font-bold ${
        typeof width === 'string' ? `w-${width}` : 'w-full'
      }`}
      style={{
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(20px)',
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
    >
      {title && <div className={'p-4 text-lg 2xl:text-xl h-1/6 rounded-t-xl flex justify-between items-center border-b border-black border-opacity-20'}>
        <div className='font-bold w-full'>{title}</div>
        {modifier && (
          <div className='flex gap-2 whitespace-nowrap items-center'>
            <div className='font-bold'>{modifier[0]}</div>
            <Switch
              checked={modifier[1]}
              onChange={() => modifier[2](!modifier[1])}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        )}
      </div>}
      <div className='flex justify-around gap-4 w-full 2xl:pt-8 text-lg 2xl:text-xl' style={containerStyle}>
          <AnimatePresence mode='wait'>
            {children || metrics?.map((metric, i) => !loading
              ? (
                  <motion.div 
                    key='loaded'
                    className='flex flex-col items-center justify-start h-36 2xl:h-56'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * i }}
                    exit={{ opacity: 0 }}
                    layout
                  >
                      <div style={{
                          borderWidth: '5px',
                          borderColor: metric.color,
                          borderRadius: '100%',
                          height: '55%',
                          aspectRatio: '1/1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '1rem',
                          ...metricStyle
                      }}>
                          <span>{metric.metric}</span>
                      </div>
                      <div className='mt-4 text-base font-bold mb-4'>
                          <span>{metric.text}</span>
                      </div>
                  </motion.div>
              )
              : (
                <motion.div
                  key='loading' 
                  className='flex flex-col items-center justify-start h-36 2xl:h-56'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * i }}
                  exit={{ opacity: 0 }}
                  layout
                >
                    <div style={{
                        height: '55%',
                        aspectRatio: '1/1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '1rem',
                        opacity: 0.5,
                        ...metricStyle
                    }}>
                      <Skeleton
                        variant='circular'
                        width='100%'
                        height='100%'
                        style={{
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderColor: '#ccc',
                          borderWidth: '5px',
                        }}
                      />
                    </div>
                    <div className='mt-4 text-lg font-bold mb-4'>
                        <span>{metric.text}</span>
                    </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
      </div>
    </motion.div>
  )
}
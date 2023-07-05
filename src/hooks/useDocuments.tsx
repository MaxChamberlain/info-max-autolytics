'use client'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { prepData } from '@/components/HomeExample/prepData'

export default function useDocuments(){
  const [ documents, setDocuments ] = useState<any>([])
  const [ adjustments, setAdjustments ] = useState<any>([])
  const [ loading, setLoading ] = useState<boolean>(true)
  
  const [ sidebarChildren, setSidebarChildren ] = useState<React.ReactNode | null>(null)
  const [ showGrossWithAdjustments, setShowGrossWithAdjustments ] = useState<boolean>(false)

  const getDocs = async () => {
    const { data: docs } = await axios.get('/api/documents')
    setDocuments(docs)
  }

  const data = useMemo(() => {
    return prepData(documents, '6/1/2023', '6/30/2023', adjustments)
  }, [documents, adjustments])

  useEffect(() => {
    getDocs()
  }, [])

  return { documents, adjustments, loading, data, sidebarChildren, setSidebarChildren, showGrossWithAdjustments, setShowGrossWithAdjustments }
}
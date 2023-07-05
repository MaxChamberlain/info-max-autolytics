import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useDocuments(){
  const [ documents, setDocuments ] = useState<any>([])
  const [ adjustments, setAdjustments ] = useState<any>([])
  const [ loading, setLoading ] = useState<boolean>(true)

  const getDocs = async () => {
    const { data: docs } = await axios.get('/api/documents')
    setDocuments(docs)
  }

  useEffect(() => {
    getDocs()
  }, [])

  return { documents, adjustments, loading }
}
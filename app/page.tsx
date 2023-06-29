'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
  
export default function Home() {
    const Editor = dynamic(() => import('../component/EditorTest'), { ssr: false })
    const [isEditorReady, setIsEditorReady] = useState(false)
    useEffect(() => {
      setIsEditorReady(true)
    }, [])
  
    

  return (
    <Editor isEditorReady={isEditorReady} />
  )
}

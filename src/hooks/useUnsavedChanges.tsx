import { useState, useEffect } from 'react'

const useUnsavedChanges = (
  initialNote: { title: string; content: string } | undefined
) => {
  const [title, setTitle] = useState(initialNote?.title || '')
  const [content, setContent] = useState(initialNote?.content || '')
  const [hasChanges, setHasChanges] = useState(false)

  // Detect changes by comparing current values with initial note values
  useEffect(() => {
    if (initialNote) {
      const isModified =
        title !== initialNote.title || content !== initialNote.content
      setHasChanges(isModified)
    }
  }, [title, content, initialNote])

  return {
    title,
    setTitle,
    content,
    setContent,
    hasChanges
  }
}

export default useUnsavedChanges

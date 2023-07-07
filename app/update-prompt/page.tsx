'use client'
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function UpdatePrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const { data: session } = useSession()
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setFetching(true)
    fetch(`/api/prompt/${promptId}`)
      .then((res) => res.json())
      .then((data) =>
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        })
      )
      .catch(console.log)
      .finally(() => setFetching(false))
  }, [promptId])

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitting(true)
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })
      if (response.ok) router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (fetching) return null

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting || !session?.user}
      handleSubmit={updatePrompt}
    />
  )
}

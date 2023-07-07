'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import { useEffect, useState } from 'react'

export default function MyProfile() {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${session?.user?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    // @ts-ignore
    if (session?.user?.id) fetchPosts()
    // @ts-ignore
  }, [session?.user?.id])

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post: Post) => {
    const hasComfirmed = confirm('Are you sure you want to delete this prompt?')
    if (!hasComfirmed) return

    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setPosts((ps) => ps.filter((p) => p._id !== post._id))
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

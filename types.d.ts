type User = {
  email: string
  username: string
  _id: string
  image: string
}

type Post = {
  _id: string
  creator: User
  prompt: string
  tag: string
  createdAt: string
  updatedAt: string
}

import { Prompt } from '@models/prompt.model'
import { User } from '@models/user.model'
import { connectToDB } from '@utils/database'

export const POST = async (req: any) => {
  const { prompt, email, tag } = await req.json()

  console.log({ prompt, email, tag })

  try {
    await connectToDB()
    const user = await User.findOne({ email })

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 400,
      })
    }

    const newPrompt = new Prompt({
      creator: user._id,
      prompt,
      tag,
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    })
  }
}

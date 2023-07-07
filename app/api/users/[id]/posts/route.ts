import { Prompt } from '@models/prompt.model'
import { connectToDB } from '@utils/database'

export const GET = async (_: any, { params }: any) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({ creator: params.id })
      .populate('creator')
      .lean()
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    })
  }
}

import { Prompt } from '@models/prompt.model'
import { connectToDB } from '@utils/database'

// GET (read)
export const GET = async (_: any, { params }: any) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator').lean()

    if (!prompt)
      return new Response(JSON.stringify({ message: 'Prompt not found' }), {
        status: 404,
      })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    })
  }
}

// PATCH (update)
export const PATCH = async (req: any, { params }: any) => {
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id).populate('creator')

    if (!existingPrompt)
      return new Response(JSON.stringify({ message: 'Prompt not found' }), {
        status: 404,
      })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    })
  }
}

// DELETE (delete)
export const DELETE = async (_: any, { params }: any) => {
  try {
    await connectToDB()
    await Prompt.findByIdAndRemove(params.id)

    return new Response(
      JSON.stringify({ message: 'Prompt deleted successfully' }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    })
  }
}

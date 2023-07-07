import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    prompt: {
      type: String,
      required: [true, 'Prompt is required'],
    },
    tag: {
      type: String,
      required: [true, 'Tag is required'],
    },
  },
  { timestamps: true }
)

// The "models" object is provided by the Mongoose Library and stores
// all the registered models.
// If a model named "Prompt" already exists in the "models" object, it
// assigns that existing model to the "Prompt" variable.
// This prevents redefining the model and ensures that the existing
// model is reused.

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export { Prompt }

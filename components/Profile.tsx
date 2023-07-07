import PromptCard from './PromptCard'

interface IProps {
  name: string
  desc: string
  data: Post[]
  handleEdit?(post: Post): void
  handleDelete?(post: Post): void
}

export default function Profile({
  name,
  data,
  desc,
  handleDelete,
  handleEdit,
}: IProps) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit?.(post)}
            handleDelete={() => handleDelete?.(post)}
          />
        ))}
      </div>
    </section>
  )
}

import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import PostForm from 'src/components/PostForm'

export const QUERY = gql`
  query FIND_POST_BY_ID($id: ID!) {
    post: Post(id: $id) {
      id
      title
      body
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: ID!, $title: String!, $body: String!) {
    UpdatePost(id: $id, title: $title, body: $body) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ post }) => {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.posts())
    },
  })

  const onSave = (input, id) => {
    updatePost({ variables: { id, title: input.title, body: input.body } })
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <header className="bg-gray-300 text-gray-700 py-3 px-4">
        <h2 className="text-sm font-semibold">Edit Post {post.id}</h2>
      </header>
      <div className="bg-gray-100 p-4">
        <PostForm post={post} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}

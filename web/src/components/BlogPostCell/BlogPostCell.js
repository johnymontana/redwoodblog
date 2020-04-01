import BlogPost from 'src/components/BlogPost'

export const QUERY = gql`
  query($id: ID!) {
    post: Post(id: $id) {
      id
      title
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ post }) => {
  return <BlogPost post={post[0]} />
}

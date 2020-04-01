import { Link, routes } from '@redwoodjs/router'
import BlogPost from 'src/components/BlogPost'
export const QUERY = gql`
  query {
    posts: Post {
      id
      title
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No blog posts found</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ posts }) => {
  return posts.map((post) => <BlogPost key={post.id} post={post} />)
}

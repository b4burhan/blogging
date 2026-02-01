import { useEffect, useState } from "react"
import { blogApi, getImageUrl } from "../services/blogApi"
import type { Category, BlogPost } from "@/types"

export default function TestApiPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await blogApi.getCategories()
        console.log("Categories:", categoriesRes)
        setCategories(categoriesRes.results || [])

        // Fetch posts
        const postsRes = await blogApi.getPosts()
        console.log("Posts:", postsRes)
        setPosts(postsRes.results || [])

        // Fetch featured posts
        const featuredRes = await blogApi.getFeaturedPosts()
        console.log("Featured Posts:", featuredRes)
        setFeaturedPosts(featuredRes.results || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Test API Page</h1>

      {/* Categories */}
      <section>
        <h2>Categories</h2>
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <strong>{cat.name}</strong>: {cat.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Posts */}
      <section>
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                {post.featured_image && (
                  <img
                    src={getImageUrl(post.featured_image)}
                    alt={post.title}
                    style={{ maxWidth: "200px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Featured Posts */}
      <section>
        <h2>Featured Posts</h2>
        {featuredPosts.length === 0 ? (
          <p>No featured posts</p>
        ) : (
          <ul>
            {featuredPosts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                {post.featured_image && (
                  <img
                    src={getImageUrl(post.featured_image)}
                    alt={post.title}
                    style={{ maxWidth: "200px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

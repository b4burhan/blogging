import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { blogPosts, getBlogPostBySlug, type Comment } from '@/context/CartContext'
import { toast } from 'sonner'

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPostBySlug(slug || '')
  
  const [comments, setComments] = useState<Comment[]>(post?.comments || [])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="bg-[#007fff] hover:bg-[#0066cc]">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    const comment: Comment = {
      id: Date.now(),
      author: authorName,
      email: authorEmail,
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: authorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    }

    setComments([comment, ...comments])
    setNewComment('')
    setAuthorName('')
    setAuthorEmail('')
    toast.success('Comment posted successfully!')
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Article Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#007fff]/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-[#007fff] hover:underline mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Link>
          
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#007fff] rounded-full flex items-center justify-center text-white font-bold">
                {post.authorAvatar}
              </div>
              <span className="font-medium text-black">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {comments.length} comments
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#5c5c5c] prose-li:text-[#5c5c5c] prose-strong:text-black"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-8">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Leave a Comment</h3>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full min-h-[120px]"
                />
              </div>
              <Button type="submit" className="bg-[#007fff] hover:bg-[#0066cc] text-white px-6 py-3 rounded-full">
                <Send className="mr-2 w-4 h-4" />
                Post Comment
              </Button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#007fff] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-black">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-[#5c5c5c]">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Badge className="mb-2">{relatedPost.category}</Badge>
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#007fff] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{relatedPost.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default BlogPostPage

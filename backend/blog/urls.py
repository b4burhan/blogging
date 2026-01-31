from django.urls import path
from . import views


urlpatterns = [
    # Categories
    path('categories/', views.CategoryListView.as_view(), name='category_list'),
    
    # Blog Posts
    path('posts/', views.BlogPostListView.as_view(), name='post_list'),
    path('posts/featured/', views.FeaturedPostListView.as_view(), name='featured_posts'),
    path('posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='post_detail'),
    path('posts/<slug:slug>/comments/', views.CommentListCreateView.as_view(), name='post_comments'),
    
    # Comments
    path('comments/', views.CommentCreateView.as_view(), name='comment_create'),
    
    # Newsletter
    path('newsletter/subscribe/', views.NewsletterSubscribeView.as_view(), name='newsletter_subscribe'),
]

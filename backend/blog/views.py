from rest_framework import generics, permissions, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Q
from .models import Category, BlogPost, Comment, NewsletterSubscriber
from .serializers import (
    CategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer,
    CommentSerializer, CommentCreateSerializer, NewsletterSubscriberSerializer
)


class CategoryListView(generics.ListAPIView):
    """View for listing all categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class BlogPostListView(generics.ListAPIView):
    """View for listing all published blog posts with filtering."""
    serializer_class = BlogPostListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['created_at', 'views']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = BlogPost.objects.filter(status='published').annotate(
            comment_count=Count('comments', filter=Q(comments__is_approved=True))
        )
        
        # Filter by category slug
        category = self.request.query_params.get('category_slug')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        return queryset.select_related('category', 'author')


class FeaturedPostListView(generics.ListAPIView):
    """View for listing featured blog posts."""
    serializer_class = BlogPostListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return BlogPost.objects.filter(
            status='published', 
            is_featured=True
        ).annotate(
            comment_count=Count('comments', filter=Q(comments__is_approved=True))
        ).select_related('category', 'author')[:6]


class BlogPostDetailView(generics.RetrieveAPIView):
    """View for retrieving a single blog post."""
    queryset = BlogPost.objects.filter(status='published')
    serializer_class = BlogPostDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CommentListCreateView(generics.ListCreateAPIView):
    """View for listing and creating comments on a blog post."""
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CommentCreateSerializer
        return CommentSerializer
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        return Comment.objects.filter(
            post__slug=slug,
            is_approved=True
        ).order_by('-created_at')
    
    def perform_create(self, serializer):
        slug = self.kwargs.get('slug')
        post = BlogPost.objects.get(slug=slug)
        serializer.save(post=post)


class CommentCreateView(generics.CreateAPIView):
    """View for creating a comment."""
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer
    permission_classes = [permissions.AllowAny]


class NewsletterSubscribeView(APIView):
    """View for newsletter subscription."""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = NewsletterSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Successfully subscribed to newsletter!'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

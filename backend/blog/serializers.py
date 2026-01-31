from rest_framework import serializers
from .models import Category, BlogPost, Comment, NewsletterSubscriber


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model."""
    post_count = serializers.IntegerField(source='posts.filter.status=published.count', read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'post_count']


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for Comment model."""
    initials = serializers.CharField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'author_name', 'content', 'created_at', 'initials']
        read_only_fields = ['created_at', 'initials']


class BlogPostListSerializer(serializers.ModelSerializer):
    """Serializer for blog post list view."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    author_avatar = serializers.CharField(source='author.initials', read_only=True)
    comment_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image',
            'category', 'category_name', 'author_name', 'author_avatar',
            'read_time', 'comment_count', 'created_at'
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Serializer for blog post detail view."""
    category = CategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    author_avatar = serializers.CharField(source='author.initials', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 'featured_image',
            'category', 'author_name', 'author_avatar', 'read_time',
            'views', 'comments', 'created_at', 'published_at'
        ]


class CommentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating comments."""
    
    class Meta:
        model = Comment
        fields = ['author_name', 'author_email', 'content']


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    """Serializer for newsletter subscription."""
    
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']
        
    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is already subscribed.')
        return value

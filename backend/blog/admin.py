from django.contrib import admin
from django.utils.html import format_html
from .models import Category, BlogPost, Comment, NewsletterSubscriber


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for Category model."""
    list_display = ['name', 'slug', 'post_count', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    
    def post_count(self, obj):
        return obj.posts.filter(status='published').count()
    post_count.short_description = 'Published Posts'


class CommentInline(admin.TabularInline):
    """Inline admin for comments on blog post."""
    model = Comment
    extra = 0
    readonly_fields = ['author_name', 'author_email', 'content', 'created_at', 'initials_display']
    fields = ['author_name', 'author_email', 'content', 'is_approved', 'created_at', 'initials_display']
    can_delete = True
    
    def initials_display(self, obj):
        return format_html(
            '<div style="width: 40px; height: 40px; border-radius: 50%; background: #007fff; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">{}</div>',
            obj.initials
        )
    initials_display.short_description = 'Avatar'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    """Admin configuration for BlogPost model."""
    list_display = [
        'id', 'title', 'category', 'author', 'status', 
        'is_featured', 'views', 'comment_count_display', 
        'created_at', 'featured_image_preview'
    ]
    list_filter = [
        'status', 'is_featured', 'category', 
        'created_at', 'published_at'
    ]
    search_fields = ['title', 'content', 'excerpt', 'author__email']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    inlines = [CommentInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'excerpt', 'content')
        }),
        ('Media', {
            'fields': ('featured_image', 'featured_image_preview'),
        }),
        ('Categorization', {
            'fields': ('category', 'author')
        }),
        ('Settings', {
            'fields': ('status', 'is_featured', 'read_time')
        }),
        ('Statistics', {
            'fields': ('views', 'published_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['views', 'published_at', 'featured_image_preview', 'created_at', 'updated_at']
    autocomplete_fields = ['author', 'category']
    
    actions = ['make_published', 'make_draft', 'make_featured', 'remove_featured']
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return format_html(
                '<img src="{}" style="max-width: 200px; max-height: 150px; border-radius: 8px;" />',
                obj.featured_image.url
            )
        return format_html('<span style="color: #999;">No image</span>')
    featured_image_preview.short_description = 'Image Preview'
    
    def comment_count_display(self, obj):
        count = obj.comment_count
        return format_html(
            '<span style="background: #007fff; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">{}</span>',
            count
        )
    comment_count_display.short_description = 'Comments'
    
    def make_published(self, request, queryset):
        from django.utils import timezone
        queryset.update(status='published', published_at=timezone.now())
    make_published.short_description = 'Mark selected posts as published'
    
    def make_draft(self, request, queryset):
        queryset.update(status='draft', published_at=None)
    make_draft.short_description = 'Mark selected posts as draft'
    
    def make_featured(self, request, queryset):
        queryset.update(is_featured=True)
    make_featured.short_description = 'Mark selected posts as featured'
    
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
    remove_featured.short_description = 'Remove featured status'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """Admin configuration for Comment model."""
    list_display = [
        'id', 'post_title', 'author_name', 'content_preview',
        'is_approved', 'created_at', 'initials_display'
    ]
    list_filter = ['is_approved', 'created_at']
    search_fields = ['author_name', 'author_email', 'content', 'post__title']
    actions = ['approve_comments', 'unapprove_comments']
    
    def post_title(self, obj):
        return obj.post.title
    post_title.short_description = 'Blog Post'
    
    def content_preview(self, obj):
        return obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
    content_preview.short_description = 'Content Preview'
    
    def initials_display(self, obj):
        return format_html(
            '<div style="width: 40px; height: 40px; border-radius: 50%; background: #007fff; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">{}</div>',
            obj.initials
        )
    initials_display.short_description = 'Avatar'
    
    def approve_comments(self, request, queryset):
        queryset.update(is_approved=True)
    approve_comments.short_description = 'Approve selected comments'
    
    def unapprove_comments(self, request, queryset):
        queryset.update(is_approved=False)
    unapprove_comments.short_description = 'Unapprove selected comments'


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    """Admin configuration for NewsletterSubscriber model."""
    list_display = ['email', 'is_active', 'subscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    actions = ['activate_subscribers', 'deactivate_subscribers']
    
    def activate_subscribers(self, request, queryset):
        queryset.update(is_active=True)
    activate_subscribers.short_description = 'Activate selected subscribers'
    
    def deactivate_subscribers(self, request, queryset):
        queryset.update(is_active=False)
    deactivate_subscribers.short_description = 'Deactivate selected subscribers'

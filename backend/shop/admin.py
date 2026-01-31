from django.contrib import admin
from django.utils.html import format_html
from .models import ProductCategory, Product, ProductImage, ProductReview


class ProductImageInline(admin.TabularInline):
    """Inline admin for product images."""
    model = ProductImage
    extra = 1
    fields = ['image', 'alt_text', 'order', 'image_preview']
    readonly_fields = ['image_preview']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px; border-radius: 4px;" />',
                obj.image.url
            )
        return format_html('<span style="color: #999;">No image</span>')
    image_preview.short_description = 'Preview'


class ProductReviewInline(admin.TabularInline):
    """Inline admin for product reviews."""
    model = ProductReview
    extra = 0
    readonly_fields = ['author_name', 'rating', 'title', 'content', 'created_at', 'initials_display']
    fields = ['author_name', 'rating', 'title', 'content', 'is_approved', 'created_at', 'initials_display']
    
    def initials_display(self, obj):
        return format_html(
            '<div style="width: 40px; height: 40px; border-radius: 50%; background: #007fff; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">{}</div>',
            obj.initials
        )
    initials_display.short_description = 'Avatar'


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    """Admin configuration for ProductCategory model."""
    list_display = ['name', 'slug', 'product_count', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    
    def product_count(self, obj):
        return obj.products.filter(status='active').count()
    product_count.short_description = 'Active Products'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Admin configuration for Product model."""
    list_display = [
        'id', 'name', 'category', 'price', 'stock_quantity',
        'status', 'is_featured', 'average_rating_display',
        'review_count_display', 'created_at', 'image_preview'
    ]
    list_filter = [
        'status', 'is_featured', 'category', 
        'created_at'
    ]
    search_fields = ['name', 'description', 'short_description', 'sku']
    prepopulated_fields = {'slug': ('name',)}
    date_hierarchy = 'created_at'
    inlines = [ProductImageInline, ProductReviewInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'sku', 'description', 'short_description')
        }),
        ('Pricing', {
            'fields': ('price', 'compare_price'),
        }),
        ('Categorization', {
            'fields': ('category',)
        }),
        ('Media', {
            'fields': ('image', 'image_preview'),
        }),
        ('Inventory', {
            'fields': ('stock_quantity', 'weight')
        }),
        ('Settings', {
            'fields': ('status', 'is_featured')
        }),
    )
    
    readonly_fields = ['image_preview', 'created_at', 'updated_at']
    autocomplete_fields = ['category']
    
    actions = ['make_active', 'make_inactive', 'make_featured', 'remove_featured']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 200px; max-height: 150px; border-radius: 8px;" />',
                obj.image.url
            )
        return format_html('<span style="color: #999;">No image</span>')
    image_preview.short_description = 'Image Preview'
    
    def average_rating_display(self, obj):
        rating = obj.average_rating
        if rating > 0:
            stars = '★' * int(rating) + '☆' * (5 - int(rating))
            return format_html('<span style="color: #ffc107;">{}</span> {}', stars, rating)
        return format_html('<span style="color: #999;">No reviews</span>')
    average_rating_display.short_description = 'Rating'
    
    def review_count_display(self, obj):
        count = obj.review_count
        return format_html(
            '<span style="background: #007fff; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">{}</span>',
            count
        )
    review_count_display.short_description = 'Reviews'
    
    def make_active(self, request, queryset):
        queryset.update(status='active')
    make_active.short_description = 'Mark selected products as active'
    
    def make_inactive(self, request, queryset):
        queryset.update(status='inactive')
    make_inactive.short_description = 'Mark selected products as inactive'
    
    def make_featured(self, request, queryset):
        queryset.update(is_featured=True)
    make_featured.short_description = 'Mark selected products as featured'
    
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
    remove_featured.short_description = 'Remove featured status'


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    """Admin configuration for ProductReview model."""
    list_display = [
        'id', 'product_name', 'author_name', 'rating_display',
        'title', 'is_approved', 'created_at', 'initials_display'
    ]
    list_filter = ['is_approved', 'rating', 'created_at']
    search_fields = ['author_name', 'title', 'content', 'product__name']
    actions = ['approve_reviews', 'unapprove_reviews']
    
    def product_name(self, obj):
        return obj.product.name
    product_name.short_description = 'Product'
    
    def rating_display(self, obj):
        stars = '★' * obj.rating + '☆' * (5 - obj.rating)
        return format_html('<span style="color: #ffc107;">{}</span>', stars)
    rating_display.short_description = 'Rating'
    
    def initials_display(self, obj):
        return format_html(
            '<div style="width: 40px; height: 40px; border-radius: 50%; background: #007fff; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">{}</div>',
            obj.initials
        )
    initials_display.short_description = 'Avatar'
    
    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)
    approve_reviews.short_description = 'Approve selected reviews'
    
    def unapprove_reviews(self, request, queryset):
        queryset.update(is_approved=False)
    unapprove_reviews.short_description = 'Unapprove selected reviews'

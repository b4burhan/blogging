from rest_framework import serializers
from .models import ProductCategory, Product, ProductReview


class ProductCategorySerializer(serializers.ModelSerializer):
    """Serializer for ProductCategory model."""
    product_count = serializers.IntegerField(source='products.filter.status=active.count', read_only=True)
    
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'slug', 'description', 'image', 'product_count']


class ProductReviewSerializer(serializers.ModelSerializer):
    """Serializer for ProductReview model."""
    initials = serializers.CharField(read_only=True)
    
    class Meta:
        model = ProductReview
        fields = ['id', 'author_name', 'rating', 'title', 'content', 'created_at', 'initials']
        read_only_fields = ['created_at', 'initials']


class ProductListSerializer(serializers.ModelSerializer):
    """Serializer for product list view."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    review_count = serializers.IntegerField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'short_description', 'price', 'compare_price',
            'discount_percentage', 'category', 'category_name', 'image',
            'in_stock', 'average_rating', 'review_count', 'is_featured'
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Serializer for product detail view."""
    category = ProductCategorySerializer(read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    review_count = serializers.IntegerField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)
    images = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'short_description',
            'price', 'compare_price', 'discount_percentage',
            'category', 'image', 'images', 'sku', 'weight',
            'in_stock', 'stock_quantity', 'average_rating', 'review_count',
            'reviews', 'created_at'
        ]
    
    def get_images(self, obj):
        """Return additional product images."""
        images = obj.images.all()
        return [{'url': img.image.url, 'alt': img.alt_text} for img in images]


class ProductReviewCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating product reviews."""
    
    class Meta:
        model = ProductReview
        fields = ['author_name', 'rating', 'title', 'content']

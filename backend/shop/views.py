from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg, Count, Q
from .models import ProductCategory, Product, ProductReview
from .serializers import (
    ProductCategorySerializer, ProductListSerializer, ProductDetailSerializer,
    ProductReviewSerializer, ProductReviewCreateSerializer
)


class ProductCategoryListView(generics.ListAPIView):
    """View for listing all product categories."""
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductListView(generics.ListAPIView):
    """View for listing all active products with filtering."""
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['name', 'description', 'short_description']
    ordering_fields = ['price', 'created_at', 'average_rating']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Product.objects.filter(status='active').annotate(
            average_rating=Avg('reviews__rating', filter=Q(reviews__is_approved=True)),
            review_count=Count('reviews', filter=Q(reviews__is_approved=True))
        )
        
        # Filter by category slug
        category = self.request.query_params.get('category_slug')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by in stock
        in_stock = self.request.query_params.get('in_stock')
        if in_stock == 'true':
            queryset = queryset.filter(stock_quantity__gt=0)
        
        return queryset.select_related('category')


class FeaturedProductListView(generics.ListAPIView):
    """View for listing featured products."""
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return Product.objects.filter(
            status='active',
            is_featured=True
        ).annotate(
            average_rating=Avg('reviews__rating', filter=Q(reviews__is_approved=True)),
            review_count=Count('reviews', filter=Q(reviews__is_approved=True))
        ).select_related('category')[:8]


class ProductDetailView(generics.RetrieveAPIView):
    """View for retrieving a single product."""
    queryset = Product.objects.filter(status='active')
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class ProductReviewListCreateView(generics.ListCreateAPIView):
    """View for listing and creating reviews on a product."""
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductReviewCreateSerializer
        return ProductReviewSerializer
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        return ProductReview.objects.filter(
            product__slug=slug,
            is_approved=True
        ).order_by('-created_at')
    
    def perform_create(self, serializer):
        slug = self.kwargs.get('slug')
        product = Product.objects.get(slug=slug)
        serializer.save(product=product)


class ProductReviewCreateView(generics.CreateAPIView):
    """View for creating a product review."""
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewCreateSerializer
    permission_classes = [permissions.AllowAny]

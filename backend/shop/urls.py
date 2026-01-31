from django.urls import path
from . import views


urlpatterns = [
    # Categories
    path('categories/', views.ProductCategoryListView.as_view(), name='product_category_list'),
    
    # Products
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/featured/', views.FeaturedProductListView.as_view(), name='featured_products'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('products/<slug:slug>/reviews/', views.ProductReviewListCreateView.as_view(), name='product_reviews'),
    
    # Reviews
    path('reviews/', views.ProductReviewCreateView.as_view(), name='review_create'),
]

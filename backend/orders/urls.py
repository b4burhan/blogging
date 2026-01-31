from django.urls import path
from . import views


urlpatterns = [
    path('create/', views.OrderCreateView.as_view(), name='order_create'),
    path('my-orders/', views.UserOrderListView.as_view(), name='user_orders'),
    path('<str:order_number>/', views.OrderDetailView.as_view(), name='order_detail'),
]

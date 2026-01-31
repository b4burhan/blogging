from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer, CheckoutSerializer


class OrderCreateView(APIView):
    """View for creating orders from checkout."""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        # Validate checkout data
        checkout_serializer = CheckoutSerializer(data=request.data)
        checkout_serializer.is_valid(raise_exception=True)
        
        data = checkout_serializer.validated_data
        
        # Calculate totals
        items = data['items']
        subtotal = sum(float(item['price']) * int(item['quantity']) for item in items)
        shipping_cost = 0 if subtotal > 50 else 10
        tax = round(subtotal * 0.08, 2)
        total = round(subtotal + shipping_cost + tax, 2)
        
        # Create order
        order_data = {
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'email': data['email'],
            'phone': data['phone'],
            'address': data['address'],
            'city': data['city'],
            'state': data['state'],
            'zip_code': data['zip_code'],
            'country': data['country'],
            'subtotal': subtotal,
            'shipping_cost': shipping_cost,
            'tax': tax,
            'total': total,
            'payment_method': 'credit_card',
            'payment_status': 'paid',
            'status': 'processing',
            'items': items
        }
        
        # Add user if authenticated
        if request.user.is_authenticated:
            order_data['user'] = request.user
        
        order_serializer = OrderCreateSerializer(data=order_data)
        order_serializer.is_valid(raise_exception=True)
        order = order_serializer.save()
        
        return Response({
            'order': OrderSerializer(order).data,
            'message': 'Order placed successfully!'
        }, status=status.HTTP_201_CREATED)


class UserOrderListView(generics.ListAPIView):
    """View for listing user's orders."""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')


class OrderDetailView(generics.RetrieveAPIView):
    """View for retrieving order details."""
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'order_number'

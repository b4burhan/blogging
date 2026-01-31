from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem model."""
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'product_sku', 'product_image', 'price', 'quantity', 'total']


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order model."""
    items = OrderItemSerializer(many=True, read_only=True)
    item_count = serializers.IntegerField(read_only=True)
    full_name = serializers.CharField(read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'full_name', 'email', 'phone',
            'address', 'city', 'state', 'zip_code', 'country',
            'status', 'payment_status', 'subtotal', 'shipping_cost',
            'tax', 'discount', 'total', 'items', 'item_count',
            'created_at', 'shipped_at', 'delivered_at'
        ]
        read_only_fields = ['order_number', 'created_at', 'shipped_at', 'delivered_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating orders."""
    items = serializers.ListField(
        child=serializers.DictField(),
        write_only=True
    )
    
    class Meta:
        model = Order
        fields = [
            'first_name', 'last_name', 'email', 'phone',
            'address', 'city', 'state', 'zip_code', 'country',
            'items', 'subtotal', 'shipping_cost', 'tax', 'total'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item_data.get('product_id'),
                product_name=item_data.get('product_name'),
                product_sku=item_data.get('product_sku'),
                product_image=item_data.get('product_image', ''),
                price=item_data.get('price'),
                quantity=item_data.get('quantity')
            )
        
        return order


class CheckoutSerializer(serializers.Serializer):
    """Serializer for checkout data."""
    # Shipping info
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    zip_code = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=100, default='US')
    
    # Payment info
    card_number = serializers.CharField(max_length=20, write_only=True)
    card_name = serializers.CharField(max_length=100, write_only=True)
    expiry = serializers.CharField(max_length=10, write_only=True)
    cvv = serializers.CharField(max_length=4, write_only=True)
    
    # Order items
    items = serializers.ListField(
        child=serializers.DictField()
    )

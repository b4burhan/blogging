from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    """Inline admin for order items."""
    model = OrderItem
    extra = 0
    readonly_fields = ['total']
    fields = ['product', 'product_name', 'price', 'quantity', 'total']
    autocomplete_fields = ['product']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Admin configuration for Order model."""
    list_display = [
        'order_number', 'full_name', 'email', 'status_badge',
        'payment_status_badge', 'total_display', 'item_count',
        'created_at'
    ]
    list_filter = [
        'status', 'payment_status', 'created_at',
        'shipping_cost'
    ]
    search_fields = [
        'order_number', 'email', 'first_name', 'last_name',
        'phone', 'transaction_id'
    ]
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'user', 'status', 'payment_status')
        }),
        ('Customer Information', {
            'fields': ('first_name', 'last_name', 'email', 'phone')
        }),
        ('Shipping Address', {
            'fields': ('address', 'city', 'state', 'zip_code', 'country')
        }),
        ('Pricing', {
            'fields': ('subtotal', 'shipping_cost', 'tax', 'discount', 'total')
        }),
        ('Payment', {
            'fields': ('payment_method', 'transaction_id')
        }),
        ('Notes', {
            'fields': ('customer_note', 'admin_note')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'shipped_at', 'delivered_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = [
        'order_number', 'created_at', 'updated_at',
        'shipped_at', 'delivered_at'
    ]
    
    actions = [
        'mark_as_processing', 'mark_as_shipped', 'mark_as_delivered',
        'mark_as_cancelled', 'mark_as_paid'
    ]
    
    def status_badge(self, obj):
        colors = {
            'pending': '#ffc107',
            'processing': '#17a2b8',
            'shipped': '#007bff',
            'delivered': '#28a745',
            'cancelled': '#dc3545',
            'refunded': '#6c757d',
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">{}</span>',
            colors.get(obj.status, '#6c757d'),
            obj.status
        )
    status_badge.short_description = 'Status'
    
    def payment_status_badge(self, obj):
        colors = {
            'pending': '#ffc107',
            'paid': '#28a745',
            'failed': '#dc3545',
            'refunded': '#6c757d',
        }
        return format_html(
            '<span style="background: {}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">{}</span>',
            colors.get(obj.payment_status, '#6c757d'),
            obj.payment_status
        )
    payment_status_badge.short_description = 'Payment'
    
    def total_display(self, obj):
        return format_html('<strong>${}</strong>', obj.total)
    total_display.short_description = 'Total'
    
    def mark_as_processing(self, request, queryset):
        queryset.update(status='processing')
    mark_as_processing.short_description = 'Mark selected orders as processing'
    
    def mark_as_shipped(self, request, queryset):
        from django.utils import timezone
        queryset.update(status='shipped', shipped_at=timezone.now())
    mark_as_shipped.short_description = 'Mark selected orders as shipped'
    
    def mark_as_delivered(self, request, queryset):
        from django.utils import timezone
        queryset.update(status='delivered', delivered_at=timezone.now())
    mark_as_delivered.short_description = 'Mark selected orders as delivered'
    
    def mark_as_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
    mark_as_cancelled.short_description = 'Mark selected orders as cancelled'
    
    def mark_as_paid(self, request, queryset):
        queryset.update(payment_status='paid')
    mark_as_paid.short_description = 'Mark selected orders as paid'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """Admin configuration for OrderItem model."""
    list_display = ['id', 'order', 'product_name', 'price', 'quantity', 'total']
    search_fields = ['product_name', 'order__order_number']

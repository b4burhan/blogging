from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom User Admin with enhanced features."""
    
    list_display = [
        'id', 'email', 'full_name', 'phone', 'is_staff', 
        'is_newsletter_subscribed', 'created_at', 'avatar_preview'
    ]
    list_filter = [
        'is_staff', 'is_superuser', 'is_active', 
        'is_newsletter_subscribed', 'created_at'
    ]
    search_fields = ['email', 'first_name', 'last_name', 'phone', 'username']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'email', 'phone', 'avatar', 'bio')
        }),
        ('Address', {
            'fields': ('address', 'city', 'state', 'zip_code', 'country'),
            'classes': ('collapse',)
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',)
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined')
        }),
        ('Preferences', {
            'fields': ('is_newsletter_subscribed',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    
    readonly_fields = ['last_login', 'date_joined', 'avatar_preview']
    
    def full_name(self, obj):
        return obj.full_name
    full_name.short_description = 'Full Name'
    
    def avatar_preview(self, obj):
        if obj.avatar:
            return f'<img src="{obj.avatar.url}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" />'
        return f'<div style="width: 50px; height: 50px; border-radius: 50%; background: #007fff; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">{obj.initials}</div>'
    avatar_preview.short_description = 'Avatar'
    avatar_preview.allow_tags = True

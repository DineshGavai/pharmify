# from django.contrib import admin
# from .models import Owner

# # Register your models here.
# admin.site.register(Owner)


from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Owner

class OwnerAdmin(UserAdmin):
    model = Owner
    list_display = ('email', 'name', 'shop_name', 'phone_number', 'is_staff', 'is_active')
    list_filter = ('email', 'name', 'shop_name', 'phone_number', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'shop_name', 'phone_number', 'avatar', 'license', 'account_date_created')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(Owner, OwnerAdmin)

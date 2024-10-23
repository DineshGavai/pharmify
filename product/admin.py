from django.contrib import admin
from .models import Product, Seller, SoldItem

# Register your models here.

admin.site.register(Product)
admin.site.register(Seller)
admin.site.register(SoldItem)

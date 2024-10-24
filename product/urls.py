from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static


urlpatterns = [
    path('stock/new', stock_new, name='stock-new'),
    path('stock/add-seller', add_seller, name='add-seller'),
    path("stock/summary", add_stock_summary, name="stock-summary"),
    path("stock/inventory", stock_inventory, name="stock-inventory"),
    path("stock/inventory/api",stock_inventory_api,name="stock-inventory-api"),
]

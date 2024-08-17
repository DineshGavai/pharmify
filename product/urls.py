from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static


urlpatterns = [
    path('stock/new', add_stock, name='stock-new'),
    path('stock/add-seller', add_seller, name='add-seller'),
    path("stock/summary", add_stock_summary, name="stock-summary"),
]

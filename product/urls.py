from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static


urlpatterns = [
    path('stock/new', add_stock, name='stock-new'),
    path('stock/save', saved_stock, name='stock-save'),
    path('stock/add-seller', add_seller, name='add-seller'),

]

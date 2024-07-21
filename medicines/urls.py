from django.urls import path
from .views import *


urlpatterns=[
    path('add-stock/',add_stock, name='add-stock')
]
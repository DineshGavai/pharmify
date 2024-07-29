from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static



urlpatterns = [
    path('add-stock',add_stock,name='add-stock'),

]


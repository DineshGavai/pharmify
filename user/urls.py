from django.urls import path
from .views import *

urlpatterns=[
    path('login/',loginUser,name="login"),
    path('logout/',logoutUser,name="logout"),
    path('verify-email/',verifyEmail,name="verifyEmail"),
    path('verify/',verify,name="verify"),
    path('register/',registerUser,name="register"),
    path('signup/',signup,name="signup"),
]
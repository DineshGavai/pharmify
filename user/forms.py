from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Owner

class RegistrationForm(UserCreationForm):
    class Meta:
        model = Owner
        fields = ['first_name', 'last_name', 'email', 'shop_name', 'phone_number', 'password1', 'password2']

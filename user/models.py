from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import OwnerManager

class Owner(AbstractUser):
    username = None
    owner_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    shop_name = models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    avatar = models.URLField( blank=True, null=True)
    license = models.URLField( blank=True, null=True)
    account_date_created = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]
    
    
    def __str__(self):
        return self.email
    
    objects = OwnerManager()

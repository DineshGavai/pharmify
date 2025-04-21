from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import OwnerManager

class Owner(AbstractUser):
    username = None
    owner_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    business_name = models.CharField(max_length=255)
    business_address = models.CharField(max_length=255,blank=True, null=True)   
    email=models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10)
    avatar = models.ImageField(blank=True, null=True,default='assets/illus/default-avatar.png')
    license = models.ImageField( blank=True, null=True,default="assets/illus/default-file-image.png")
    account_date_created = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]
    
    
    def __str__(self):
        return self.email
    
    objects = OwnerManager()

    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'business_name':self.business_name,
            'phone_number':self.phone_number,
            'owner_id':self.owner_id,

        }

    class Meta:
        indexes=[models.Index(fields=['email'])]
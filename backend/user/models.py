from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import OwnerManager

class Owner(AbstractUser):
<<<<<<< HEAD
    username = None
=======
    # username = None
>>>>>>> 4d4840667f178da5011fcb0999f229ac8d2ade38
    owner_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    shop_name = models.CharField(max_length=255)
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

<<<<<<< HEAD
=======
    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'shop_name':self.shop_name,
            'phone_number':self.phone_number,
            'owner_id':self.owner_id,

        }

>>>>>>> 4d4840667f178da5011fcb0999f229ac8d2ade38
    class Meta:
        indexes=[models.Index(fields=['email'])]
from django.db import models
from user.models import Owner

# Create your models here.
class Seller(models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=200)
    phone_number=models.CharField(max_length=10)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    owner_id = models.ForeignKey(Owner, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    brand_name = models.CharField(max_length=200)
    product_type = models.CharField(max_length=20)
    manufacture_date = models.DateField()
    expiry_date = models.DateField()
    available_quantity = models.IntegerField()
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    wholesale_price = models.DecimalField(max_digits=10, decimal_places=2)
    seller=models.ForeignKey(Seller,on_delete=models.CASCADE)
     
    def __str__(self):
        return self.name
    


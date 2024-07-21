from django.db import models
from user.models import Owner

# Create your models here.


class Medicines(models.Model):
    medicine_id=models.AutoField(primary_key=True)
    owner=models.ForeignKey(Owner,on_delete=models.CASCADE,related_name="medicines")
    seller_name=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    manufacture_date=models.DateField()
    expiry_date=models.DateField()
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
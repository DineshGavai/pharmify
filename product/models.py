from django.db import models
from user.models import Owner
from django.utils import timezone


# Create your models here.
class Seller(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    owner_id = models.ForeignKey(Owner, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=200)
    product_type = models.CharField(max_length=200)
    manufacture_date = models.DateField()
    expiry_date = models.DateField()
    available_quantity = models.IntegerField()
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    wholesale_price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    product_added_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class SoldItem(models.Model):
    sold_item_id = models.AutoField(primary_key=True)
    # name of patient
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="sold_items"
    )
    quantity_sold = models.IntegerField()
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.quantity_sold} x {self.product.name} sold on {self.sale_date.strftime('%Y-%m-%d')}"

    def deduct_product_quantity(self):
        self.product.available_quantity -= self.quantity_sold

        if self.product.available_quantity < 0:
            raise ValueError("Insufficient stock available for this sale.")

        self.product.save()

    def save(self, *args, **kwargs):
        if not self.pk:  # If it's a new sale (not an update)
            self.deduct_product_quantity()

        # Call the original save method to save the SoldItem instance
        super().save(*args, **kwargs)

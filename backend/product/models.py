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
    class Meta:
        indexes=[models.Index(fields=['name'])] #indexing for faster access these fields

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
    
    class Meta:
        indexes=[models.Index(fields=["name","brand"])] #indexing for faster access these fields


class SoldItem(models.Model):
    sold_item_id = models.AutoField(primary_key=True)
    # name of patient
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="sold_items"
    )
    quantity_sold = models.IntegerField()
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    sell_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.quantity_sold} x {self.product.name} sold on {self.sell_date.strftime('%Y-%m-%d')}"

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

    class Meta:
        indexes=[models.Index(fields=["sell_date"])]


# Customer Table
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=100)    
    customer_phone=models.CharField(max_length=10,null=True,blank=True)
    customer_age = models.CharField(max_length=3,null=True,blank=True)   
    customer_gender = models.CharField(max_length=6,null=True,blank=True)
    customer_doctor = models.CharField(max_length=100,null=True,blank=True)
    owner_id = models.ForeignKey(Owner, on_delete=models.CASCADE)


    def __str__(self):
        return self.customer_name
    


class Bill(models.Model):
    bill_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)  # If a bill is associated with a customer
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    bill_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Bill #{self.bill_id} - {self.bill_date.strftime('%Y-%m-%d')}"

    def calculate_total(self):
        # Automatically calculates the total based on related BillingItems
        total = sum(item.amount for item in self.billing_items.all())
        self.total_amount = total
        self.save()


class BillingItem(models.Model):
    billing_item_id = models.AutoField(primary_key=True)
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name="billing_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    expiry_date = models.DateField()
    quantity = models.IntegerField()
    rate = models.DecimalField(max_digits=10, decimal_places=2) 
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    def save(self, *args, **kwargs):
        # Automatically calculate amount before saving
        self.amount = self.rate * self.quantity
        super().save(*args, **kwargs)


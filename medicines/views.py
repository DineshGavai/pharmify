from django.shortcuts import render,redirect
from django.contrib import messages
from .models import Medicines
from user.models import Owner
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def add_stock(request):
    if request.method == 'POST':
        seller_names = request.POST.getlist('seller_name[]')
        names = request.POST.getlist('name[]')
        manufacture_dates = request.POST.getlist('manufacture_date[]')
        expiry_dates = request.POST.getlist('expiry_date[]')
        quantities = request.POST.getlist('quantity[]')
        prices = request.POST.getlist('price[]')

        owner = Owner.objects.get(email=request.user.email)
        print(names)
        for i in range(len(names)):
            Medicines.objects.create(
                email=owner,
                seller_name=seller_names[i],
                name=names[i],
                manufacture_date=manufacture_dates[i],
                expiry_date=expiry_dates[i],
                quantity=quantities[i],
                price=prices[i]
            )
    print(request.user)
    return render(request,"add_stock.html")

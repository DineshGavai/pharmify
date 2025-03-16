from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from ..models import *
from django.contrib.auth.decorators import login_required


@login_required
def new_bill(request):
    return render(request,"bills/new-bill.html" )



def bill_summary(request):
    
    return render(request,"bills/bill-summary.html")



def bill_data_api(request):
    customers = Customer.objects.filter(owner_id=request.user).order_by('customer_name')
    customers_list = {
        "customers": [
            {
                "id": customer.customer_id,
                "name": customer.customer_name,
                "age": customer.customer_age,
                "phone": customer.customer_phone,
                "gender":customer.customer_gender,
                "doctor_name": customer.customer_doctor,
            }
            for customer in customers
        ]
    }


    # GET method For Products
    products = Product.objects.filter(owner_id=request.user).order_by('name')
    product_list={
        "products":[
            {
                "name":product.name,
                "type":product.product_type,
                "expiry":product.expiry_date,
                "available_quantity":product.available_quantity,
                "rate":product.selling_price

            }
            for product in products
        ]
    }

    context={
        "customer_list":customers_list,
        "product_list":product_list
    }
    return JsonResponse(context)

def bill_history(request):
    return render(request,"bills/bill-history.py")
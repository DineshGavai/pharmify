from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product,Seller


def stock_new(request):
    sellers=list(Seller.objects.values_list("name",flat=True))
    sellers.reverse()
    context = {
        "currentPage": "stock-new",
        "sellers":sellers
    }
    return render(request,'stock/new.html',context)

def saved_stock(request):
    context = {
        "currentPage": "stock-new"
    }
    return render(request,"stock/save.html",context)

@csrf_exempt
def add_seller(request):
    if request.method=="POST":
        seller_name=request.POST.get('new_seller_name')
        seller_number=request.POST.get('new_seller_phone')
        exists_seller = list(Seller.objects.values_list("name", flat=True))
        if(seller_name  in exists_seller):
            return HttpResponse("Seller Already Present")
        else:
            seller=Seller.objects.create(
                name=seller_name,
                phone_number=seller_number
            )
            return HttpResponse("Seller Added Successfully")




@csrf_exempt
def add_stock_summary(request):
    if request.method == 'POST':
        data_str = request.body.decode("utf-8")

        try:
            product_data = json.loads(data_str)
            product_names = list(Product.objects.values_list('name', flat=True))
            
            for product_group in product_data['newProductJSON']:
                for product in product_group:
                    print(product)
                    name = product.get('name')
                    expiry_date = product.get('dateExpiry')
                    brand_name = product.get('brand')
                    product_type=product.get('type')
                    manufcature_date = product.get('dateManufacture')
                    isNew = product.get('isNew')
                    selling_price = product.get('priceSelling')
                    wholesale_price = product.get('priceWholesale')
                    quantity = product.get('quantity')
                    seller_name = product.get('sellerName')
                    seller=Seller.objects.get(name=seller_name)
                    owner=request.user
                       
                    product = Product.objects.create(
                        owner_id=owner,
                        name=name,
                        brand_name=brand_name,
                        product_type=product_type,
                        manufacture_date=manufcature_date,
                        expiry_date=expiry_date,
                        available_quantity=quantity,
                        selling_price=selling_price,
                        wholesale_price=wholesale_price,
                        seller=seller
                    )
                    
                
            return JsonResponse({"redirect_url": "/stock/new"})
        except json.JSONDecodeError as e:
            return HttpResponse(f"Invalid JSON data: {e}")
    else:
         print("Data not received")
    
    
    return render(request, "stock/summary.html")

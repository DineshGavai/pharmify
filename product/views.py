from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Product,Seller
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Sum



def stock_new(request):
    sellers=list(Seller.objects.values_list("name",flat=True))
    products=list(Product.objects.values_list("name",flat=True))
    brands=set(Product.objects.values_list("brand",flat=True))
    sellers.reverse()
    context = {
        "currentPage": "stock-new",
        "sellers":sellers,
        "products":products,
        "brands":brands
    }
    return render(request,'stock/new.html',context)



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
            
            for product_group in product_data['newProductJSON']:
                for product in product_group:
                    print(product)
                    name = product.get('name')
                    expiry_date = product.get('dateExpiry')
                    brand = product.get('brand')
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
                        brand=brand,
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
    
    
    
    
    context = {
        "currentPage": "stock-new"
    }
    return render(request,"stock/summary.html",context)


def stock_inventory(request):
    products=Product.objects.all()
    product_quantities = Product.objects.values('name').annotate(total_quantity=Sum('available_quantity'))
    product_quantity_dict = {item['name']: item['total_quantity'] for item in product_quantities}

    inventory_data={
        "inventoryData":{
            "name": [product.name for product in products],
            "brand": [product.brand for product in products],
            "type": [product.product_type for product in products],
            "dateManufacture": [product.manufacture_date for product in products],
            "dateAdded": [product.product_added_date for product in products],
            "dateExpiry": [product.expiry_date for product in products],
            "priceWholesale": [product.wholesale_price for product in products],
            "priceSelling": [product.selling_price for product in products],
            "Quantity Available": [product.available_quantity for product in products],
        }
            
    }
    json_data = json.dumps(inventory_data, cls=DjangoJSONEncoder)

    
    context = {
        "currentPage": "stock-inventory",
        "inventory_data":json_data  
        
    }
    return render(request, "stock/inventory.html", context)
from django.shortcuts import render
import json
# Create your views here.

def add_stock(request):
    context={
        "currentPage":"stock-new"
    }
    
    if request.method == 'POST':
        data = json.loads(request.body)
        products = data.get('products', [])
        print(products)
        # Process the products data as needed
        # for product in products:
        #     # Example: Save each product to the database
        #     Product.objects.create(
        #         name=product['name'],
        #         quantity=product['quantity'],
        #         price=product['price']
        #     )

    return render(request,"stock/new.html",context) 
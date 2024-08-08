from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from django.shortcuts import render
from urllib.parse import parse_qs

def add_stock(request):
    if request.method == 'POST':
        if not request.body:
            return HttpResponseBadRequest("Request body is empty")

        # Parse the URL-encoded form data
        form_data = parse_qs(request.body.decode('utf-8'))
        
        print(type(form_data))
        
        brand = form_data.get('product_brand_1', [None])[0]
        date_expiry = form_data.get('product_date_expiry_1', [None])[0]
        date_manufacture = form_data.get('product_date_manufacture_1', [None])[0]
        is_new = False  # This field isn't in the form data, so set it to a default value
        is_new=form_data.get("is product new",[None])[0]
        name = form_data.get('product_name_1', [None])[0]
        price_selling = form_data.get('product_selling_price_1', [None])[0]
        price_wholesale = form_data.get('product_wholesale_price_1', [None])[0]
        quantity = form_data.get('product_quantity_1', [None])[0]
        seller_name = form_data.get('product_seller_1', [None])[0]
        product_type = form_data.get('product_type_1', [None])[0]

        print("Received Product Data:", {
            "brand": brand,
            "date_expiry": date_expiry,
            "date_manufacture": date_manufacture,
            "is_new": is_new,
            "name": name,
            "price_selling": price_selling,
            "price_wholesale": price_wholesale,
            "quantity": quantity,
            "seller_name": seller_name,
            "product_type": product_type,
        })

        # Return a success response
        return JsonResponse({"status": "success", "message": "Product added successfully"})

    context = {
        "currentPage": "stock-new"
    }
    return render(request, "stock/new.html", context)

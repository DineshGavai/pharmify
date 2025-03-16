from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from ..models import *
import json
from django.contrib.auth.decorators import login_required

@login_required
def stock_new(request):
    sellers = list(Seller.objects.values_list("name", flat=True))
    products = set(Product.objects.values_list("name", flat=True))
    brands = set(Product.objects.values_list("brand", flat=True))
    sellers.reverse()
    context = {
        "currentPage": "stock-new",
        "sellers": sellers,
        "products": products,
        "brands": brands,
    }
    return render(request, "stock/new.html", context)


@login_required
@csrf_exempt
def add_seller(request):
    if request.method == "POST":
        seller_name = request.POST.get("new_seller_name")
        seller_number = request.POST.get("new_seller_phone")
        exists_seller = list(Seller.objects.values_list("name", flat=True))
        if seller_name in exists_seller:
            return HttpResponse("Seller Already Present")
        else:
            seller = Seller.objects.create(
                name=seller_name, phone_number=seller_number)
            return HttpResponse("Seller Added Successfully")


@login_required
@csrf_exempt
def add_stock_summary(request):
    if request.method == "POST":
        data_str = request.body.decode("utf-8")

        try:
            product_data = json.loads(data_str)

            for product_group in product_data["newProductJSON"]:
                for product in product_group:
                    name = product.get("name")
                    expiry_date = product.get("dateExpiry")
                    brand = product.get("brand")
                    product_type = product.get("type")
                    manufacture_date = product.get("dateManufacture")
                    isNew = product.get("isNew")
                    selling_price = product.get("priceSelling")
                    wholesale_price = product.get("priceWholesale")
                    quantity = int(product.get("quantity", 0))
                    seller_name = product.get("sellerName")
                    seller = Seller.objects.get(name=seller_name)
                    owner = request.user

                    existing_product = Product.objects.filter(
                        owner_id=owner,
                        name=name,
                        brand=brand,
                        product_type=product_type,
                        manufacture_date=manufacture_date,
                        expiry_date=expiry_date,
                        selling_price=selling_price,
                        wholesale_price=wholesale_price,
                        seller=seller,
                    ).first()

                    if existing_product:
                        # If the product exists, update the quantity
                        existing_product.available_quantity += quantity
                        existing_product.save()
                    else:
                        # If the product doesn't exist, create a new product
                        Product.objects.create(
                            owner_id=owner,
                            name=name,
                            brand=brand,
                            product_type=product_type,
                            manufacture_date=manufacture_date,
                            expiry_date=expiry_date,
                            available_quantity=quantity,
                            selling_price=selling_price,
                            wholesale_price=wholesale_price,
                            seller=seller,
                        )

            return JsonResponse({"redirect_url": "/stock/inventory"})
        except json.JSONDecodeError as e:
            return HttpResponse(f"Invalid JSON data: {e}")

    context = {"currentPage": "stock-new"}
    return render(request, "stock/summary.html", context)
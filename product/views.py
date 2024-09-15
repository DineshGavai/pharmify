from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Sum, F, ExpressionWrapper, DecimalField, Avg, Count
from datetime import timedelta
from django.utils import timezone


def stock_new(request):
    sellers = list(Seller.objects.values_list("name", flat=True))
    products = list(Product.objects.values_list("name", flat=True))
    brands = set(Product.objects.values_list("brand", flat=True))
    sellers.reverse()
    context = {
        "currentPage": "stock-new",
        "sellers": sellers,
        "products": products,
        "brands": brands,
    }
    return render(request, "stock/new.html", context)


@csrf_exempt
def add_seller(request):
    if request.method == "POST":
        seller_name = request.POST.get("new_seller_name")
        seller_number = request.POST.get("new_seller_phone")
        exists_seller = list(Seller.objects.values_list("name", flat=True))
        if seller_name in exists_seller:
            return HttpResponse("Seller Already Present")
        else:
            seller = Seller.objects.create(name=seller_name, phone_number=seller_number)
            return HttpResponse("Seller Added Successfully")


@csrf_exempt
def add_stock_summary(request):
    if request.method == "POST":
        data_str = request.body.decode("utf-8")

        try:
            product_data = json.loads(data_str)

            for product_group in product_data["newProductJSON"]:
                for product in product_group:
                    print(product)
                    name = product.get("name")
                    expiry_date = product.get("dateExpiry")
                    brand = product.get("brand")
                    product_type = product.get("type")
                    manufcature_date = product.get("dateManufacture")
                    isNew = product.get("isNew")
                    selling_price = product.get("priceSelling")
                    wholesale_price = product.get("priceWholesale")
                    quantity = product.get("quantity")
                    seller_name = product.get("sellerName")
                    seller = Seller.objects.get(name=seller_name)
                    owner = request.user

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
                        seller=seller,
                    )

            return JsonResponse({"redirect_url": "/stock/inventory"})
        except json.JSONDecodeError as e:
            return HttpResponse(f"Invalid JSON data: {e}")

    context = {"currentPage": "stock-new"}
    return render(request, "stock/summary.html", context)


def stock_inventory(request):
    products = Product.objects.all()
    product_quantities = Product.objects.values("name").annotate(
        total_quantity=Sum("available_quantity")
    )
    product_quantity_dict = {
        item["name"]: item["total_quantity"] for item in product_quantities
    }
    # inventory data
    inventory_data = {
        "inventoryData": {
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

    # inventory json overview
    last_added_product = Product.objects.latest("product_added_date")
    last_updated = last_added_product.product_added_date
    products_in_stock = Product.objects.filter(available_quantity__gt=0).order_by(
        "-product_added_date"
    )
    product_in_stock_count = products_in_stock.count()
    products_out_off_stock = Product.objects.filter(available_quantity__lt=1).count()
    products_low_in_stock = Product.objects.filter(available_quantity__lte=5).count()

    N = 7  # Number of days before expiry
    expired_products = Product.objects.filter(
        expiry_date__lt=timezone.now().date()
    ).count()

    near_expiry_date = timezone.now().date() + timedelta(days=N)
    products_near_expiry = Product.objects.filter(
        expiry_date__range=(timezone.now().date(), near_expiry_date),
        available_quantity__gt=0,
    ).count()

    total_selling_price = SoldItem.objects.aggregate(total=Sum("selling_price"))[
        "total"
    ]

    total_selling_price = total_selling_price or 0  # if there is no sold item

    # Profit
    profit_sold_items = SoldItem.objects.filter(
        product__selling_price__gt=models.F("product__wholesale_price")
    ).count()

    # Calculate the profit percentage per sold item where selling price is greater than wholesale price
    profit_percent_expression = ExpressionWrapper(
        (F("selling_price") - F("product__wholesale_price"))
        * 100
        / F("product__wholesale_price"),
        output_field=DecimalField(),
    )

    # Filter sold items where selling price is greater than wholesale price
    profit_sold_items = SoldItem.objects.filter(
        product__selling_price__gt=F("product__wholesale_price")
    )

    # Calculate the average profit percentage for all such sold items
    average_profit_percent = profit_sold_items.aggregate(
        avg_profit_percent=Avg(profit_percent_expression)
    )["avg_profit_percent"]

    average_profit_percent = average_profit_percent or 0
    print(f"Average profit percentage: {average_profit_percent:.2f}%")

    # Loss
    loss_sold_items_count = SoldItem.objects.filter(
        selling_price__lt=models.F("product__wholesale_price")
    ).count()
    print("loss_sold_items_count:", loss_sold_items_count)

    # Calculate the loss percentage per sold item where selling price is less than wholesale price
    loss_percent_expression = ExpressionWrapper(
        (F("product__wholesale_price") - F("selling_price"))
        * 100
        / F("product__wholesale_price"),
        output_field=DecimalField(),
    )

    # Filter sold items where the selling price is less than the wholesale price
    loss_sold_items = SoldItem.objects.filter(
        product__selling_price__lt=F("product__wholesale_price")
    )

    # Calculate the average loss percentage for all such sold items
    average_loss_percent = loss_sold_items.aggregate(
        avg_loss_percent=Avg(loss_percent_expression)
    )["avg_loss_percent"]

    # Handle cases where there might not be any sold items
    average_loss_percent = average_loss_percent or 0

    # Print or use the result
    print(f"Average loss percentage: {average_loss_percent:.2f}%")

    # sold for same as wholesale price

    same_as_wholesale_amount = SoldItem.objects.filter(
        selling_price__exact=F("product__wholesale_price")
    ).count()
    print("same_as_wholesale_amount:", same_as_wholesale_amount)

    product_type_count = Product.objects.values("product_type").annotate(
        count=Count("product_type")
    )
    for item in product_type_count:
        print(f"{item['product_type']}, Count: {item['count']}")

    inventory_overview = {
        "lastUpdated": last_updated,
        "count": {
            "products": products.count(),
            "productsInStock": product_in_stock_count,
            "productsOutOfStock": products_out_off_stock,
            "productsLowStock": products_low_in_stock,
            "productExpired": expired_products,
            "productsNearExpiry": products_near_expiry,
        },
        "types": {
            "names": [product.name for product in products_in_stock],
            "counts": product_type_count,
        },
        "financial": {
            "cost": total_selling_price,
            "profitProductCount": profit_sold_items,
            "profitPercent": average_profit_percent,
            "lossProductCount": loss_sold_items_count,
            "lossPercent": average_loss_percent,
            "sameAsWholesaleAmount": same_as_wholesale_amount,
        },
    }

    json_data = json.dumps(inventory_data, cls=DjangoJSONEncoder)

    context = {
        "currentPage": "stock-inventory",
        "inventory_data": json_data,
        "inventory_overview": inventory_overview,
    }
    return render(request, "stock/inventory.html", context)

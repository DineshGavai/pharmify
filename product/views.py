from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Sum, F, ExpressionWrapper, DecimalField, Avg, Count,Q
from datetime import timedelta
from django.utils import timezone
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
@login_required
def stock_inventory_api(request):
    products = Product.objects.filter(owner_id=request.user).order_by('name')

    if products.exists():
        # Aggregate total quantities for each product name
        product_quantities = products.values("name").annotate(
            total_quantity=Sum("available_quantity")
        )
        product_quantity_dict = {
            item["name"]: item["total_quantity"] for item in product_quantities
        }

        # Inventory data with formatted dates
        inventory_data = {
            "inventoryData": {
                "name": [product.name for product in products],
                "brand": [product.brand for product in products],
                "type": [product.product_type for product in products],
                "seller": [product.seller.name for product in products],
                "dateManufacture": [product.manufacture_date for product in products],
                "dateAdded": [product.product_added_date for product in products],
                "dateExpiry": [product.expiry_date for product in products],
                "priceWholesale": [product.wholesale_price for product in products],
                "priceSelling": [product.selling_price for product in products],
                "QuantityAvailable": [product.available_quantity for product in products],
            }
        }

        # Overview calculations using the same products queryset
        last_added_product = products.latest("product_added_date")
        last_updated = last_added_product.product_added_date

        # Filter products from the same queryset to avoid redundant queries
        products_in_stock = products.filter(available_quantity__gt=0)
        product_in_stock_count = products_in_stock.count()
        
        products_out_of_stock_count = products.filter(available_quantity__lt=1).count()
        products_low_in_stock_count = products.filter(
            Q(available_quantity__lte=10) & Q(available_quantity__gt=0)
        ).count()

        # Expired and near-expiry calculations
        N = 7  # Number of days before expiry
        today = timezone.now().date()
        expired_products_count = products.filter(expiry_date__lt=today).count()
        near_expiry_date = today + timedelta(days=N)
        products_near_expiry_count = products.filter(
            expiry_date__range=(today, near_expiry_date),
            available_quantity__gt=0,
        ).count()

        # Financial calculations
        total_selling_price = SoldItem.objects.aggregate(
            total=Sum(F("selling_price") * F("quantity_sold"))
        )["total"] or 0

        # Profit and loss calculations
        profit_percent_expression = ExpressionWrapper(
            (F("selling_price") - F("product__wholesale_price")) * 100
            / F("product__wholesale_price"),
            output_field=DecimalField(),
        )

        profit_sold_items = SoldItem.objects.filter(
            product__in=products, selling_price__gt=F("product__wholesale_price")
        )
        average_profit_percent = profit_sold_items.aggregate(
            avg_profit_percent=Avg(profit_percent_expression)
        )["avg_profit_percent"] or 0

        loss_percent_expression = ExpressionWrapper(
            (F("product__wholesale_price") - F("selling_price")) * 100
            / F("product__wholesale_price"),
            output_field=DecimalField(),
        )

        loss_sold_items = SoldItem.objects.filter(
            product__in=products, selling_price__lt=F("product__wholesale_price")
        )
        loss_sold_items_count = loss_sold_items.count()
        average_loss_percent = loss_sold_items.aggregate(
            avg_loss_percent=Avg(loss_percent_expression)
        )["avg_loss_percent"] or 0

        same_as_wholesale_amount = SoldItem.objects.filter(
            product__in=products, selling_price=F("product__wholesale_price")
        ).count()

        product_type_count = products.values("product_type").annotate(
            count=Count("product_type")
        )

        # Inventory overview data
        inventory_overview = {
            "lastUpdated": last_updated,
            "count": {
                "products": products.count(),
                "productsInStock": product_in_stock_count,
                "productsOutOfStock": products_out_of_stock_count,
                "productsLowStock": products_low_in_stock_count,
                "productExpired": expired_products_count,
                "productsNearExpiry": products_near_expiry_count,
            },
            "types": {
                "names": [product.name for product in products_in_stock],
                "counts": list(product_type_count),
            },
            "financial": {
                "cost": total_selling_price,
                "profitProductCount": profit_sold_items.count(),
                "profitPercent": average_profit_percent,
                "lossProductCount": loss_sold_items_count,
                "lossPercent": average_loss_percent,
                "sameAsWholesaleAmount": same_as_wholesale_amount,
            },
        }

        # JSON response
        response_data = {
            "inventory_data": inventory_data,
            "inventory_overview": inventory_overview,
            "inventory_status": 200
        }

        return JsonResponse(response_data, safe=False, json_dumps_params={'indent': 2})
    else:
        return JsonResponse({"inventory_status": 412}, safe=False, json_dumps_params={'indent': 2})


@login_required
def stock_inventory(request):
    context = {
        "currentPage": "stock-inventory"
    }
    return render(request, "stock/inventory.html", context)
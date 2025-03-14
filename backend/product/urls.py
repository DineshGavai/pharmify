from django.urls import path
from product.views .data_add_views import *
from product.views.stock_views import *
from product.views.bill_views import *
from product.views.insight_views import *
from product.views.customer_views import *


urlpatterns = [
    # Stocks URLS
    path('stock/new', stock_new, name='stock-new'),
    path('stock/add-seller', add_seller, name='add-seller'),
    path("stock/summary", add_stock_summary, name="stock-summary"),
    path("stock/inventory", stock_inventory, name="stock-inventory"),
    path("stock/inventory/api",stock_inventory_api,name="stock-inventory-api"),
    path("stock/inventory/api2",stock_by_user,name="stock-inventory-api"),

    # Bills URLS
    path("bills/new-bill",new_bill,name="bill-new-bill"),
    path("bills/new-bill/bill-summary",bill_summary,name="bill-summary"),
    path("bills/bill-data-api",bill_data_api,name="bill-data-api"),
    path("bills/bill-history",bill_history,name="bill-history"),

    # Insights URL
    path("insights/insights-sales",insight_sales,name="insight-sales"),
    path("insights/insights-purchases",insight_purchases,name="insight-purchases"),

    # Customer URLS
    path("customer/",customer_page,name="customer"),

    

]

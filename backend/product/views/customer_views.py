from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from ..models import *

def customer_page(request):
    return render(request,"customer/customer.html")
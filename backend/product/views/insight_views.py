from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from ..models import *

def insight_sales(request):
    return render(request,"insight/insight-sales.html")



def insight_purchases(request):
    return render(request,"insight/insight-purchases.html")

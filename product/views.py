from django.shortcuts import render

# Create your views here.

def add_stock(request):
    return render(request,"add-stcok.html")
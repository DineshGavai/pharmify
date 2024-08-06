from django.shortcuts import render

# Create your views here.

def add_stock(request):
    context={
        "currentPage":"stocks"
    }  
    return render(request,"add-stock.html",context) 
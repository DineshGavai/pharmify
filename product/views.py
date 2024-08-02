from django.shortcuts import render

# Create your views here.

def add_stock(request):
    context={
        "currentPage":"stock-new"
    }
    return render(request,"stock/new.html",context) 
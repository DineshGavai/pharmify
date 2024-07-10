from django.shortcuts import render,redirect
from .forms import AddStockForm
from django.contrib import messages

# Create your views here.

def add_stock(request):
    form=AddStockForm()
    saved_successfully=False
    if request.method=="POST":
        form = AddStockForm(request.POST)
        if form.is_valid():
            form.instance.user=request.user
            form.save()
            saved_successfully=True
            messages.success(request, 'Stock added successfully!')
            return redirect('index')
            
    
    
    context={'form':form,'saved_successfully':saved_successfully}
    return render(request,"add_stock.html",context)

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from .forms import RegistrationForm
from .models import *
from django.contrib import messages



def loginUser(request):
    if request.method=="POST":
        email=request.POST.get('email')
        password=request.POST.get('password')
        
        print(email)
        print(password)
        try:
            user=Owner.objects.get(email=email)
        except:
            messages.error(request,"User not found")
        
        user=authenticate(request,email=email,password=password)
        if user is not None:
            auth_login(request,user)
            return redirect('home')
        else:
            messages.error(request,"Password does not match")
    
    
    # if request.method=="POST":
    #     email=request.POST.get('email')
    #     password=request.POST.get('password')
        
    #     try:
    #         user=Owner.objects.get(email=email)
    #     except:
    #         messages.error(request,"User not found")
        
    #     user=authenticate(request,email=email,password=password)
    #     if user is not None:
    #         auth_login(request,user)
    #         return redirect('home')
    #     else:
    #         messages.error(request,"Password does not match")
    return render(request, 'login.html')

def registerUser(request):
    form = RegistrationForm()
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)  # Correctly log in the user
            return redirect('home')
    
    context = {'form': form}
    return render(request, 'register.html', context)


def logoutUser(request):
    logout(request)
    return redirect('home')
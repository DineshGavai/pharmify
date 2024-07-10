from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from .forms import RegistrationForm
from .models import *
from .utils import *
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import random



def loginUser(request):
    if request.method=="POST":
        email=request.POST.get('login_email')
        password=request.POST.get('login_password')
        
        print(email)
        print(password)
        try:
            user=Owner.objects.get(email=email)
        except:
            messages.error(request,"User not found")
        
        user=authenticate(request,email=email,password=password)
        if user is not None:
            auth_login(request,user)
            return redirect('index')
        else:
            messages.error(request,"Password does not match")
    return render(request, 'login.html')

def registerUser(request):
    form = RegistrationForm()
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)  # Correctly log in the user
            return redirect('index')
    
    context = {'form': form}
    return render(request, 'verify-email.html', context)


def logoutUser(request):
    logout(request)
    return redirect('index')

def verifyEmail(request):
    if request.method == "POST":
        email = request.POST.get('email')
        OTP = random.randint(100000, 999999)

        # Store OTP in session
        # request.session['email']=email
        request.session['OTP'] = OTP
        request.session.modified = True

        send_otp_email( OTP, email)
       
        return render(request, 'comp-otp-form.html')
    return render(request, 'verify-email.html')

@csrf_exempt
def verify(request):
    if request.method == "POST":
        input_otp = request.POST.get('otp')
        stored_otp = request.session.get('OTP')

        if input_otp and str(stored_otp) == str(input_otp):
            return JsonResponse({'success': True})
        
        else:
            return JsonResponse({'success': False})

    return render(request, "verify.html")
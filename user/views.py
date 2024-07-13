from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from .forms import RegistrationForm
from .models import *
from .utils import *
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import random
from django.template.loader import render_to_string
from django.contrib.auth.hashers import make_password



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




def logoutUser(request):
    logout(request)
    return redirect('index')

def verifyEmail(request):
    if request.method == "POST":
        email = request.POST.get('email')
        OTP = random.randint(100000, 999999)

        # for taking email directly after verification
        request.session['email']=email

        # Store OTP in session
        request.session['OTP'] = OTP
        request.session.modified = True

        otp_sent_successfully=send_otp_email( OTP, email) #Now sent_otp_email method return True if email is send
        
        
        if otp_sent_successfully:  #If True then comp-otp-form.html render honar
            otp_form_html = render_to_string('comp-otp-form.html', {'email': email}) 
            return JsonResponse({'success': True, 'html': otp_form_html})
        else:
            return JsonResponse({'success': False}) #if seccess False alert disnar Failed to send OTP 
        
    return render(request, 'verify-email.html')


@csrf_exempt
def verify(request):
    if request.method == "POST":
        input_otp = request.POST.get('otp')
        stored_otp = request.session.get('OTP')

        if input_otp and str(stored_otp) == str(input_otp):
            return JsonResponse({'success': True, 'redirect_url': '/signup/'})
        else:
            return JsonResponse({'success': False})

    
def signup(request):
    if request.method=="POST":
        name=request.POST.get('signup_full_name')
        shop_name=request.POST.get('signup_shop_name')
        phone_number=request.POST.get('signup_phone')
        password1=request.POST.get('signup_create_password')
        password2=request.POST.get('signup_confirm_password')
        email=request.session.get('email')
        
        if password1 != password2:
            return render(request, 'signup.html', {'error': 'Passwords do not match'})

        
        user = Owner(
            name=name,
            shop_name=shop_name,
            phone_number=phone_number,
            password=make_password(password1),  # Hash the password
            email=email
        )
        user.save()
        auth_login(request,user)
        return redirect('index')
    return render(request,"signup.html")  #http://127.0.0.1:8000/signup/ use for see web page
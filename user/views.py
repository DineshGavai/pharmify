import random
from .models import *
from .utils import *
from django.urls import *
from django.contrib.auth import authenticate, login as auth_login, logout
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.contrib.auth.hashers import make_password
from django.contrib.auth.views import PasswordResetView
from django.contrib.messages.views import SuccessMessageMixin
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.views.generic.edit import FormView
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes





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
        user=Owner.objects.get(email=email)
        if user==None:
            # for taking email directly after verification
            request.session['email']=email
            # Store OTP in session
            OTP = random.randint(100000, 999999)
            request.session['OTP'] = OTP
            request.session.modified = True
            otp_sent_successfully=send_otp_email( OTP, email) #Now sent_otp_email method return True if email is send
            if otp_sent_successfully:  #If True then comp-otp-form.html render honar
                otp_form_html = render_to_string('comp-otp-form.html', {'email': email}) 
                return JsonResponse({'success': True, 'html': otp_form_html})
            else:
                return JsonResponse({'success': False}) #if seccess False alert disnar Failed to send OTP 
        else:
            return JsonResponse({ "message": "Email Already Exist."}, status=200)

    
        
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


# Password Reset View 
# 
    
class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
    template_name = 'password/password_reset.html'
    email_template_name = 'password/password_reset_email.html'
    subject_template_name = 'password/password_reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    success_url = reverse_lazy('password_reset_done')

    def form_valid(self, form):
        email = form.cleaned_data.get('email')
        
        # Check if email exists in Owner table
        try:
            owner = Owner.objects.get(email=email)
        except Owner.DoesNotExist:
            owner = None
        
        if owner is not None:
            # If email exists, proceed with the normal password reset process
            return super().form_valid(form)
        else:
            # If email does not exist, add an error to the form and re-render the form
            form.add_error('email', 'User with this email does not exist.')
            return self.form_invalid(form)
import random
import os
import json
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
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.decorators import login_required
from rest_framework import serializers



@csrf_exempt
def loginUser(request):
    if request.method == "POST":
        data = json.loads(request.body) 
        email = data.get('sign_in_email')
        password = data.get('sign_in_password')

        if not email or not password:
            return JsonResponse({'message': 'Email and password are required', 'status': 400}, status=400)

        
        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({'message': 'Logged in successfully', 'status': 200}, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials', 'status': 400}, status=400)

    return JsonResponse({'message': 'Invalid request method', 'status': 405}, status=405)

def logoutUser(request):
    logout(request)
    return JsonResponse({'message': 'User logged out','status':'success'},status=200)


def verifyEmail(request):
    if request.method == "POST":
        user = None
        email = request.POST.get('email')
        try:
            user = Owner.objects.get(email=email)
            return JsonResponse({"message": "Email Already Exist."}, status=200)
        except:
            # for taking email directly after verification
            request.session['email'] = email
            # Store OTP in session
            OTP = random.randint(100000, 999999)
            request.session['OTP'] = OTP
            request.session.modified = True
            # Now sent_otp_email method return True if email is send
            otp_sent_successfully = send_otp_email(OTP, email)
            if otp_sent_successfully:  # If True then comp-otp-form.html render honar
                otp_form_html = render_to_string(
                    'comp-otp-form.html', {'email': email})
                return JsonResponse({'success': True, 'html': otp_form_html})
            else:
                # if seccess False alert disnar Failed to send OTP
                return JsonResponse({'success': False})

    return render(request, 'verify-email.html')

@csrf_exempt
def verifyEmail(request):

    email=request.POST.get("email")
    try:
        user_exist=Owner.objects.get(email=email)
        return JsonResponse({"status": "success", "message": "User exists", "exists": True}, status=200)
    except:
        return JsonResponse({"status": "error", "message": "User does not exist", "exists": False}, status=404)




@csrf_exempt
def signup(request):
    name = request.POST.get('signup_full_name')
    shop_name = request.POST.get('signup_shop_name')
    phone_number = request.POST.get('signup_phone')
    password1 = request.POST.get('signup_create_password')
    password2 = request.POST.get('signup_confirm_password')
    email = request.POST.get('email')

    first_name, last_name = name.split(' ', 1)

    
    if password1 != password2:
        return JsonResponse({
            "status": "error",
            "message": "Passwords do not match"
        }, status=400)

    user = Owner(
        username=email,
        name=name,
        first_name=first_name,
        last_name=last_name,
        shop_name=shop_name,
        phone_number=phone_number,
        password=make_password(password1),  
        email=email
    )

    user.save()


    user.backend = 'allauth.account.auth_backends.AuthenticationBackend'    
    auth_login(request, user)

    
    return JsonResponse({
        "status": "success",
        "message": "Account created successfully",
        "data": {
            "name": user.name,
            "email": user.email,
            "shop_name": user.shop_name,
            "phone_number": user.phone_number
        }
    }, status=200)







































































# def verifyEmail(request):
#     if request.method == "POST":
#         user = None
#         email = request.POST.get('email')
#         try:
#             user = Owner.objects.get(email=email)
#             return JsonResponse({"message": "Email Already Exist."}, status=200)
#         except:
#             # for taking email directly after verification
#             request.session['email'] = email
#             # Store OTP in session
#             OTP = random.randint(100000, 999999)
#             request.session['OTP'] = OTP
#             request.session.modified = True
#             # Now sent_otp_email method return True if email is send
#             otp_sent_successfully = send_otp_email(OTP, email)
#             if otp_sent_successfully:  # If True then comp-otp-form.html render honar
#                 otp_form_html = render_to_string(
#                     'comp-otp-form.html', {'email': email})
#                 return JsonResponse({'success': True, 'html': otp_form_html})
#             else:
#                 # if seccess False alert disnar Failed to send OTP
#                 return JsonResponse({'success': False})

#     return render(request, 'verify-email.html')




@csrf_exempt
def verify(request):
    if request.method == "POST":
        input_otp = request.POST.get('otp')
        stored_otp = request.session.get('OTP')

        if input_otp and str(stored_otp) == str(input_otp):
            return JsonResponse({'success': True, 'redirect_url': '/signup/'})
        else:
            return JsonResponse({'success': False})

    


# Password Reset View

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


# Profile Update
@login_required
def profileEdit(request):
    user = request.user
    owners = Owner.objects.get(email=user)

    if request.method == "POST":
        name = request.POST.get('edit_profile_full_name')
        shop_name = request.POST.get('edit_profile_shop_name')
        contact = request.POST.get('edit_profile_phone')
        remove_avatar=request.POST.get('remove_avatar_input')
        remove_license=request.POST.get('remove_license_input')

        # Handle avatar upload

        avatar = request.FILES.get('upload_avatar_input')
        if avatar:
            avatar_storage = FileSystemStorage(
                location=os.path.join(settings.MEDIA_ROOT))
            avatar_filename = avatar_storage.save(avatar.name, avatar)
            avatar_url = avatar_storage.url(avatar_filename)
        elif remove_avatar:
            avatar_url = 'assets/illus/default-avatar.png'
        else:
            avatar_url = owners.avatar

        # Handle licence upload
        licence = request.FILES.get('edit_profile_license')
        if licence:
            licence_storage = FileSystemStorage(
                location=os.path.join(settings.MEDIA_ROOT))
            licence_filename = licence_storage.save(licence.name, licence)
            licence_url = licence_storage.url(licence_filename)
        elif remove_license:
            licence_url = 'assets/illus/default-file-image.png'     
        else:
            licence_url = owners.license

        
        
        # Save the owner profile information to the database
        owners.name = name
        owners.shop_name = shop_name
        owners.phone_number = contact
        owners.avatar = avatar_url
        owners.license = licence_url
        
        owners.save()

        return redirect('index')  # Redirect to the index page after updating
    context = {
        "user": owners,
        "currentPage": "edit-profile"
    }
    return render(request, "settings/edit-profile.html", context)


def privacySecurity(request):
    return render(request, "settings/account-privacy.html")


def userSetting(request):
    return render(request, "settings/settings.html")

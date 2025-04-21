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
from django.conf import settings



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
            return JsonResponse({'message': 'Logged in successfully', 'status': 200, 'user': user.to_dict()}, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials', 'status': 400}, status=400)

    return JsonResponse({'message': 'Invalid request method', 'status': 405}, status=405)

def logoutUser(request):
    logout(request)
    return JsonResponse({'message': 'User logged out','status':'success'},status=200)


@csrf_exempt
def verifyEmail(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            print("Received email:", email)

            user_exist = Owner.objects.get(email=email)
            return JsonResponse({
                "status": "error",
                "message": "Email already exists",
                "exists": True
            }, status=400)
        except Owner.DoesNotExist:
            return JsonResponse({
                "status": "success",
                "message": "New email",
                "exists": False
            }, status=200)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=500)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)


@csrf_exempt
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests allowed"}, status=405)

    try:
        data = json.loads(request.body)

        name = data.get('signup_full_name')
        phone_number = data.get('signup_phone')
        business_name = data.get('signup_business_name')
        password1 = data.get('signup_create_password')
        password2 = data.get('signup_confirm_password')
        email = data.get('email')


        if not name:
            return JsonResponse({"status": "error", "message": "Full name is required"}, status=400)

        first_name, last_name = name.split(' ', 1)

        if password1 != password2:
            return JsonResponse({
                "status": "error",
                "message": "Passwords do not match"
            }, status=400)

        user = Owner(
            name=name,
            first_name=first_name,
            last_name=last_name,
            business_name=business_name,
            phone_number=phone_number,
            password=make_password(password1),  
            email=email
        )

        user.save()

        user.backend = 'allauth.account.auth_backends.AuthenticationBackend'
        auth_login(request, user)

        return JsonResponse({'message': 'Account created successfully', 'status': 200, 'user': user.to_dict()}, status=200)

    except Exception as e:
        print("Signup error:", e)
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


@csrf_exempt
def profile_edit(request):
    if request.method == "POST":
        email=request.POST.get("email")
        owners = Owner.objects.get(email=email)

        name = request.POST.get('edit_profile_full_name')
        business_name = request.POST.get('edit_profile_business_name')
        contact = request.POST.get('edit_profile_phone')
        # remove_avatar = request.POST.get('remove_avatar_input') == 'true'
        # remove_license = request.POST.get('remove_license_input') == 'true'

        # Handle avatar upload
        avatar = request.FILES.get('upload_avatar_input')
        if avatar:
            avatar_storage = FileSystemStorage(location=settings.MEDIA_ROOT)
            avatar_filename = avatar_storage.save(avatar.name, avatar)
            avatar_url = avatar_storage.url(avatar_filename)
        # elif remove_avatar:
        #     avatar_url = 'assets/illus/default-avatar.png'
        else:
            avatar_url = owners.avatar

        # Handle license upload
        licence = request.FILES.get('edit_profile_license')
        if licence:
            licence_storage = FileSystemStorage(location=settings.MEDIA_ROOT)
            licence_filename = licence_storage.save(licence.name, licence)
            licence_url = licence_storage.url(licence_filename)
        # elif remove_license:
        #     licence_url = 'assets/illus/default-file-image.png'
        else:
            licence_url = owners.license

        # Save data
        owners.name = name
        owners.business_name = business_name
        owners.phone_number = contact
        owners.avatar = avatar_url
        owners.license = licence_url
        owners.save()

        return JsonResponse({
            "status": "success",
            "message": "Profile updated successfully",
            "user": owners.to_dict()
        })

    return JsonResponse({"error": "Invalid request method"}, status=400)














































# # Password Reset View

# class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
#     template_name = 'password/password_reset.html'
#     email_template_name = 'password/password_reset_email.html'
#     subject_template_name = 'password/password_reset_subject.txt'
#     success_message = "We've emailed you instructions for setting your password, " \
#                       "if an account exists with the email you entered. You should receive them shortly." \
#                       " If you don't receive an email, " \
#                       "please make sure you've entered the address you registered with, and check your spam folder."
#     success_url = reverse_lazy('password_reset_done')

#     def form_valid(self, form):
#         email = form.cleaned_data.get('email')

#         # Check if email exists in Owner table
#         try:
#             owner = Owner.objects.get(email=email)
#         except Owner.DoesNotExist:
#             owner = None

#         if owner is not None:
#             # If email exists, proceed with the normal password reset process
#             return super().form_valid(form)
#         else:
#             # If email does not exist, add an error to the form and re-render the form
#             form.add_error('email', 'User with this email does not exist.')
#             return self.form_invalid(form)


# # Profile Update
# @login_required



# def privacySecurity(request):
#     return render(request, "settings/account-privacy.html")


# def userSetting(request):
#     return render(request, "settings/settings.html")


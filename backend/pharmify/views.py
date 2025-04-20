from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from rest_framework import status
from dotenv import load_dotenv
import os

@login_required(login_url='login')
def index(request):
    context = {
        "currentPage": "home"
    }
    return render(request, 'index.html', context)

GOOGLE_CLIENT_ID =os.getenv("GOOGLE_CLIENT_ID")

User = get_user_model()

class GoogleLogin(APIView):
    def post(self, request):
        try:
            print(GOOGLE_CLIENT_ID)
            token = request.data.get('credential')
            if not token:
                print("No token received")
                return JsonResponse({'error': 'No token provided'}, status=400)

            print("Verifying token...")
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            print("Token info:", idinfo)

            if 'email' not in idinfo:
                print("Email not in token info")
                return JsonResponse({'error': 'Google token is invalid'}, status=400)

            email = idinfo['email']
            name = idinfo.get('name', '')
            print(name)
            print("Email:", email)

            user, created = User.objects.get_or_create(email=email)

            if created:
                user.username = email.split("@")[0]  # See note below
                user.first_name = name.split(" ")[0] if name else ''
                user.last_name = name.split(" ")[1] if len(name.split(" ")) > 1 else ''
                user.save()
                print("User created:", user.username)
            else:
                print("User already exists:", user.username)

            return JsonResponse({'message': 'User authenticated', 'user': {
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name
            }})

        except ValueError as e:
            print("Token verification failed:", str(e))
            return JsonResponse({'error': 'Token verification failed', 'details': str(e)}, status=400)

        except Exception as e:
            print("Unexpected error:", str(e))
            return JsonResponse({'error': 'Something went wrong', 'details': str(e)}, status=500)

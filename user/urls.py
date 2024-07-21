from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('login/', loginUser, name="login"),
    path('logout/', logoutUser, name="logout"),
    path('verify-email/', verifyEmail, name="verifyEmail"),
    path('verify/', verify, name="verify"),
    path('signup/', signup, name="signup"),

    path('reset-password/', ResetPasswordView.as_view(
        html_email_template_name="password/password_reset_email.html"), name='password_reset'),
    path("reset-password-emailed/", auth_views.PasswordResetDoneView.as_view(
        template_name="password/password_reset_sent.html"), name="password_reset_done"),
    path('new-password/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='password/password_reset_form.html'), name='password_reset_confirm'),
    path("password-reset-success/", auth_views.PasswordResetCompleteView.as_view(
        template_name="password/password_reset_done.html"), name="password_reset_complete")

]

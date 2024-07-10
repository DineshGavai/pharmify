from django.core.mail import EmailMultiAlternatives
from django.template import loader
import random
from django.conf import settings


def send_otp_email(otp_code, recipient_email):
    subject = "Your Pharmify OTP"
    from_email = settings.EMAIL_HOST_USER
    text_content = f"Your OTP is {otp_code}"
      

  # Load the template and render it with context
    template = loader.get_template("otp_email.html")  # Replace "otp_email.html" with your template filename
    context = {
        "otp_code": otp_code,
        "duration": 10  # Replace with your actual duration
    }
    html_content = template.render(context)
    
        # Create and send the email
    email = EmailMultiAlternatives(subject, text_content, from_email, [recipient_email])
    email.attach_alternative(html_content, "text/html")
    email.send()
    
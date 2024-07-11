from django.core.mail import EmailMultiAlternatives
from django.template import loader
import random
from django.conf import settings


def send_otp_email(otp_code, recipient_email):
    subject = "Verify your Email address - Pharmify"
    from_email = settings.EMAIL_HOST_USER
    text_content = f"{otp_code} is your verification code for Pharmify."
      

  # Load the template and render it with context
    template = loader.get_template("email-template-otp.html")
    context = {
        "recipient_email": recipient_email,
        "otp_code": otp_code,
        "duration": 5
    }
    html_content = template.render(context)
    
        # Create and send the email
    email = EmailMultiAlternatives(subject, text_content, from_email, [recipient_email])
    email.attach_alternative(html_content, "text/html")
    email.send()
    
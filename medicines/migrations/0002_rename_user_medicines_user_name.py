# Generated by Django 5.0.6 on 2024-07-20 05:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicines', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicines',
            old_name='user',
            new_name='user_name',
        ),
    ]

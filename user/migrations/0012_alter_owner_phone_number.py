# Generated by Django 5.0.6 on 2024-08-15 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_alter_owner_license'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='phone_number',
            field=models.CharField(max_length=10),
        ),
    ]
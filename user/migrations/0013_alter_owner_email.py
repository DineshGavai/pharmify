# Generated by Django 5.1.2 on 2024-10-30 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0012_alter_owner_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='email',
            field=models.EmailField(db_index=True, max_length=254, unique=True),
        ),
    ]

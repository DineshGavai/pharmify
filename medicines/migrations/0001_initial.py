# Generated by Django 5.0.6 on 2024-07-03 16:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Medicines',
            fields=[
                ('medicine_id', models.AutoField(primary_key=True, serialize=False)),
                ('seller_name', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('manufacture_date', models.DateField()),
                ('expiry_date', models.DateField()),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medicines', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

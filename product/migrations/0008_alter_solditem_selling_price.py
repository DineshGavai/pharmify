# Generated by Django 5.0.6 on 2024-09-12 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_solditem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solditem',
            name='selling_price',
            field=models.DecimalField(decimal_places=2, editable=False, max_digits=10),
        ),
    ]

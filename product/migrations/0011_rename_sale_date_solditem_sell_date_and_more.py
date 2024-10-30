# Generated by Django 5.1.2 on 2024-10-30 15:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0010_alter_product_product_type'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='solditem',
            old_name='sale_date',
            new_name='sell_date',
        ),
        migrations.AddIndex(
            model_name='product',
            index=models.Index(fields=['name', 'brand'], name='product_pro_name_bafeda_idx'),
        ),
        migrations.AddIndex(
            model_name='seller',
            index=models.Index(fields=['name'], name='product_sel_name_017e2a_idx'),
        ),
        migrations.AddIndex(
            model_name='solditem',
            index=models.Index(fields=['sell_date'], name='product_sol_sell_da_f36e06_idx'),
        ),
    ]
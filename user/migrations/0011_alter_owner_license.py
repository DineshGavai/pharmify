# Generated by Django 5.0.6 on 2024-08-03 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_alter_owner_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='license',
            field=models.ImageField(blank=True, default='assets/illus/default-file-image.png', null=True, upload_to=''),
        ),
    ]

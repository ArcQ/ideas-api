# Generated by Django 3.1.7 on 2021-04-01 05:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20210401_0011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labjoin',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='lab_join_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='labjoin',
            unique_together={('created_by', 'lab')},
        ),
    ]
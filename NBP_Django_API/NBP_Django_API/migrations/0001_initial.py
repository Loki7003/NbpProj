# Generated by Django 5.0.4 on 2024-04-15 16:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=3)),
                ('rate', models.DecimalField(decimal_places=6, max_digits=6, null=True)),
                ('date', models.DateField(default=datetime.date.today)),
            ],
        ),
    ]
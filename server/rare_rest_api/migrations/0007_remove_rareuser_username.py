# Generated by Django 3.2.3 on 2021-05-17 20:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rare_rest_api', '0006_rareuser_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rareuser',
            name='username',
        ),
    ]

from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BooleanField
from django.utils import timezone

class RareUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(null=True)
    profile_image_url = models.CharField(max_length=250, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    active = BooleanField(default=True)

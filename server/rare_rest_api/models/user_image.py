from django.db import models

class UserImage(models.Model):
    user = models.ForeignKey("RareUser", on_delete=models.CASCADE, related_name="picture")
    image = models.ImageField(
        upload_to='userimages', height_field=None, width_field=None, max_length=None, null=True
    )
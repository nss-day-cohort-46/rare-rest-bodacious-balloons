from django.db import models
from django.utils import timezone

class Comment(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    author = models.ForeignKey("RareUser", on_delete=models.CASCADE)
    content = models.TextField(default="")
    created_on = models.DateTimeField(default=timezone.now, editable=False)

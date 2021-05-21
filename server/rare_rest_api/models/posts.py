from django.db import models  

class Post(models.Model):
    user = models.ForeignKey("RareUser", on_delete=models.CASCADE)
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    publication_date = models.DateTimeField()
    image_url = models.CharField(max_length=250)
    # image_url = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)
    content = models.TextField()
    approved = models.BooleanField()
    tags = models.ManyToManyField("Tag", related_name="posts")
    reactions = models.ManyToManyField('Reaction', related_name="postReaction")
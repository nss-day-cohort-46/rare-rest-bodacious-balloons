from django.db import models  

class Subscription(models.Model):
    follower = models.ForeignKey("Rare_User", on_delete= models.CASCADE)
    author = models.ForeignKey("Rare_User", on_delete= models.CASCADE)
    created_on = models.DateField(auto_now_add=True)
    ended_on = models.DateField(null=True)
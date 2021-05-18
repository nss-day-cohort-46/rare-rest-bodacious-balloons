### View module for handling requests about comments

from rare_rest_api.models import Comment, RareUser
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from django.db.models import Count, Q

class RareUserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username')

class CommentSerializer(serializers.Serializer):

    author = RareUserSerializer(many=False)
    class Meta:
        model = Comment
        fields = ('post', 'author', 'content', 'created_on')

class CommentViewSet(ViewSet):

    ################################  CREATE  ################################

    def create(self, request):

        # Identify the user
        rareuser = RareUser.objects.get(user=request.auth.user)

        # Identify the post
        
        # Create an instance of the comment
        comment = Comment()
         


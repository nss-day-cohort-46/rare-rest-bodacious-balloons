### View module for handling requests about comments

from rare_rest_api.models import Comment, RareUser, Post
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
        post = Post.objects.get(pk=request.data['postId'])

        # Create an instance of the comment
        comment = Comment()
        comment.post = post
        comment.author = rareuser
        comment.content = request.data['content']

        try:
            comment.save()
            serializer = CommentSerializer(comment, context={'request': request})
            return Response(serializer.data)
        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)
         


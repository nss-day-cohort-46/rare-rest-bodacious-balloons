### View module for handling requests about comments

from rare_rest_api.models import Comment, RareUser, Post, rare_user
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from django.db.models import Count, Q


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username')

class RareUserSerializer(serializers.ModelSerializer):

    user = UserSerializer(many=False)
    class Meta:
        model = RareUser
        fields = ('user',)

class CommentSerializer(serializers.ModelSerializer):

    author = RareUserSerializer(many=False)
    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'content', 'created_on')
        depth = 1

class CommentViewSet(ViewSet):

    ################################  CREATE  ################################

    def create(self, request):

        # Identify the user
        user = User.objects.get(pk=request.auth.user.id)
        rareuser = RareUser.objects.get(pk=user.pk)

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

        
    ################################  UPDATE  ################################

    def update(self, request, pk=None):
        rare_user = RareUser.objects.get(user=request.auth.user)
        comment = Comment.objects.get(pk=pk)
        comment.content = request.data['content']
        comment.save()

        # 204 - everything worked, but you won't get a response
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    ################################  LIST  ################################

    def list(self, request):

        post_id = self.request.query_params.get('postId', None)
        if post_id:
            comments = Comment.objects.filter(post__id=post_id)
        else:
            comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data)

    ################################  RETRIEVE  ################################

    def retrieve(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
            serializer = CommentSerializer(comment, context={'request': request})
            return Response (serializer.data)
        except Exception as ex:
            return HttpResponseServerError(ex)
    ################################  DESTROY  ################################

    def destroy(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
            comment.delete()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)
        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

"""View module for handling requests about categories"""
from django.http import HttpResponseServerError
from django.core.exceptions import ValidationError
from rest_framework import views, viewsets
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rare_rest_api.models import Tag, Post

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = "Tag"
        fields = ['label']

class TagViewSet(ViewSet):
    def list(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            tag = Tag.objects.get(pk=pk)
            serializer = TagSerializer(tag, context={'request': request})
            return Response(serializer.data)
        except Exception as ex:
            return HttpResponseServerError(ex)



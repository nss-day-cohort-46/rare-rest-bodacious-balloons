"""View module for handling requests about reactions"""
from django.http import HttpResponseServerError
from django.core.exceptions import ValidationError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rare_rest_api.models import Reaction

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ("id", "label", "image_url")


class ReactionView(ViewSet):
    def list(self, request):

        reactions = Reaction.objects.all()

        serializer = ReactionSerializer(reactions, many=True, context={'request': request})
        return Response(serializer.data)
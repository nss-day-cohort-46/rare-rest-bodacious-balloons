"""View module for handling requests about subscriptions"""
from django.http import HttpResponseServerError
from django.core.exceptions import ValidationError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rare_rest_api.models import Subscription, Post, RareUser

class SubscriptionSerializer(serializers.ModelSerializer):
    """JSON serializer for subscriptions

    Arguments:
        serializer type
    """
    class Meta:
        model = Subscription
        fields = ("id", "follower", "author", "created_on", "ended_on")
        depth = 1

class SubscriptionView(ViewSet):

    def list(self, request):
        
        subscriptions = Subscription.objects.all()
        
        serializer = SubscriptionSerializer(
            subscriptions, many=True, context={'request': request})
        return Response(serializer.data)

    



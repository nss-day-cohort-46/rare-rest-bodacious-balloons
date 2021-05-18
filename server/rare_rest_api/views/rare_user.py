from rare_rest_api.models import RareUser
from rare_rest_api.views.comment import UserSerializer, RareUserSerializer
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers


class RareUserView(ViewSet):
    def list(self, request):
        users = RareUser.objects.all()
        res = RareUserSerializer(users, many=True)
        return Response(res.data)


from rare_rest_api.models import RareUser, Subscription
from rare_rest_api.views.comment import UserSerializer, RareUserSerializer
from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import serializers


class RareUserView(ViewSet):
    def list(self, request):
        users = RareUser.objects.all()
        res = RareUserSerializer(users, many=True)
        return Response(res.data)


    @action(methods=['post', 'delete'], detail=True)
    def subscribe(self, request, pk=None):
        """Manage subscribing to authors"""
        follower = RareUser.objects.get(user=request.auth.user)
        author = RareUser.objects.get(pk=pk)
        print(pk)
        if request.method == "POST":
            
                subbed = Subscription()
                subbed.follower = follower
                subbed.author = author
                subbed.save()
                return Response({'subscribed': True}, status=status.HTTP_201_CREATED)
        elif request.method == "DELETE":
            try:
               subbed = Subscription.objects.get(follower=follower, author=author)
               subbed.delete()
               return Response(None, status=status.HTTP_204_NO_CONTENT)
            
            except Subscription.DoesNotExist:
                return Response({'message': 'Not currently subscribed to author.'},
                                    status=status.HTTP_404_NOT_FOUND)

        # If the client performs a request with a method of
        # anything other than POST or DELETE, tell client that
        # the method is not supported
        return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

"""rare_rest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from rare_rest_api.views import register_user, login_user
from django.contrib import admin
from django.conf.urls import include
from django.urls import path

from rest_framework import routers
from rare_rest_api.views import ( CategoryView,
                                  PostViewSet,
                                  RareUserView,
                                  SubscriptionView, 
                                  CommentViewSet,
                                  TagViewSet )



router = routers.DefaultRouter(trailing_slash=False)
router.register(r'posts', PostViewSet , 'post')
router.register(r'categories', CategoryView, 'category')
router.register(r'comments', CommentViewSet, 'comment')
router.register(r'users', RareUserView, 'user')
router.register(r'subscriptions', SubscriptionView, 'subscription')
router.register(r'tags', TagViewSet, 'tag')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('register', register_user),
    path('login', login_user),
    
]


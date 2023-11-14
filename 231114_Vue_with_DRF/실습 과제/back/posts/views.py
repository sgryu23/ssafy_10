from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PostListSerializer, PostSerializer
from .models import Post


@api_view(['GET', 'POST'])
def posts(request):
    if request.method == 'GET':
        post_list = Post.objects.all()
        serializer = PostListSerializer(post_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        pass
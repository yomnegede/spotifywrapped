# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('spotify-auth', views.spotify_auth, name='spotify_auth'),
]
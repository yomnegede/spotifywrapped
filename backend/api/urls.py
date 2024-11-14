# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('spotify-auth', views.spotify_auth, name='spotify_auth'),
    path('save-wrapped', views.save_wrapped, name='save_wrapped'),
    path('get-public-wraps', views.get_public_wraps, name='get_public_wraps'),
    path('get-public-wrap/<str:wrapId>/', views.get_public_wrap, name='get_public_wrap')
]
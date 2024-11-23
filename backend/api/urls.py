# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('spotify-auth', views.spotify_auth, name='spotify_auth'),
    path('save-wrapped', views.save_wrapped, name='save_wrapped'),
    path('get-public-wraps', views.get_public_wraps, name='get_public_wraps'),
    path('get-wrap/<str:wrapId>/', views.get_wrap, name='get_wrap'),
    path("get-description", views.get_description, name="get_description"),
    path('get-user-wraps/<str:display_name>/', views.get_user_wraps, name='get_user_wraps'),  # New endpoint to fetch wraps by display name
    path('delete-wrap/<int:wrap_id>', views.delete_wrap, name='delete_wrap'),  # New endpoint to delete a wrap
    path('update-wrap-visibility/<int:wrap_id>', views.update_wrap_visibility, name='update_wrap_visibility'),  # New endpoint to update wrap visibility
    path('delete-wraps/<str:display_name>/', views.delete_wraps, name='delete_wraps'),
]
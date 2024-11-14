from django.db import models

class Wrapped(models.Model):
    # Manage user information directly in this model
    spotify_user_id = models.CharField(max_length=255, unique=True)  # Unique Spotify user ID
    display_name = models.CharField(max_length=255, default="Anonymous User")
    email = models.EmailField(default="no-email@example.com")
    country = models.CharField(max_length=10, default="US")
    profile_image_url = models.URLField(blank=True, null=True)

    # Wrapped data fields
    top_artists = models.JSONField(default=list)
    top_songs = models.JSONField(default=list)
    top_genres = models.JSONField(default=list)
    top_albums = models.JSONField(default=list)
    recently_played = models.JSONField(default=list)
    saved_shows = models.JSONField(default=list)

    fun_fact = models.TextField(default="No fun fact provided")
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.display_name}'s Wrapped"

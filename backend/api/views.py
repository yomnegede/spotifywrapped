import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

@csrf_exempt
def spotify_auth(request):
    if request.method == "POST":
        data = request.json()
        code = data.get("code")

        response = requests.post(
            "https://accounts.spotify.com/api/token",
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": "http://localhost:3000/callback",
                "client_id": os.getenv("SPOTIFY_CLIENT_ID"),
                "client_secret": os.getenv("SPOTIFY_CLIENT_SECRET"),
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )

        return JsonResponse(response.json())


# Create your views here.

import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import environ

# Load environment variables
env = environ.Env()
environ.Env.read_env()

@csrf_exempt
def spotify_auth(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            code = data.get("code")
            
            if not code:
                return JsonResponse({"error": "Authorization code is missing"}, status=400)

            # Access client_id and client_secret from environment variables
            client_id = env("SPOTIFY_CLIENT_ID")
            client_secret = env("SPOTIFY_CLIENT_SECRET")
            redirect_uri = env("SPOTIFY_REDIRECT_URI")

            # Send a POST request to Spotify to exchange the code for an access token
            response = requests.post(
                "https://accounts.spotify.com/api/token",
                data={
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": redirect_uri,
                    "client_id": client_id,
                    "client_secret": client_secret,
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )

            if response.status_code == 200:
                return JsonResponse(response.json())
            else:
                return JsonResponse({"error": "Failed to get token from Spotify", "details": response.json()}, status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON in request body"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

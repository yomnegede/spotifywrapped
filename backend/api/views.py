import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import environ
from .models import Wrapped
from .utils import get_music_personality_description


@csrf_exempt
def get_description(request):
    if request.method == "POST":
        try:
            # Parse the JSON data from the request
            data = json.loads(request.body)
            top_genres = data.get("topGenres", [])
            top_artists = data.get("topArtists", [])

            # Extract just the artist names from top_artists
            artist_names = [artist["name"] for artist in top_artists if "name" in artist]

            # Construct a more detailed prompt
            prompt = (
                f"Imagine a person who loves listening to genres like {top_genres} "
                f"and artists such as {artist_names}. Describe their personality, behavior, "
                f"fashion sense, and general outlook on life in a creative and engaging way."
                f"keep it under 50 words"
            )
            
            # Call the function to generate the description
            description = get_music_personality_description(prompt)
            return JsonResponse({"description": description}, status=200)
        except Exception as e:
            # Print the error to the console for debugging
            print("Error:", str(e))
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)



@csrf_exempt  # Disable CSRF protection for simplicity (not recommended for production)
def save_wrapped(request):
    if request.method == "POST":
        print("request reached the backend")
        try:
            # Parse the JSON data from the request
            data = json.loads(request.body)

            print("Received Data:", data)  # Log the received data

            # Get the user information from the request
            spotify_user_id = data.get("spotify_user_id")
            display_name = data.get("display_name", "Anonymous User")
            email = data.get("email", "no-email@example.com")
            country = data.get("country", "US")
            profile_image_url = data.get("profile_image_url", "")

            top_artists = data.get("top_artists", [])
            top_songs = data.get("top_songs", [])
            top_genres = data.get("top_genres", [])
            top_albums = data.get("top_albums", [])
            fun_fact = data.get("fun_fact", "No fun fact provided")
            recently_played = data.get("recently_played", [])
            saved_shows = data.get("saved_shows", [])
            is_public = data.get("is_public", False)

            # Create a new Wrapped entry
            wrapped_entry = Wrapped.objects.create(
                spotify_user_id=spotify_user_id,
                display_name=display_name,
                email=email,
                country=country,
                profile_image_url=profile_image_url,
                top_artists=top_artists,
                top_songs=top_songs,
                top_genres=top_genres,
                top_albums=top_albums,
                fun_fact=fun_fact,
                recently_played=recently_played,
                saved_shows=saved_shows,
                is_public=is_public
            )

            return JsonResponse({"message": "Wrapped data saved successfully!"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)

def get_public_wraps(request):
    if request.method == "GET":
        try:
            # Retrieve all Wrapped entries that are marked as public
            public_wraps = Wrapped.objects.filter(is_public=True)

            # Prepare the data to return
            wraps_data = [
                {
                    "spotify_user_id": wrap.spotify_user_id,
                    "display_name": wrap.display_name,
                    "email": wrap.email,
                    "country": wrap.country,
                    "profile_image_url": wrap.profile_image_url,
                    "top_artists": wrap.top_artists,
                    "top_songs": wrap.top_songs,
                    "top_genres": wrap.top_genres,
                    "top_albums": wrap.top_albums,
                    "fun_fact": wrap.fun_fact,
                    "recently_played": wrap.recently_played,
                    "saved_shows": wrap.saved_shows,
                    "created_at": wrap.created_at.isoformat(),  # Format the date to a string
                }
                for wrap in public_wraps
            ]

            return JsonResponse({"public_wraps": wraps_data}, status=200, safe=False)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)


def get_public_wrap(request, wrapId):
    try:
        # Fetch the specific public wrap based on the wrapId
        wrap = Wrapped.objects.get(spotify_user_id=wrapId, is_public=True)

        # Prepare the wrap data to return
        wrap_data = {
            "spotify_user_id": wrap.spotify_user_id,
            "display_name": wrap.display_name,
            "email": wrap.email,
            "country": wrap.country,
            "profile_image_url": wrap.profile_image_url,
            "top_artists": wrap.top_artists,
            "top_songs": wrap.top_songs,
            "top_genres": wrap.top_genres,
            "top_albums": wrap.top_albums,
            "fun_fact": wrap.fun_fact,
            "recently_played": wrap.recently_played,
            "saved_shows": wrap.saved_shows,
            "created_at": wrap.created_at.isoformat(),  # Format the date to a string
        }

        return JsonResponse(wrap_data, status=200)

    except Wrapped.DoesNotExist:
        return JsonResponse({"error": "Wrap not found or not public."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)




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
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


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Wrapped

@csrf_exempt  # Disable CSRF protection for simplicity (not recommended for production)
def save_wrapped(request):
    if request.method == "POST":
        print("request reached the backend")
        try:
            # Parse the JSON data from the request
            data = json.loads(request.body)
            print("Received Data:", data)  # Log the received data

            # Get the Spotify user ID and visibility status from the request
            spotify_user_id = data.get("spotify_user_id")
            is_public = data.get("is_public", False)

            # Check if a Wrapped entry with the given Spotify user ID already exists
            existing_entry = Wrapped.objects.filter(spotify_user_id=spotify_user_id).first()

            if existing_entry:
                # If the entry exists and the visibility status is different, update it
                if existing_entry.is_public != is_public:
                    existing_entry.is_public = is_public
                    existing_entry.save()
                    print("Updated wrap visibility status.")
                    return JsonResponse({"message": "Wrap visibility status updated successfully."}, status=200)
                
                print("Wrap data already exists in the database with the same visibility.")
                return JsonResponse({"message": "Wrap data already exists in the database with the same visibility."}, status=200)

            # If the entry does not exist, proceed to create a new Wrapped entry
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


@csrf_exempt
def get_user_wraps(request, display_name):
    try:
        wraps = Wrapped.objects.filter(display_name=display_name)

        wraps_data = [
            {
                "id": wrap.id,
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
                "created_at": wrap.created_at.isoformat(),
                "is_public": wrap.is_public,
            }
            for wrap in wraps
        ]

        return JsonResponse({"wraps": wraps_data}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@csrf_exempt
def delete_wrap(request, wrap_id):
    print("reached backend for delete")
    try:
        wrap = Wrapped.objects.get(id=wrap_id)
        wrap.delete()
        return JsonResponse({"message": "Wrap deleted successfully."}, status=200)

    except Wrapped.DoesNotExist:
        return JsonResponse({"error": "Wrap not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@csrf_exempt
def delete_wraps(request, display_name):

    print("reached backend for delete all wraps")

    """
    Deletes all wraps associated with the given display_name.
    """
    if request.method == "DELETE":
        try:
            # Query all wraps for the given display_name
            wraps_to_delete = Wrapped.objects.filter(display_name=display_name)
            
            if wraps_to_delete.exists():
                wraps_to_delete.delete()
                return JsonResponse(
                    {"message": f"{display_name}'s account has been deleted."},
                    status=200
                )
            else:
                return JsonResponse(
                    {"error": f"{display_name}'s account has been deleted."},
                    status=404
                )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Only DELETE is allowed."}, status=405)
    

@csrf_exempt
def update_wrap_visibility(request, wrap_id):
    print("reached backend for visibility")
    try:
        data = json.loads(request.body)
        is_public = data.get("is_public", False)

        wrap = Wrapped.objects.get(id=wrap_id)
        wrap.is_public = is_public
        wrap.save()

        return JsonResponse({"message": "Visibility updated successfully."}, status=200)

    except Wrapped.DoesNotExist:
        return JsonResponse({"error": "Wrap not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)



def get_wrap(request, wrapId):
    try:
        # Fetch the specific public wrap based on the wrapId
        wrap = Wrapped.objects.get(spotify_user_id=wrapId)

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
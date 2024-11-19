import os
import environ
import google.generativeai as genai

# Initialize environ
env = environ.Env()
# Read the .env file
environ.Env.read_env(os.path.join(os.path.dirname(__file__), '.env'))


# Retrieve the API key from environment variables
api_key = env("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

# Configure the Gemini API client
genai.configure(api_key=api_key)

def get_music_personality_description(prompt):
    try:
        # Initialize the model
        model = genai.GenerativeModel('gemini-1.5-flash')

        # Generate a response based on the prompt
        response = model.generate_content(prompt)

        # Return the generated text
        return response.text
    except Exception as e:
        print("Error generating text:", e)
        return "An error occurred while generating the description."

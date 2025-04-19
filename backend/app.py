from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# MongoDB URI
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://admin:admin@cluster0.n8sqmsf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# MongoDB setup
client = MongoClient(MONGODB_URI)
db = client["test"]  # Specify the database name here
users = db["users"]  # Get the users collection

@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Find the user by email in the MongoDB collection
    user = users.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404
    if user["password"] != password:
        return jsonify({"success": False, "message": "Incorrect password"}), 401

    return jsonify({"success": True, "message": "Login successful"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Check if user already exists
    if users.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists"}), 400

    # Insert the new user
    users.insert_one({"email": email, "password": password})
    return jsonify({"success": True, "message": "Signup successful"})

if __name__ == '__main__':
    app.run(debug=True)

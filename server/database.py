from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://sarumathymca25_db_user:SEVY13WdtRphc4SB@cluster0.6npo4ks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

try:
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    print("✅ MongoDB version:", client.server_info()["version"])
    db = client["feedback_db"]
    feedback_collection = db["feedbacks"]
except Exception as e:
    print("❌ MongoDB connection failed:", e)
    client = None

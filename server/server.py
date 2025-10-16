
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from model import Feedback,Login
from database import feedback_collection
from bson import ObjectId
app= FastAPI()
origins = [
    "https://feedbackform25.netlify.app",
    "http://localhost:5173",  
    "http://127.0.0.1:5173",  
]
app.add_middleware(
    CORSMiddleware,
      allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)

@app.post("/feedbacks")
def submit_feedback(feedback: Feedback):
    result = feedback_collection.insert_one(feedback.model_dump())
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to submit feedback")    
    return {"message": "Feedback submitted successfully", "id": str(result.inserted_id)}

@app.get("/feedbacks")
def get_feedbacks(page: int = Query(1, ge=1), limit: int = Query(5, ge=1, le=50)):
    skip = (page - 1) * limit
    total = feedback_collection.count_documents({})
    feedbacks = list(
        feedback_collection.find().sort("_id", -1).skip(skip).limit(limit)
    )
    for f in feedbacks:
        f["_id"] = str(f["_id"])
    return {"total": total, "page": page, "limit": limit, "data": feedbacks}

@app.post("/login")
def login(payload:Login):
    if payload.username == "admin" and payload.password == "password123":
        return {"message": "Login successful","token":payload.password}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
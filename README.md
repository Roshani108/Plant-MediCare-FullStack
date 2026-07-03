# 🌿 LeafCare
**AI-powered plant disease diagnosis platform** built using **Node.js, Express.js, MongoDB, TensorFlow, Python, and MobileNetV2**.

LeafCare enables users to upload an image of a plant and instantly receive:
- 🌱 Disease prediction
- 📊 Confidence score
- ⚠️ Severity assessment
- 💊 Treatment recommendations
- 🛒 Product suggestions
- 🌿 DIY remedies

# 📑 Table of Contents

- About
- Features
- Screenshots
- Tech Stack
- Architecture
- Project Structure
- Getting Started
- Environment Variables
- API Reference
- Database Schema
- AI Model
- Performance
- Deployment
- Mobile Integration
- Troubleshooting
- Security
- Future Scope
- Resume Highlights
- Author
- License

# 🌱 About

LeafCare is a production-ready full-stack web application that leverages deep learning to identify plant diseases from uploaded images. The application combines a custom-trained MobileNetV2 model with a secure REST API to deliver disease predictions along with treatment plans, prevention tips, product recommendations, and DIY remedies.

The backend follows an MVC architecture, exposes JWT-protected REST endpoints, and is designed to work with both web and React Native clients.

---

# ⭐ Features

## 🤖 AI Engine

- Disease Detection
- 95.2% Validation Accuracy
- Confidence Score
- Severity Prediction
- Treatment Recommendations
- DIY Remedies
- Commercial Product Suggestions

## 🌿 Plant Management

- Plant Dashboard
- Watering Logs
- Diagnosis History
- Health Score Tracking

## 🔐 Authentication

- JWT Authentication
- bcrypt Password Hashing
- Protected REST APIs

## 🚀 Engineering

- MVC Architecture
- REST API
- Multer Image Upload
- MongoDB Atlas
- Python-TensorFlow Integration
- React Native Ready

---

# 📸 Screenshots

Add screenshots here:

- Login Page
- Dashboard
- Plant Diagnosis
- History
- Plant Tracker

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| AI | TensorFlow, Keras, MobileNetV2 |
| Upload | Multer |
| Deployment | Render, Netlify, MongoDB Atlas |

---

# 🏗 Architecture

```text
Frontend / React Native
          │
          ▼
    Express REST API
      │          │
      ▼          ▼
 MongoDB     Python AI
                  │
            MobileNetV2
```

---

# 📂 Project Structure

```text
leafcare/
├── backend/
├── frontend/
├── ml_model/
├── uploads/
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- Python 3.9+
- MongoDB
- Git

## Installation

```bash
git clone <repository>

cd backend

npm install

pip install tensorflow pillow numpy

npm run dev
```

---

# ⚙ Environment Variables

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=7d
```

---

# 📡 API Reference

## Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

## Plants

GET /api/plants

POST /api/plants

PUT /api/plants/:id

DELETE /api/plants/:id

PUT /api/plants/:id/water

## Diagnosis

POST /api/diagnose

GET /api/diagnose/history

GET /api/diagnose/plant/:id

GET /api/health

---

# 🗄 Database Schema

Collections

- Users
- Plants
- Diagnoses

Relationships

User → Plants

User → Diagnoses

Plant → Diagnoses

---

# 🤖 AI Model

Dataset: PlantVillage

Images: 54,305+

Classes: 38

Architecture: MobileNetV2

Training: Transfer Learning

Framework: TensorFlow/Keras

Platform: Google Colab (T4 GPU)

Validation Accuracy: **95.2%**

Inference Pipeline

1. Upload image
2. Multer stores image
3. Node launches Python process
4. TensorFlow loads model
5. Predict disease
6. Store result in MongoDB
7. Return JSON response

---

# 📊 Performance

| Metric | Value |
|--------|------|
| Validation Accuracy | 95.2% |
| Dataset | 54,305 Images |
| Disease Classes | 38 |
| REST APIs | 12+ |
| Authentication | JWT |
| Database | MongoDB Atlas |

---

# ☁ Deployment

Backend

- Render

Frontend

- Netlify

Database

- MongoDB Atlas

Monitoring

- UptimeRobot

---

# 📱 Mobile Integration

The backend returns structured JSON responses protected with Bearer Token authentication, making it directly consumable by React Native applications.

---

# 🔒 Security

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Environment Variables
- Image Validation
- CORS Protection

---

# 🚀 Future Scope

- TensorFlow Lite Offline Inference
- React Native App
- Multi-language Support
- Weather-based Recommendations
- Disease Progress Tracking
- AI Chat Assistant
- Farmer Community

---

# 💼 Resume Highlights

- Built a production-ready full-stack AI application using Node.js, Express.js, MongoDB, TensorFlow and MobileNetV2.
- Trained a MobileNetV2 model on 54,000+ PlantVillage images achieving 95.2% validation accuracy.
- Integrated Python TensorFlow inference into a Node.js backend using child processes.
- Designed JWT-secured REST APIs with MVC architecture and MongoDB Atlas deployment.

---

# 👩‍💻 Author

**Roshani**

GitHub: https://github.com/Roshani108

If you found this repository useful, consider giving it a ⭐.

---

# 📄 License

MIT License

Made with 💚 to help plant lovers detect diseases faster.

# 🏠 Home Security System for Gated Communities (MERN Stack)

This project is a security solution designed for gated community homes, built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It addresses a common issue where watchmen or security guards cannot verify the identity of guests claiming to be invited by residents.

---

## 🛑 Problem Addressed

In many residential communities, a visitor may claim to be associated with a resident without any reliable verification. This poses a security risk, as the watchman cannot confirm the legitimacy of the visitor’s claim.

---

## ✅ Solution Provided

This system introduces a **secure guest verification workflow**:

1. The watchman registers the guest’s name and phone number upon arrival.
2. The system sends a **One-Time Password (OTP)** to the guest’s phone.
3. The guest must enter the OTP for identity verification.
4. Once verified, the **resident receives a notification** with guest details.
5. The resident can **approve or reject** the guest’s entry in real-time.
6. Only upon approval, the **watchman grants entry** to the guest.

---

## ✨ Key Features

- ✅ OTP-based guest identity verification  
- ✅ Resident approval system before entry  
- ✅ Real-time communication between watchman, guest, and resident  
- ✅ Secure backend using Node.js & Express  
- ✅ Responsive frontend using React.js  
- ✅ MongoDB for data persistence  

---

## 🛠 Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication & Verification:** OTP via SMS *(e.g., Twilio)*

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
```bash
git clone https://github.com/Mani0606/HomeSecurity.git
cd HomeSecurity

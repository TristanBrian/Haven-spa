from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory storage for users, stylists, and appointments
users = []
stylists = []
appointments = []

@app.route('/register', methods=['POST'])
def register_user():
    user_data = request.json
    users.append(user_data)
    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/stylists', methods=['GET'])
def get_stylists():
    return jsonify(stylists), 200

@app.route('/book', methods=['POST'])
def book_appointment():
    appointment_data = request.json
    appointments.append(appointment_data)
    return jsonify({"message": "Appointment booked successfully!"}), 201

@app.route('/appointments', methods=['GET'])
def get_appointments():
    return jsonify(appointments), 200

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory storage for users
users = {}  # Using a dictionary for user storage

# Create a default admin user
admin_username = "admin"
admin_password = hashlib.sha256("admin123".encode()).hexdigest()
users[admin_username] = {'password': admin_password, 'role': 'Admin'}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    role = data['role']  # Get the role from the request
    if username in users:
        return jsonify({'message': 'User already exists!'}), 400
    # Hash the password for security
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    users[username] = {'password': hashed_password, 'role': role}  # Store role with user
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/admin/add-stylist', methods=['POST'])
def add_stylist():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username in users:
        return jsonify({'message': 'Stylist already exists!'}), 400
    # Hash the password for security
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    users[username] = {'password': hashed_password, 'role': 'Stylist'}  # Default role as Stylist
    return jsonify({'message': 'Stylist added successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    # Check for default admin credentials
    if username == admin_username and hashed_password == admin_password:
        return jsonify({'message': 'Login successful!', 'role': 'Admin', 'redirect': '/admin/dashboard'}), 200
    
    if username in users and users[username]['password'] == hashed_password:
        return jsonify({'message': 'Login successful!', 'role': users[username]['role'], 'redirect': f"/{users[username]['role'].lower()}/dashboard"}), 200
    
    return jsonify({'message': 'Invalid username or password!'}), 401

@app.route('/users', methods=['GET'])
def list_users():
    print(users)  # Log the current users to the console
    return jsonify(users), 200

if __name__ == '__main__':
    app.run(debug=True)

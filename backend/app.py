from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS
from flask_mysqldb import MySQL
from database import init_db, add_user, get_all_users
from flask_mail import Mail, Message
import logging

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'lessusbrian7@gmail.com'  # Your Gmail address
app.config['MAIL_PASSWORD'] = 'qoih uaqk oyrw fsze'  # Your Gmail password or app password
app.config['MAIL_DEFAULT_SENDER'] = 'lessusbrian7@gmail.com'  # Default sender
mail = Mail(app)

# Enable CORS for requests from localhost:3000
CORS(app, resources={r"/contact": {"origins": "http://localhost:3000"}})

# Initialize the database
init_db()

# MYSQL config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'haven_spa_db'
mysql = MySQL(app)

# Create a default admin user if it doesn't exist
admin_username = "admin"
admin_password = hashlib.sha256("admin123".encode()).hexdigest()

if not any(user[1] == admin_username for user in get_all_users()):
    add_user(admin_username, admin_password, 'Admin')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    role = data['role']  # Get the role from the request
    if username in [user[1] for user in get_all_users()]:
        return jsonify({'message': 'User already exists!'}), 400
    # Hash the password for security
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    add_user(username, hashed_password, role)  # Store role with user
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    logging.info(f"Received contact form data: {data}")  # Log the incoming data
    msg = Message('New Contact Form Submission', sender='lessusbrian7@gmail.com', recipients=['company_email@example.com'])
    msg.body = f"Name: {data['firstName']} {data['lastName']}\nEmail: {data['email']}\nPhone: {data['phone']}\nMessage: {data['message']}"

    try:
        mail.send(msg)
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")  # Log the error
        return jsonify({'message': 'Failed to send email.', 'error': str(e)}), 500

@app.route('/admin/add-stylist', methods=['POST'])
def add_stylist():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username in [user[1] for user in get_all_users()]:
        return jsonify({'message': 'Stylist already exists!'}), 400
    # Hash the password for security
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    add_user(username, hashed_password, 'Stylist')  # Default role as Stylist
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
    
    if username in get_all_users() and get_all_users()[username]['password'] == hashed_password:
        return jsonify({'message': 'Login successful!', 'role': get_all_users()[username]['role'], 'redirect': f"/{get_all_users()[username]['role'].lower()}/dashboard"}), 200
    
    return jsonify({'message': 'Invalid username or password!'}), 401

@app.route('/users', methods=['GET'])
def list_users():
    return jsonify(get_all_users()), 200

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS
from flask_mysqldb import MySQL
from database import init_db, add_user, get_all_users, add_appointment, get_appointments_for_user, update_appointment_status, delete_appointment, get_all_stylists, get_all_appointments
from flask_mail import Mail, Message
import logging
from datetime import datetime, timedelta
import threading

app = Flask(__name__)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'lessusbrian7@gmail.com'  # Your Gmail address
app.config['MAIL_PASSWORD'] = 'qoih uaqk oyrw fsze'  # Your Gmail password or app password
app.config['MAIL_DEFAULT_SENDER'] = 'lessusbrian7@gmail.com'  # Default sender
mail = Mail(app)

# Configure CORS to allow all routes from frontend
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Initialize the database
init_db()

# MYSQL config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@Bray124'
app.config['MYSQL_DB'] = 'haven'
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
        logging.warning(f"User registration failed: {username} already exists.")
        return jsonify({'message': 'User already exists!'}), 400
    # Hash the password for security
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    add_user(username, hashed_password, role)  # Store role with user
    logging.info(f"User registered successfully: {username}")
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    logging.info(f"Received contact form data: {data}")  # Log the incoming data
    
    # Insert contact form data into the database
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute('INSERT INTO contact_submissions (first_name, last_name, email, phone, message) VALUES (%s, %s, %s, %s, %s)', 
                   (data['firstName'], data['lastName'], data['email'], data['phone'], data['message']))
    conn.commit()
    
    msg = Message('New Contact Form Submission', sender='lessusbrian7@gmail.com', recipients=['company_email@example.com'])
    msg.body = f"Name: {data['firstName']} {data['lastName']}\nEmail: {data['email']}\nPhone: {data['phone']}\nMessage: {data['message']}"

    try:
        mail.send(msg)
        return jsonify({'message': 'Email sent successfully!'}), 200
    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")  # Log the error
        return jsonify({'message': 'Failed to send email.', 'error': str(e)}), 500

@app.route('/api/admin/add-stylist', methods=['POST', 'OPTIONS'])
def add_stylist():
    try:
        if request.method == 'OPTIONS':
            # Handle preflight request
            response = jsonify({'message': 'Preflight request accepted'})
            return response
            
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        username = data.get('username')
        if not username:
            return jsonify({'error': 'Username is required'}), 400
            
        # Generate a default password if not provided
        password = data.get('password', 'defaultPassword123')
            
        expertise = data.get('expertise', 'Hair Styling')
        availability = data.get('availability', 'Mon-Fri 9AM-6PM')
        
        if username in [user[1] for user in get_all_users()]:
            return jsonify({'error': 'Stylist already exists!'}), 409
            
        # Hash the password for security
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # Add user with additional stylist fields
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO users (username, password, role, expertise, availability) VALUES (%s, %s, %s, %s, %s)',
            (username, hashed_password, 'stylist', expertise, availability)
        )
        conn.commit()
        
        return jsonify({'message': 'Stylist added successfully!'}), 201
        
    except Exception as e:
        app.logger.error(f'Error adding stylist: {str(e)}')
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'Preflight request accepted'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
        
    data = request.get_json()
    username = data['username']
    password = data['password']
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    # Check for default admin credentials
    if username == admin_username and hashed_password == admin_password:
        logging.info(f"Admin login successful: {username}")
        return jsonify({'message': 'Login successful!', 'role': 'Admin', 'redirect': '/admin'}), 200
    
    users = get_all_users()
    user_dict = {user[1]: {'password': user[2], 'role': user[4]} for user in users}  # Create a dictionary for easier access
    if username in user_dict:
        logging.info(f"User found: {username}")
        if user_dict[username]['password'] == hashed_password:
            logging.info(f"User login successful: {username}")
            role = user_dict[username]['role'] or 'User'  # Default to 'User' if role is None
            return jsonify({'message': 'Login successful!', 'role': role, 'redirect': f"/{role.lower()}"}), 200
        else:
            logging.warning(f"Login failed: Invalid password for {username}.")
    else:
        logging.warning(f"Login failed: User {username} not found.")
    
    return jsonify({'message': 'Invalid username or password!'}), 401

@app.route('/api/users', methods=['GET', 'POST'])
def get_users():
    # Get only username, role, and expertise fields
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute('SELECT username, role, expertise FROM users')
    users_data = cursor.fetchall()
    logging.info(f"Fetched users data")  # Log all users
    
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        role = 'Stylist'  # Default role for new users
        add_user(username, hashlib.sha256(password.encode()).hexdigest(), role)
        return jsonify({'message': 'Stylist added successfully!'}), 201

    users = [
        {
            'username': user[1],
            'role': user[2],
            'expertise': user[3] if user[2] == 'stylist' else None
        } for user in users_data
    ]
    
    logging.info(f"Returning {len(users)} users")
    return jsonify(users), 200

@app.route('/api/schedule/<username>', methods=['GET'])
def get_stylist_schedule(username):
    appointments = get_appointments_for_user(username)
    return jsonify(appointments), 200

@app.route('/api/appointments/<username>', methods=['GET'])
def get_user_appointments(username):
    appointments = get_appointments_for_user(username)
    return jsonify(appointments), 200

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    customer_id = data['customer_id']
    stylist_id = data['stylist_id']
    date_time = data['date_time']
    service_type = data['service_type']
    status = data['status']
    
    try:
        add_appointment(customer_id, stylist_id, service_type, date_time, status)
        send_reminder(customer_id, stylist_id, date_time)  # Schedule reminder
        return jsonify({'message': 'Appointment created successfully!'}), 201
    except Exception as e:
        logging.error(f"Error creating appointment: {str(e)}")
        return jsonify({'message': 'Failed to create appointment.', 'error': str(e)}), 500

@app.route('/api/reports', methods=['GET'])
def get_reports():
    stylists = get_all_stylists()
    appointments = get_all_appointments()
    users = get_all_users()  # Assuming this function is already defined

    return jsonify({
        'stylists': stylists,
        'appointments': appointments,
        'users': users
    }), 200
    user_id = request.args.get('user_id')
    appointments = get_appointments_for_user(user_id)
    return jsonify(appointments), 200

@app.route('/api/appointments/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    data = request.get_json()
    new_status = data['status']
    update_appointment_status(appointment_id, new_status)
    return jsonify({'message': 'Appointment status updated successfully!'}), 200

@app.route('/api/appointments/<int:appointment_id>', methods=['DELETE'])
def delete_appointment_route(appointment_id):
    delete_appointment(appointment_id)
    return jsonify({'message': 'Appointment deleted successfully!'}), 200

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute('DELETE FROM users WHERE id = %s', (user_id,))
        conn.commit()
        return jsonify({'message': 'User deleted successfully!'}), 200
    except Exception as e:
        logging.error(f"Error deleting user: {str(e)}")
        return jsonify({'message': 'Failed to delete user', 'error': str(e)}), 500

def send_reminder(customer_id, stylist_id, date_time):
    # Calculate the time for the reminder (e.g., 1 hour before the appointment)
    reminder_time = datetime.strptime(date_time, '%Y-%m-%dT%H:%M') - timedelta(hours=1)
    current_time = datetime.now()
    
    if reminder_time > current_time:
        # Schedule the reminder
        threading.Timer((reminder_time - current_time).total_seconds(), send_email_reminder, args=[customer_id, stylist_id, date_time]).start()

def send_email_reminder(customer_id, stylist_id, date_time):
    # Logic to send email reminder
    msg = Message('Appointment Reminder', recipients=[f'customer_{customer_id}@example.com'])  # Replace with actual customer email
    msg.body = f'Reminder: You have an appointment with stylist ID {stylist_id} on {date_time}.'
    
    try:
        mail.send(msg)
        logging.info(f'Reminder sent to customer {customer_id} for appointment on {date_time}.')
    except Exception as e:
        logging.error(f'Error sending reminder: {str(e)}')

if __name__ == '__main__':
    app.run(debug=True)

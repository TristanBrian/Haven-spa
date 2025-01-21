from flask import Flask, request, jsonify
import hashlib
from flask_cors import CORS
from flask_mysqldb import MySQL
from database import init_db, add_user, get_all_users

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the database
init_db()

#MYSQL config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD']='1234'
app.config['MYSQL_DB']= 'haven_spa_db'
MySQL = MySQL(app)

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
    
    users = get_all_users()
    for user in users:
        if user[1] == username and user[2] == hashed_password:
            return jsonify({'message': 'Login successful!', 'role': user[3], 'redirect': f"/{user[3].lower()}/dashboard"}), 200
    
    return jsonify({'message': 'Invalid username or password!'}), 401

@app.route('/users', methods=['GET'])
def list_users():
    users = get_all_users()
    return jsonify([{ 'username': user[1], 'role': user[3] } for user in users]), 200

@app.route('/stylists', methods=['GET'])
def get_stylists():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM stylists")  # Adjust the query as needed
    results = cur.fetchall()
    stylists = [{'id': row[0], 'name': row[1], 'expertise': row[2], 'availability': row[3]} for row in results]
    return jsonify(stylists), 200

@app.route('/customer-details', methods=['GET'])
def get_customer_details():
    # Logic to return customer details
    customer = {
        "id": 1,
        "name": "Jane Smith",
        "appointments": ["2023-10-01", "2023-10-15"]
    }
    return jsonify(customer), 200

@app.route('/update-stylist', methods=['PUT'])
def update_stylist():
    data = request.get_json()
    # Logic to update the stylist's expertise and availability
    return jsonify({'message': 'Stylist details updated successfully!'}), 200

@app.route('/test-db', methods=['GET'])
def test_db():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT 1")  # Simple query to test the connection
        return jsonify({'message': 'Database connection is valid!'}), 200
    except Exception as e:
        return jsonify({'message': 'Database connection failed!', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

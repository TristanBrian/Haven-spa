import mysql.connector
import logging

def init_db():
    # Create database if it doesn't exist
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124"
    )
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS haven")
    conn.close()

    # Connect to the newly created database
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL,
            expertise VARCHAR(255),
            availability VARCHAR(255)
        )
    ''')

    # Create services table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS services (
            service_id INT AUTO_INCREMENT PRIMARY KEY,
            service_name VARCHAR(100) NOT NULL,
            duration VARCHAR(50),
            price DECIMAL(10, 2)
        )
    ''')

    # Create appointments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS appointments (
            appointment_id INT AUTO_INCREMENT PRIMARY KEY,
            customer_id INT,
            stylist_id INT,
            service_id INT,
            date_time DATETIME,
            status VARCHAR(50),
            FOREIGN KEY (customer_id) REFERENCES users(id),
            FOREIGN KEY (stylist_id) REFERENCES users(id),
            FOREIGN KEY (service_id) REFERENCES services(service_id)
        )
    ''')
    
    conn.commit()
    conn.close()

def add_user(username, password, role):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('INSERT INTO users (username, password, role) VALUES (%s, %s, %s)', (username, password, role))
    
    conn.commit()
    conn.close()

def get_all_users():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('SELECT id, username, password, role, expertise, availability FROM users')
    users = cursor.fetchall()
    
    logging.info(f"Retrieved users from database: {users}")  # Log the retrieved users
    
    conn.close()
    return users

def get_all_stylists():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM users WHERE role = "Stylist"')
    stylists = cursor.fetchall()
    
    conn.close()
    return stylists

def get_all_appointments():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM appointments')
    appointments = cursor.fetchall()
    
    conn.close()
    return appointments

def add_appointment(customer_id, stylist_id, service_id, date_time, status):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('INSERT INTO appointments (customer_id, stylist_id, service_id, date_time, status) VALUES (%s, %s, %s, %s, %s)', 
                   (customer_id, stylist_id, service_id, date_time, status))
    
    conn.commit()
    conn.close()

def get_appointments_for_user(user_id):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM appointments WHERE customer_id = %s OR stylist_id = %s', (user_id, user_id))
    appointments = cursor.fetchall()
    
    conn.close()
    return appointments

def update_appointment_status(appointment_id, new_status):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('UPDATE appointments SET status = %s WHERE appointment_id = %s', (new_status, appointment_id))
    
    conn.commit()
    conn.close()

def delete_appointment(appointment_id):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="@Bray124",
        database="haven"
    )
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM appointments WHERE appointment_id = %s', (appointment_id,))
    
    conn.commit()
    conn.close()

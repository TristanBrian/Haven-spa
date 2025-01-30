import mysql.connector

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
            role VARCHAR(50) NOT NULL
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
    
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    
    conn.close()
    return users

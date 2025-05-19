from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='123456',
        database='typinggame'
    )

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'success': False, 'message': 'Missing fields'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Check for existing username or email
        cursor.execute('SELECT id FROM users WHERE username = %s OR email = %s', (username, email))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'Username or email already exists!'}), 409
        cursor.execute(
            'INSERT INTO users (username, email, password) VALUES (%s, %s, %s)',
            (username, email, password)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'message': 'User registered successfully'})
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'success': False, 'message': 'Missing fields'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT username, id FROM users WHERE username = %s AND password = %s',
            (username, password)
        )
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        if user:
            return jsonify({'success': True, 'username': user[0], 'id': user[1]})
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password!'}), 401
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

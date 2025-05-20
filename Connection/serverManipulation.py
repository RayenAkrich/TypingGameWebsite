# This file was renamed from signup_server.py to serverManipulation.py
# All logic and endpoints remain unchanged.

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

@app.route('/api/timeattack/score', methods=['POST'])
def timeattack_score():
    data = request.get_json()
    user_id = data.get('userId')
    username = data.get('username')
    score = float(data.get('score'))
    if not user_id or not username or score is None:
        return jsonify({'success': False, 'message': 'Missing fields'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Get current record
        cursor.execute('SELECT MAX(score) FROM scoreboard WHERE userName = %s', (username,))
        row = cursor.fetchone()
        broke_record = False
        if not row[0] or score > row[0]:
            broke_record = True
        # Insert new score
        cursor.execute('INSERT INTO scoreboard (idUser, userName, score) VALUES (%s, %s, %s)', (user_id, username, score))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'brokeRecord': broke_record})
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/racewords/score', methods=['POST'])
def racewords_score():
    data = request.get_json()
    user_id = data.get('userId')
    username = data.get('username')
    score = float(data.get('score'))
    if not user_id or not username or score is None:
        return jsonify({'success': False, 'message': 'Missing fields'}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Get current record
        cursor.execute('SELECT MAX(score) FROM scoreboard WHERE userName = %s', (username,))
        row = cursor.fetchone()
        broke_record = False
        if not row[0] or score > row[0]:
            broke_record = True
        # Insert new score
        cursor.execute('INSERT INTO scoreboard (idUser, userName, score) VALUES (%s, %s, %s)', (user_id, username, score))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'brokeRecord': broke_record})
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT userName, MAX(score) as max_score FROM scoreboard GROUP BY userName ORDER BY max_score DESC LIMIT 20')
        rows = cursor.fetchall()
        scores = [{'username': row[0], 'score': round(row[1], 2)} for row in rows]
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'scores': scores})
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

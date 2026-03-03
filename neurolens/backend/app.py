from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from models import db, Parent, Child, ScreeningSession
from scoring import calculate_autism_risk
from hardware_mock import get_live_metric_frame
import threading

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///neurolens.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.init_app(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Create Database Tables
with app.app_context():
    db.create_all()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        new_parent = Parent(
            name=data['parent_name'], 
            email=data['email'], 
            phone=data['phone'], 
            consent_given=data['consent']
        )
        db.session.add(new_parent)
        db.session.flush() # Get parent ID
        
        new_child = Child(
            parent_id=new_parent.id, 
            name=data['child_name'], 
            age_months=data['child_age']
        )
        db.session.add(new_child)
        db.session.commit()
        
        return jsonify({"message": "Registration successful", "child_id": new_child.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/api/screening/calculate', methods=['POST'])
def calculate_results():
    data = request.json
    child_id = data.get('child_id')
    metrics = data.get('risk_deviation_scores')
    
    result = calculate_autism_risk(metrics)
    
    new_session = ScreeningSession(
        child_id=child_id,
        final_risk_score=result['final_risk_percentage'],
        risk_category=result['risk_category']
    )
    db.session.add(new_session)
    db.session.commit()
    
    return jsonify({
        "session_id": new_session.id,
        "results": result
    }), 200

# Background thread to emit live mock hardware data
def background_hardware_thread():
    while True:
        data = get_live_metric_frame()
        socketio.emit('live_metrics', data)
        socketio.sleep(1) # Safe sleep for Flask-SocketIO

@socketio.on('connect')
def handle_connect():
    print("Dashboard connected to Live Hardware Feed")
    socketio.start_background_task(background_hardware_thread)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)
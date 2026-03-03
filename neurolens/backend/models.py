from flask_sqlalchemy import SQLAlchemy
import uuid
from datetime import datetime

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())

class Parent(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    consent_given = db.Column(db.Boolean, default=True)
    children = db.relationship('Child', backref='parent', lazy=True)

class Child(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    parent_id = db.Column(db.String(36), db.ForeignKey('parent.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    age_months = db.Column(db.Integer, nullable=False)
    sessions = db.relationship('ScreeningSession', backref='child', lazy=True)

class ScreeningSession(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    child_id = db.Column(db.String(36), db.ForeignKey('child.id'), nullable=False)
    session_date = db.Column(db.DateTime, default=datetime.utcnow)
    final_risk_score = db.Column(db.Float)
    risk_category = db.Column(db.String(20)) # Low, Moderate, High
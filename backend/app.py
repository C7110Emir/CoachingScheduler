import datetime
import os
import json
import re
from flask import Flask, request
import sqlite3
from flask_sqlalchemy import SQLAlchemy
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

file_path = os.path.abspath(os.getcwd())+"/database.db"


app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + file_path
db = SQLAlchemy(app)


def get_data(coachEmail, coachPassword, coach):

    get_slots = []

    coachId = 0

    for dict in coach:
        coachId = dict['id']

    get_all_available_slots = Slots.query.filter_by(
        coach_id=coachId, is_booked=0)

    for slot in get_all_available_slots:
        slot_data = {
            'coach_id': slot.coach_id,
            'id': slot.id,
            'student_id': slot.student_id,
            'start_time': slot.start_time,
            'end_time': slot.end_time,
            'is_booked': slot.is_booked,
            'is_ended': slot.is_ended
        }

        get_slots.append(slot_data)

    booked_slots = Slots.query.filter_by(is_booked=1, coach_id=coachId)

    scheduled_slots = []
    for booked_slot in booked_slots:
        booked_data = {
            'id': booked_slot.id,
            'coach_id': booked_slot.coach_id,
            'student_id': booked_slot.student_id,
            'start_time': booked_slot.start_time,
            'end_time': booked_slot.end_time,
            'is_booked': booked_slot.is_booked,
            'is_ended': booked_slot.is_ended
        }
        scheduled_slots.append(booked_data)

    ended_sessions = []

    results = db.session.query(Slots, Feedbacks).join(
        Feedbacks, Slots.id == Feedbacks.slot_id).filter(Slots.is_booked == 1, Slots.is_ended == 1, Slots.coach_id == coachId, Feedbacks.coach_id == coachId).all()

    for booked_s, feedback in results:
        ended_sessions.append(
            {
                'id': booked_s.id,
                'coach_id': booked_s.coach_id,
                'student_id': booked_s.student_id,
                'start_time': booked_s.start_time,
                'end_time': booked_s.end_time,
                'is_booked': booked_s.is_booked,
                'is_ended': booked_s.is_ended,
                'rating': feedback.rating,
                'message': feedback.message,
                'slot_id': feedback.slot_id,

            }
        )

    data = {
        "coach_info": coach,
        "displayInfo": {
            "available_slots": get_slots
        },
        "scheduled_slots": scheduled_slots,
        "ended_sessions":  ended_sessions
    }
    return json.dumps(data)


class Coach(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(25), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(25), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class Slots(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coach_id = db.Column(db.Integer, db.ForeignKey('coach.id'), nullable=False)
    student_id = db.Column(
        db.Integer, db.ForeignKey('student.id'), nullable=True)
    start_time = db.Column(db.String(100), nullable=False)
    end_time = db.Column(db.String(100), nullable=False)
    is_booked = db.Column(db.Integer, default=False)
    is_ended = db.Column(db.Integer, default=False)

    def __init__(self, coach_id, student_id, start_time, end_time, is_booked, is_ended):
        self.coach_id = coach_id
        self.student_id = student_id
        self.start_time = start_time
        self.end_time = end_time
        self.is_booked = is_booked
        self.is_ended = is_ended


class Feedbacks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(1000), nullable=True)
    slot_id = db.Column(db.Integer, db.ForeignKey('slots.id'))
    coach_id = db.Column(db.Integer, db.ForeignKey('coach.id'))

    def __init__(self, rating, message, slot_id, coach_id):
        self.rating = rating
        self.message = message
        self.slot_id = slot_id
        self.coach_id = coach_id


def getCoach(coachEmail, coachPassword):
    findUser = Coach.query.filter_by(email=coachEmail, password=coachPassword)
    result = []
    for coach in findUser:
        coach_data = {
            'id': coach.id,
            'name': coach.name,
            # 'email': coach.email,
            # 'password': coach.password
        }
        result.append(coach_data)
    return result


def addSlot(coachId, startDateTime, endDateTime):
    slot = Slots(coachId, None, startDateTime, endDateTime, 0, 0)
    db.session.add(slot)
    db.session.commit()
    db.session.close()
    return slot


def get_student(student_email, student_password):

    findUser = Student.query.filter_by(
        email=student_email, password=student_password)
    result = []
    for student in findUser:
        srudent_data = {
            'id': student.id,
            'name': student.name,
            # 'email': student.email,
            # 'password': student.password
        }
        result.append(srudent_data)
    return result



async def coachAuthentication(coachEmail, coachPassword):
    coach = getCoach(coachEmail, coachPassword)

    if len(coach) > 0:
        return get_data(coachEmail, coachPassword, coach)
    return "Login failed. Invalid email or password"


def addAvailibilitySlotForCoach(coachId, startDateTime, endDateTime):
    addAvailibility = addSlot(coachId, startDateTime, endDateTime)

    return addAvailibility


@app.route("/coach/auth", methods=["POST"])
async def authenticate_coach():
    print(request.json)
    requestBody = request.json
    parsedBody = json.loads(requestBody["body"])
    # emailRegex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    coachEmail = parsedBody["email"]
    coachPassword = parsedBody["password"]
    # if not re.match(emailRegex, coachEmail):
    #     return "Invalid Email Address"
    print(coachEmail)
    return await coachAuthentication(coachEmail, coachPassword)


def get_slots(student):

    sid = 0
    for dict in student:
        sid = dict['id']

    booked_slots = Slots.query.filter_by(is_booked=0, student_id=sid)

    savilable_slots = []
    for booked_slot in booked_slots:
        booked_data = {
            'id': booked_slot.id,
            'coach_id': booked_slot.coach_id,
            'student_id': booked_slot.student_id,
            'start_time': booked_slot.start_time,
            'end_time': booked_slot.end_time,
            'is_booked': booked_slot.is_booked,
            'is_ended': booked_slot.is_ended
        }

        savilable_slots.append(booked_data)
    data = {
        "student_info": student,
        "lable_slots": savilable_slots,

    }
    return json.dumps(data)


async def studentAuthentication(student_email, student_password):
    student = get_student(student_email, student_password)

    if len(student) > 0:
        return get_slots(student)
    return "Login failed. Invalid email or password "


@app.route("/student/auth", methods=["POST"])
async def authenticate_student():
    print(request.json)
    requestBody = request.json
    parsedBody = json.loads(requestBody["body"])
    # emailRegex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    student_email = parsedBody["email"]
    student_password = parsedBody["password"]
    # if not re.match(emailRegex, coachEmail):
    #     return "Invalid Email Address"
    return await studentAuthentication(student_email, student_password)


@app.route("/coach/add_availibility_slot", methods=["POST"])
async def addAvailibilitySlot():
    requestBody = request.json
    parsedBody = json.loads(requestBody["body"])

    end_time = parsedBody("end_time")
    start_time = parsedBody("start_time")
    coach_id = parsedBody("coach_id")
    slots = Slots(coach_id, None, start_time, end_time )
    db.session.add(slots)
    db.session.commit()


@app.route("/feedback", methods=["GET"])
def add_feedback():
    
    requestBody = request.json
    parsedBody = json.loads(requestBody["body"])

    rating = parsedBody("rating")
    message = parsedBody("message")
    slot_id = parsedBody("slot_id")
    coach_id = parsedBody("coach_id")
    feedback = Feedbacks(rating, message, slot_id, coach_id)
    db.session.add(feedback)
    db.session.commit()

    return "Feedback added successfuly"


@app.route('/', methods=["GET"])
def run_app():
    return "running"


# with app.app_context():
#     coach1 = Coach("John Coach", "aaaa@gmail.com", "123321")
#     coach2 = Coach("Becky Smith", "kaska@gmail.com", "2436052")
#     coach3 = Coach("Ella Harmon", "hiitsella@gmail.com", "321123")

#     db.session.add_all([coach1, coach2, coach3])

#     # db.session.commit()
#     # student1 = Student("Aaron Jack", "aaronjack@gmail.com", "123321")
#     # student2 = Student("Gareth Toy", "garethtoy@gmail.com", "2436052")
#     # student3 = Student("Rylie Beth", "ryliebethgmail.com", "321123")
#     # db.session.add_all([student1,student2,student3])
#     # db.session.commit()
#     db.session.close_all()
# Authenticating the student/coach
# args: email, password
# returns 200 or 401
if __name__ == '__main__':
    app.run(host="localhost",debug=True)

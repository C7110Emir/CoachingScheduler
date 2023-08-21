# from app import db, app

# class Coach(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable= False)
#     email = db.Column(db.String(100), nullable= False)
#     password = db.Column(db.String(25), nullable= False)
    
#     def __init__(self, name, email, password):
#         self.name = name
#         self.email = email
#         self.password = password
        
# class Student(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), nullable= False)
#     password = db.Column(db.String(25), nullable= False)
    
#     def __init__(self, name, email, password):
#         self.name = name
#         self.email = email
#         self.password = password
        
# class Slots(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     coach_id = db.Column(db.Integer, db.ForeignKey('coach.id'), nullable=False)
#     student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable= True)
#     start_time = db.Column(db.DateTime, nullable=False)
#     end_time = db.Column(db.DateTime, nullable=False)
#     is_booked = db.Column(db.Boolean, default=False)
#     is_ended = db.Column(db.Boolean, default= False)

#     def __init__(self, coach_id, student_id, start_time, end_time, is_booked, is_ended):
#         self.coach_id = coach_id
#         self.student_id = student_id
#         self.start_time = start_time
#         self.end_time = end_time
#         self.is_booked = is_booked
#         self.is_ended = is_ended
        
# class Feedbacks(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     rating = db.Column(db.Integer, nullable=False)
#     message = db.Column(db.String(1000), nullable= True)
#     slot_id = db.Column(db.Integer, db.ForeignKey('slots.id'))
    
#     def __init__(self, rating, message, slot_id):
#         self.rating = rating
#         self.message = message
#         self.slot_id = slot_id
        

# with app.app_context():
#     # coach1 = Coach("John Coach", "aaaa@gmail.com", "123321")
#     # coach2 = Coach("Becky Smith", "kaska@gmail.com", "2436052")
#     # coach3 = Coach("Ella Harmon", "hiitsella@gmail.com", "321123")
#     # db.session.add_all([coach1, coach2, coach3])
#     # db.session.commit()
#     # student1 = Student("Aaron Jack", "aaronjack@gmail.com", "123321")
#     # student2 = Student("Gareth Toy", "garethtoy@gmail.com", "2436052")
#     # student3 = Student("Rylie Beth", "ryliebethgmail.com", "321123")
#     # db.session.add_all([student1,student2,student3])
#     # db.session.commit()
#     db.session.close_all()
#     def findUser(email, password):
#         find_user = Coach.query.filter_by(email= email, password= password).first()
#         return find_user

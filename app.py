from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Use your email provider's SMTP server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'karthiknaramala9949@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'vlur fija rcbr xisz'  # Replace with your app password

mail = Mail(app)

@app.route('/submit_form', methods=['POST'])
def submit_form():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    linkedin = data.get("linkedin")
    job_role = data.get("jobRole")
    message_content = data.get("message")

    msg = Message("New Hire Me Form Submission", sender=email, recipients=["karthiknaramala9949@gmail.com"])
    msg.body = f"""
    Name: {name}
    Email: {email}
    Phone: {phone}
    LinkedIn: {linkedin if linkedin else 'Not provided'}
    Job Role: {job_role}
    Message: {message_content}
    """

    try:
        mail.send(msg)
        return jsonify({"success": True, "message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)

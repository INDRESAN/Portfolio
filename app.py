from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from flask_mail import Mail, Message
import os
from datetime import datetime
from dotenv import load_dotenv

app = Flask(__name__, static_folder='static', template_folder='templates')
# Configuration for Flask-Mail
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['MAIL_SERVER']='live.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'indreshx2@gmail.com')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME', 'indreshx2@gmail.com')

load_dotenv()
# Initialize Flask-Mail
mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    try:
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Validate form data
        if not name or not email or not message:
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        # Create email message
        msg = Message(
            subject=f'New Contact Form Submission from {name}',
            recipients=['indreshx2@gmail.com'],  # Your Gmail address
            html=f'''
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            <hr>
            <p><small>Sent on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</small></p>
            ''',
            sender=app.config['MAIL_DEFAULT_SENDER'],
            reply_to=email  # This allows you to reply directly to the sender
        )
        
        # Send email
        mail.send(msg)
        
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'success': False, 'message': 'Failed to send message. Please try again.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, url_for, request, redirect
import requests
import json
import os
from flask_mail import Mail, Message

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')

mail = Mail(app)

github_user = 'SherlockH0'
my_email = 'daniil.davtian@gmail.com'

project_names = [
    'bookshelf',
]


def get_projects_from_github():
    projects = []

    for project_name in project_names:
        url = 'https://raw.githubusercontent.com/' + github_user + \
            '/' + project_name + '/main/description.json'

        try:
            response = requests.get(url)
        except Exception as e:
            print(e, '\noccurred loading project', project_name)

        if response.status_code != 200:
            print('Could not load', project_name, 'project :(')
            continue

        project = json.loads(response.text)
        projects.append(project)

    return projects


def send_email():
    sender_email = request.json.get('email', 'noreply@demo.com')
    message_text = request.json.get('message', '')
    sender_name = request.json.get('name', 'none')

    msg = Message(
        f'{sender_name} has a message for you',
        sender=sender_email,
        recipients=[my_email])

    kwargs = {'sender_email': sender_email,
              'message_text': message_text,
              'sender_name': sender_name}

    msg.body = render_template('email.txt', **kwargs)
    msg.html = render_template('email.html', **kwargs)

    mail.send(msg)


projects = get_projects_from_github()


@app.route("/", methods=['POST', 'GET'])
def home():
    return render_template(
        'index.html',
        projects=projects,
        base_url=request.base_url,
        host=request.host,
        my_email=my_email
    )


@app.route("/send_message/", methods=['POST'])
def send_message():
    send_email()

    return {
        'message': 'Message sent!'
    }


if __name__ == '__main__':
    app.run(debug=True)

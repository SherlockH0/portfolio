import json
import os

from flask import Flask, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["MAIL_SERVER"] = "smtp.googlemail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("EMAIL_USER")
app.config["MAIL_PASSWORD"] = os.environ.get("EMAIL_PASS")

mail = Mail(app)

MY_EMAIL = "daniil.davtian@gmail.com"


PROJECTS_FILE = "projects.json"


def get_projects():
    with open(PROJECTS_FILE, "r") as projects_file:
        projects = json.load(projects_file)

    return projects


def send_email():
    if request.json:
        try:
            sender_email = request.json.get("email", "noreply@demo.com")
            message_text = request.json.get("message", "")
            sender_name = request.json.get("name", "none")

            msg = Message(
                f"{sender_name} has a message for you",
                sender=sender_email,
                recipients=[MY_EMAIL],
            )

            kwargs = {
                "sender_email": sender_email,
                "message_text": message_text,
                "sender_name": sender_name,
            }

            msg.body = render_template("email.txt", **kwargs)
            msg.html = render_template("email.html", **kwargs)

            mail.send(msg)

            return {"status": "Message sent!"}, 200

        except Exception as e:

            print(e, f"occured trying to send an email")
        return {"status": "Server Error"}, 500

    else:
        return {"status": "Error"}, 400


@app.route("/", methods=["POST", "GET"])
def home():
    projects = get_projects()
    return render_template(
        "index.html",
        projects=projects,
        base_url=request.base_url,
        host=request.host,
        my_email=MY_EMAIL,
    )


@app.route("/send_message/", methods=["POST"])
def send_message():
    return send_email()


if __name__ == "__main__":
    app.run()

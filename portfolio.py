from flask import Flask, render_template, url_for
import requests
import json

app = Flask(__name__)

github_user = 'SherlockH0'

project_names = [
    'bookshelf',
    'slime'
]


def get_projects_from_github():
    projects = []

    for project in project_names:
        url = 'https://raw.githubusercontent.com/' + github_user + \
            '/' + project + '/main/description.json'

        response = requests.get(url)

        if response.status_code != 200:
            print('Could not load', project, 'project :(')
            continue

        project = json.loads(response.text)
        projects.append(project)

    return projects


@app.route("/")
@app.route("/home")
def home():

    return render_template(
        'index.html',
        projects=get_projects_from_github()
    )


if __name__ == '__main__':
    app.run(debug=True)

from turbo_flask import Turbo
from typing import List, Dict, Text
from flask import Flask, render_template, request

app = Flask(__name__)
turbo = Turbo(app)
messages: List[Dict[str, str]] = []


@app.route("/")
def index() -> Text:
	return render_template("index.html", title="Chat Box", messages=messages)


@app.route("/send", methods=("POST", ))
def send_message() -> Text:
	messages.append({
		"author": request.json["author"],
		"message": request.json["message"]
	})
	turbo.push(turbo.append(
		f"""
		<div class="message">
			<span class="author">{request.json['author']}</span>
			<br>
			<div class="value">{request.json['message']}</div>
		</div>
		""",
		"messages-box"
	))
	return "ok"


app.run(debug=True, port=8080, host="0.0.0.0")

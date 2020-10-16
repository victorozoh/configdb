from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/model")
def model():
    return render_template('model.html')

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=3000)
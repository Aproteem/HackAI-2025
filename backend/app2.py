from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Welcome to Flask!"

@app.route('/about')
def about():
    return "This is the about page."

@app.route('/dashboard')
def dashboard():
    return "Welcome to the dashboard."

@app.route('/chatbot')
def chatbot():
    return "This is the chatbot interface."

@app.route('/greet/<name>')
def greet(name):
    return f"Hello, {name}! Welcome to Flask!"

if __name__ == '__main__':
    app.run(debug=True)
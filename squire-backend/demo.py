from flask import Flask, request

app = Flask(__name__)

# hello world example


@app.route('/', methods=["GET"])
def hello_world():
    return 'Hello, World!'

# with route example


@app.route('/route1', methods=["GET"])
def route_hello_world():
    return 'Hello, World from route 1!'

# with params
# http://127.0.0.1:5000/route2?name=john
# changing parameter name should reflect in response
@app.route('/route2', methods=["GET"])
def hello_world_with_params():
    name = request.args.get("name")
    return f'Hello, {name}! from route 2'


if __name__ == '__main__':
    app.run()

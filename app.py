from flask import Flask, jsonify, render_template, request, redirect
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

#################################################
# Flask Setup
#################################################
# Instantiate a Flask object at __name__, and save it to a variable called app
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template("index.html")

@app.route("emission")
def emission():
    results = db.session.query(output.countyName, output.2006)

    return jsonify()

@app.route("/visualizations")
def visualizations():
    return render_template("visualizations.html")

@app.route("/discussion")
def discussion():
    return render_template("discussion.html")

@app.route("/data")
def data():
    return render_template("data.html")

if __name__ == '__main__':
app.run(port=5001, debug=True)
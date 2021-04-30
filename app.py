from flask import Flask, jsonify, render_template, request, redirect
import sqlite3
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import csv

#################################################
# Flask Setup
#################################################
# Instantiate a Flask object at __name__, and save it to a variable called app
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# engine = create_engine("sqlite:///db.sqlite")

# Base = automap_base()
# Base.prepare(engine, reflect=True)

## needs to be Base.classes."table name"
# co2 = Base.classes.CO2_emissions_per_capita
# population = Base.classes.population_total_by_country
# pytrend = Base.classes.keyword_search_volume_US

#################################################
# Flask Routes
#################################################
# index route
@app.route("/")
def index():
    return render_template("index.html")

# @app.route("emission")
# def emission():
#     #results = db.session.query(output.countyName, output.2006...)
#     # need to add all the jasons 
#     return jsonify()

# @app.route("/visualizations")
# def visualizations():
#     return render_template("visualizations.html")

# @app.route("/discussion")
# def discussion():
#     return render_template("discussion.html")

# @app.route("/data")
# def data():
#     return render_template("data.html")

if __name__ == "__main__":
    app.run(port=5001, debug=True)
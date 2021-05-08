from flask import Flask, jsonify, render_template, request, redirect
import pymongo
from flask_pymongo import PyMongo
import pandas as pd
import json
# From initdb import create_collection

#################################################
# Flask Setup
#################################################
# Instantiate a Flask object at __name__, and save it to a variable called app
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.dashbaord_db
# db = client.climate_change_db
# keywords = db.keywords
# co2_income = db.co2_income

#################################################
# Flask Routes
#################################################
# index route
@app.route("/")
def index():
    return render_template("index.html")

# @app.route("emission")
# def emission():
#     # results = db.session.query(output.countyName, output.2006...)
#     # need to add all the jasons 
#     return jsonify()

@app.route("/visualizations")
def visualizations():
    # get the count of total data points
    # count = list(keywords.find())
    # print(count)
    return render_template("visualizations.html")

@app.route("/data")
def data():
    return render_template("data.html")

@app.route("/keyword_search")
def keyword_search():
    results = db.keywords.find_one({}) #query collection pymongo
    
    return jsonify(results['data'])

@app.route("/geojson_map")
def jeojsaon_map():
    results = db.geojson.find_one({}) #query collection pymongo
    
    return jsonify(results['data'])

#@app.route("/geojason")
# def keyword_search():
#     results2 = #query collection pymongo
#     jsonified_resualts2 = #convert to json
#     return(jsonified_resualts2)

if __name__ == "__main__":
    app.run()

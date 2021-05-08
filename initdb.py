import pandas as pd
import pymongo
import json
import csv
from pymongo import MongoClient


# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# create db
db = client['dashbaord_db']

# connect to mongo db and collection
keywords = db['keywords']

keywords_df = pd.read_csv("data/keyword_search_volume_US.csv")
keywords_dict = keywords_df.to_dict("records")
keywords.insert_one({"data": keywords_dict})

# connect to mongo db and collection
jeojson = db['geojson']

jeojson_df = pd.read_json("data/data2.json")
jeojson_dict = jeojson_df.to_dict("records")
jeojson.insert_one({"data": jeojson_dict})




    

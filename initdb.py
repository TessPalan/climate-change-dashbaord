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
# Function to parse csv to dictionary

# # Final insert statement
# db.collection.insert_one(csv_to_dict())

# collection.insert_many(csv_to_json('your_file_path'))

# def create_collection():



    

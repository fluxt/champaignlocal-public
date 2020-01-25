from flask import Blueprint, request, jsonify
import json 
import pymongo
import os
import sys
import pymongo
from pymongo import MongoClient
from bson import ObjectId

#Encoder to manage the MongoDB object ID
#response with a string version 
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

#MongoDB config 

client = MongoClient("mongodb+srv://user:SQLPassword@flask-mongodb.rlb9i.mongodb.net/Forum?retryWrites=true&w=majority")
db = pymongo.database.Database(client, 'Forum')
collection = pymongo.collection.Collection(db, 'Discussion')

#Blueprints 
indexRoute = Blueprint( "index", __name__)
getRoute = Blueprint("getitems", __name__)
itemRoute = Blueprint("item", __name__)
updateRoute = Blueprint("update", __name__)

#routes
@indexRoute.route("/api/questions", methods = ['POST'])
def createQuestion():
    print(request, flush= True)

    title = request.json.get("Title")
    content = request.json.get("Content")
    comment = request.json.get("Comments")

    item = {
        "Title" : title,
        "Content": content,
        "Comment": [
            comment
        ],
    }

    db.Discussion.insert_one(item)
    return jsonify(data = "item created successfully")

@getRoute.route("/api/questions/getitems")
def ReturnQuestion():
    items = []
    #get all the items 
    cursor = db.Discussion.find({})
    for document in cursor:
        items.append({"_id": JSONEncoder().encode(document["_id"]), "Title": document["Title"], "Content": document["Content"], "Comment": document["Comment"]})

    return jsonify(data = items)

@itemRoute.route("/api/questions/item/<id>", methods=["GET"])
def items(id):
    cursor = db.Discussion.find_one({"_id": ObjectId(id)})
    print(cursor, flush = True)

    return jsonify(data = JSONEncoder().encode(cursor))

@updateRoute.route("/api/questions/update/<id>", methods = ["PUT"])
def update(id):
    print(request.json, flush = True)
    
    itemid = request.json.get("itemid")
    comment = request.json.get("Comment")

    db.Discussion.update_one({"_id": ObjectId(itemid)}, {'$push': {'Comment': comment}})
    return jsonify(data = "update response")
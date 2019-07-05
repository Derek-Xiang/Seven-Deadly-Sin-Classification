### Program: Restful API for the web front end
### Group: 50
### Author: Dejun Xiang (ID:349329)


from flask import Flask, request, render_template, jsonify
from flask_restful import Resource,Api
from flask_restful.utils import cors
import json, couchdb,time


app = Flask(__name__)
api = Api(app)
api.decorators=[cors.crossdomain(origin='*')]


'''
Function: get the database we need if it exists, or just create one
Input -> databaseName (string)
return -> database
'''
def get_database(dbname):

	database_url = "http://admin:admin@172.26.38.184:5984/"
	# database_url = "http://admin:admin@localhost:5984/"
	couch_server = couchdb.Server(database_url)

	if dbname in couch_server:
		return couch_server[dbname]
	else:
		return couch_server.create(dbname)


class Data(Resource):
	def get(self, data_name):
		doc = None
		if data_name == "crimeRate":
			doc = db_tweet['crimeRate']['content']

		elif data_name == "24h":
			doc = db_tweet['24h']['content']

		elif data_name == "weekday":
			doc = db_tweet['weekday']['content']

		elif data_name == "month":
			doc = db_tweet['month']['content']

		elif data_name == "melbgeo":
			doc = db_tweet['melbgeo']['content']

		elif data_name == "sin_tracker":
			doc = db_tweet['sin_tracker']['content']

		elif data_name == "sins_data":
			doc = db_tweet['sins_data']['content']

		elif data_name == "offence_division":
			doc = db_tweet['offence_division']['content']

		elif data_name == "offence_correlation":
			doc = db_tweet['correlation']['content']

		elif data_name == "crimerate_correlation":
			doc = db_tweet['crimeRateCorrelation']['content']

		return jsonify(doc)

api.add_resource(Data, '/get_data/<string:data_name>')
#  172.26.38.184/get_data/


if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0')

### Program: Twitter-Harvester-Main program, which is used to run directly
### Group: 50
### Author: Dejun Xiang (ID:349329)

import tweepy, credentials
from tweepy import OAuthHandler, Cursor


class Authentication():
	def __init__(self, key_index):
		token = credentials.Credential().get_token()
		self.ACCESS_TOKEN = token[key_index]["ACCESS_TOKEN"]
		self.ACCESS_TOKEN_SECRET = token[key_index]["ACCESS_TOKEN_SECRET"]
		self.CONSUMER_KEY = token[key_index]["CONSUMER_KEY"]
		self.CONSUMER_SECRET = token[key_index]["CONSUMER_SECRET"]
	
	def connect_twitter(self):
		auth = OAuthHandler(self.CONSUMER_KEY, self.CONSUMER_SECRET)
		auth.set_access_token(self.ACCESS_TOKEN, self.ACCESS_TOKEN_SECRET)
		return tweepy.API(auth, wait_on_rate_limit_notify=True)
	
	# wait_on_rate_limit=True


class Utility():
	
	def get_database(self, dbname, couch_server):
		if dbname in couch_server:
			return couch_server[dbname]
		else:
			return couch_server.create(dbname)
	
	def process_status(self, status):
		dict_tweet = {}
		dict_user = {}
		
		dict_tweet['_id'] = status.id_str
		dict_tweet['coordinates'] = status.coordinates['coordinates'] if status.coordinates else None
		dict_tweet['place_full_name'] = status.place.full_name if status.place else None
		dict_tweet['created_date'] = str(status.created_at.date())
		dict_tweet['created_weekday'] = str(status.created_at.isoweekday())
		dict_tweet['created_time'] = str(status.created_at.time())
		
		try:
			dict_tweet['text'] = status.full_text
		except:
			dict_tweet['text'] = status.text
		
		dict_tweet['emotion'] = 'not yet'
		dict_tweet['hashtages'] = self.get_hashtags(status)
		dict_tweet['user_id_str'] = status._json['user']['id_str']
		dict_tweet['user_screen_name'] = status._json['user']['screen_name']
		
		dict_user['_id'] = status._json['user']['id_str']
		dict_user['user_screen_name'] = status._json['user']['screen_name']
		dict_user['past_tweet_processed'] = 'not yet'
		dict_user['friend_fetched'] = 'not yet'
		
		return dict_tweet, dict_user
	
	
	def get_hashtags(self, status):
		hashtags = status._json['entities']['hashtags']
		hashtags_text = []
		for h in hashtags:
			hashtags_text.append(h['text'])
		return hashtags_text
	
	def process_ids(self, status):
		dict_user = {}
		dict_user['_id'] = status.id_str
		dict_user['user_screen_name'] = status.screen_name
		dict_user['past_tweet_processed'] = 'not yet'
		dict_user['friend_fetched'] = 'not yet'
		
		return dict_user

'''
view_friend_unfinished

function (doc) {
  if(doc.friend_fetched == "not yet"){
    emit(doc._id, null);
  }
}

view_userTweet_unfinished

function (doc) {
  if(doc.past_tweet_processed == "not yet"){
    emit(doc._id, null);
  }
}
'''

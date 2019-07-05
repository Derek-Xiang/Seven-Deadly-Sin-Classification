### Program: Twitter-Harvester-stream api
### Group: 50
### Author: Dejun Xiang (ID:349329)

import logging
import tweepy
from tweepy import StreamListener
from authentication import Utility

logging.basicConfig(filename='twitter_stream.log', level=logging.INFO,
					format='%(asctime)s:%(levelname)s:%(message)s')


class MyStreamListener(StreamListener):
	
	def __init__(self, api, db_tweet, db_user):
		self.tweet_db = db_tweet
		self.user_db = db_user
		self.api = api
		self.count = 1
	
	def on_status(self, status):
		dict_tweet, dict_user = Utility().process_status(status)
		try:
	
			# make sure only getting tweets from Australia
			if status.lang == 'en' and status.place.country_code == 'AU':
				self.tweet_db.save(dict_tweet)
				self.user_db.save((dict_user))
				print("dingdingdingding-=-=-=-=: ".format(self.count))
				self.count += 1
				
			if self.count %50 ==0:
				print(("### Has downloaded stream tweets: {}".format(self.count)))
				logging.info("### Has downloaded stream tweets: {}".format(self.count))
		except BaseException as e:
			print(e)

	
	def on_error(self, status_code):
		print("### twitter_stream error: {}".format(status_code))
		logging.info("### twitter_stream error: {}".format(status_code))
		return False
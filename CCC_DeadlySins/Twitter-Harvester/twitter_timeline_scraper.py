### Program: Twitter-Harvester-user_timeline
### Group: 50
### Author: Dejun Xiang (ID:349329)

import tweepy, logging, time
from authentication import Utility
from tweepy import Cursor
import couchdb

logging.basicConfig(filename='twitter_timeline.log', level=logging.INFO,
					format='%(asctime)s:%(levelname)s:%(message)s')

class TwitterUser():
	def __init__(self, api, db_tweet, db_user):
		self.api = api
		self.tweet_db = db_tweet
		self.user_db = db_user
		self.max_id = -1
		self.min_id = 1
	
	def get_user_tweets(self, user_id_str):
		try:
			count = 0
			tweets = Cursor(self.api.user_timeline, id=user_id_str, tweet_mode='extended').items()
			for tweet in tweets:
				try:
					if tweet.lang == 'en' and tweet.place.country_code == 'AU' and tweet.coordinates:
						dict_tweet, dict_user = Utility().process_status(tweet)
						self.tweet_db.save(dict_tweet)
						count += 1
				except BaseException as e:
					print("twitter_timeline_tweet BaseException: {}".format(e))
					
					# in case there is no country_code, we will use the user location
					try:
						if tweet.lang == 'en' and 'melbourne' in tweet._json['user']['location']:
							dict_tweet, dict_user = Utility().process_status(tweet)
							dict_tweet['place_full_name'] = tweet._json['user']['location']
							self.tweet_db.save(dict_tweet)
							count += 1
					except BaseException as e2:
						print("twitter_timeline_tweet e2: {}".format(e2))
						continue

					continue
					
			print('---Has downloaded {} tweets from this user'.format(count))
			logging.info('---Has downloaded {} tweets from this user'.format(count))
			return True
			
		except tweepy.error.TweepError as twitter_err:
			try:
				print("---twitter_timeline_tweet TweepError: {}".format(twitter_err))
				logging.info("---twitter_timeline_tweet TweepError: {}".format(twitter_err))
				return False
			except:
				return False
		
		
	def get_user_friends(self, user_id_str):
		count = 0
		try:
			friends = tweepy.Cursor(self.api.followers, user_id=user_id_str, tweet_mode='extended', count=200).items(5000)
			print(friends)
			for friend in friends:
				if "Melbourne" not in friend.location:
					break
				print(friend.location)
				try:
					dict_user = Utility().process_ids(friend)
					self.user_db.save(dict_user)
					count +=1
				except BaseException as e:
					print("twitter_timeline_friend BaseException: {}".format(e))
					# logging.info("twitter_timeline_friend BaseException: {}".format(e))
					continue

			print('===Has got {} friends from this user'.format(count))
			logging.info('===Has got {} friends from this user'.format(count))
			return True
		except tweepy.TweepError as twitter_err:
			print("===twitter_get_friends error: {}".format(twitter_err))
			logging.info("===twitter_get_friends error: {}".format(twitter_err))
			return False
		
### Program: Twitter-Harvester-Main program, which is used to run directly
### Group: 50
### Author: Dejun Xiang (ID:349329)

import couchdb,json
import tweepy
import logging
import time
from tweepy import Stream
from itertools import cycle
from multiprocessing import Process

from credentials import Credential
from twitter_timeline_scraper import TwitterUser
from authentication import Authentication, Utility
from twitter_stream_scraper import MyStreamListener

# record the errors from twitter connection
logging.basicConfig(filename='twitter_main.log', level=logging.INFO,
					format='%(asctime)s:%(levelname)s:%(message)s')

database_url = "http://admin:admin@localhost:5984/"
couch_server = couchdb.Server(database_url)

# get the databases from the server
db_tweet = Utility().get_database('db_tweet', couch_server)
db_user = Utility().get_database('db_user', couch_server)



#aus:  	112.9211, -54.6403, 159.2787, -9.2288
#mel:  144.5532, -38.2250, 145.5498, -37.5401

'''
Function: the process of twitter spider on streaming method
'''
def run_stream():
	# get the number of authentications
	key_num = Credential().length
	# make it iterative list
	key_list = cycle(range(1, key_num))
	# get the api of by the specific authentication
	api = Authentication(next(key_list)).connect_twitter()

	while True:
		try:
			listener = MyStreamListener(api, db_tweet, db_user)
			stream = Stream(auth=api.auth, listener=listener)
			# collect the tweet from all inside Australia
			stream.filter(locations=[112.9211, -54.6403, 159.2787, -9.2288])
			# if there is something wrong with the stream, we change another authentication
			api = Authentication(next(key_list)).connect_twitter()
		except:
			# when there is any error, change the authentication and continue
			api = Authentication(next(key_list)).connect_twitter()


def run_user_timeline():
	# get the number of authentications
	key_num = Credential().length
	# make it iterative list
	key_list = cycle(range(1, key_num))
	# get the api of by the specific authentication
	api = Authentication(next(key_list)).connect_twitter()
	i=1
	change_key_count = 1
	
	while True:
		try:
			# get the unvisited userID from the user database
			users = []
			
			for user in db_user.view('views/view_userTweet_unfinished', limit=50):
				users.append(user.id)
			
			twitter_user = TwitterUser(api,db_tweet,db_user)
			print(users)
			# get the historical tweets from all retrieved users
			for id in users:
				
				print(id)
				temp_doc = db_user[id]
				print(temp_doc)
				temp_doc['past_tweet_processed'] = 'done'
				db_user.save(temp_doc)
				
				# success True, means it has got the tweets from the user
				success = twitter_user.get_user_tweets(id)
				print("--------{}".format(i))
				i+=1
				# False means there are issues on the twitter api connection by breaking limits
				if success == False:
					if change_key_count % key_num == 0:
						change_key_count = 0
						
					# then change another available authentication
					api = Authentication(next(key_list)).connect_twitter()
					print("change_key_count===timeline==== {}".format(change_key_count))
					logging.info("change_key_count====timeline=== {}".format(change_key_count))
					change_key_count += 1
					break
		except:
			continue


def run_get_friends():
	key_num = Credential().length
	key_list = cycle(range(1, key_num))
	api = Authentication(next(key_list)).connect_twitter()
	i = 1
	change_key_count = 1
	
	while True:
		try:
			# get the unvisited userID from the user database
			print(1111)
			users = []
			for user in db_user.view('views/view_friend_unfinished', limit=50):
				users.append(user.id)
			
			print(users)
			twitter_user = TwitterUser(api, db_tweet, db_user)
			
			# get the historical tweets from all retrieved users
			for id in users:
				temp_doc = db_user[id]
				temp_doc['friend_fetched'] = 'done'
				db_user.save(temp_doc)
				
				print(22222)
				# success True, means it has got the tweets from the user
				success = twitter_user.get_user_friends(id)
				print(success)
				print("==============={}".format(i))
				i += 1
				# False means there are issues on the twitter api connection by breaking limits
				if success == False:
					if change_key_count%key_num == 0:
						change_key_count = 0
						time.sleep(900)
						
					# then change another available authentication
					api = Authentication(next(key_list)).connect_twitter()
					print("change_key_count====friends=== {}".format(change_key_count))
					logging.info("change_key_count====friends=== {}".format(change_key_count))
					change_key_count += 1
					break
		except:
			continue


if __name__ == '__main__':
	
	p1 = Process(target=run_stream)
	p2 = Process(target=run_user_timeline)
	p3 = Process(target=run_get_friends)

	p1.start()
	p2.start()
	p3.start()

	time.sleep(9999)
	
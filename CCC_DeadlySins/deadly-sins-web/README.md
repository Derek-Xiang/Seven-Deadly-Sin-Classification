# Commands



```bash
# login remote server
ssh -i /Users/xinwu/Documents/projects/ccc50test.pem ubuntu@172.26.38.184

# deploy
scp -i /Users/xinwu/Documents/projects/ccc50test.pem -r build ubuntu@172.26.38.184:~/front_end/

# run
cd ~/front_end
nvm use node
nohup serve -s build -l 5001 &


# stop
ps -ef|grep 'serve -s'
sudo kill -9 ${pid_from_previous_command}

```


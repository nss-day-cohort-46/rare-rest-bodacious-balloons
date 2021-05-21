import os, time
os.system("rm db.sqlite3")
time.sleep(.5)
os.system("python3 manage.py migrate")
os.system("python3 manage.py loaddata categories comments posts rare_user subscriptions tags tokens users")


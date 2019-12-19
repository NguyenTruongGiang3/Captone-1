import pyrebase
import threading
import os

path = os.path.dirname(os.path.dirname(__file__))

# Config firebase
config = {
    "apiKey": "AIzaSyBx2PpSEjUuvTVXXNAQjbIrTmDWyLPDm9g",
    'authDomain': "devfest2018-742de.firebaseapp.com",
    'databaseURL': 'https://devfest2018-742de.firebaseio.com/',
    'storageBucket': 'devfest2018-742de.appspot.com',
}

# Ititialize firebase app
firebase = pyrebase.initialize_app(config=config)
db = firebase.database()

def stream_handler(message):
    try:

        print(message["event"]) # put
        print(message["path"]) # /-K7yGTTEp7O549EzTYtI
        print(message["data"])
    except Exception as e:
        print("{} went wrong".format(e))

def run():
    import datetime, time
    d = datetime.datetime.today()
    today = datetime.datetime.strftime(d, "%d-%m-%Y")
    db.child("Contract").child(
        "{}".format(today)).stream(stream_handler)
    time.sleep(0.01)
if __name__ == '__main__':
    t = threading.Thread(target=run)
    t.start()
    t.join()

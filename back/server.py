from flask import Flask,request
from flask import jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import json

app = Flask(__name__)
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Harshit_1995'
app.config['MYSQL_DB'] = 'nano'
app.config['MY_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


@app.route("/create",methods = ["post"])                        #Route for creating a particular movie
def create():
    movie_title = request.json['moviename']
    movie_poster = request.json['poster']
    cursor = mysql.connection.cursor()
    cursor.execute (
        """insert into mov(poster,movie_title) values (%s,%s);""",[movie_poster,movie_title]
    )
    mysql.connection.commit()
    cursor.close()
    return jsonify({"status":'inserted column'})

@app.route("/getmovie")                                         #route for getting all movies
def read_movie():
    cursor = mysql.connection.cursor()
    cursor.execute(
        "select * from mov"
        )
    result = cursor.fetchall()
    cursor.close()
    return jsonify({"data":result})

@app.route("/deletemovie",methods =["post"])                    #Route for deleting a particular movie
def deletemovie():
    movie_id = request.json['id']
    print(movie_id)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """delete from mov where id = %s ;""",[movie_id]
    )
    return jsonify({"status":"moviedeleted"})

if __name__ == "__main__":                                      #This will host the name on the port 5000 
    app.run(port=5000,debug = True)



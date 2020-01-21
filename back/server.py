from flask import Flask,request
from flask import jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL


app = Flask(__name__)
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Harshit_1995'
app.config['MYSQL_DB'] = 'eval'
app.config['MY_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


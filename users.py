import pymysql
from pymysql.constants import CLIENT
import os

from dotenv import load_dotenv
load_dotenv()

def get_connection():
    connection = pymysql.connect(
        host=os.environ.get('SQL_HOST'),
        user=os.environ.get('SQL_USER'),
        password=os.environ.get('SQL_PASSWORD'),
        db=os.environ.get('SQL_DBNAME'),
        client_flag=CLIENT.MULTI_STATEMENTS
    )
    return connection

def check_user(username, password):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                SELECT *
                FROM Users u
                WHERE u.User_Username = %s AND u.User_Password = %s
                """
        cursor.execute(query, (username, password))
        result = cursor.fetchall()
    finally:
        connection.close()
    return len(list(result)) >= 1

def create_user(displayname, username, password):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                INSERT INTO Users(
                    User_Username, User_Password, User_Displayname
                ) VALUES (%s, %s, %s);
                """
        cursor.execute(query, (username, password, displayname))
        result = cursor.lastrowid
        connection.commit()
    finally:
        connection.close()
    return result

def update_user(displayname, username, password):
    connection = get_connection()
    try:
        cursor = connection.cursor()

        if displayname:
            query = """
                    UPDATE Users
                    SET User_Displayname = %s
                    WHERE User_Username = %s
                    """
            cursor.execute(query, (displayname, username))

        if password:
            query = """
                    UPDATE Users
                    SET User_Password = %s
                    WHERE User_Username = %s
                    """
            cursor.execute(query, (password, username))

        connection.commit()
    finally:
        connection.close()
    return username

def delete_user(username):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                DELETE FROM Users
                WHERE User_Username = %s
                """
        cursor.execute(query, username)
        connection.commit()
    finally:
        connection.close()

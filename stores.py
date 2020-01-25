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

def one_store(store_id):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                SELECT * FROM Stores
                WHERE Stores.Store_ID = %s;
                """
        cursor.execute(query, store_id)
        store = cursor.fetchone()
    finally:
        connection.close()
    return {
        "id": store[0],
        "name": store[1],
        "location": store[2],
        "hours": store[3],
        "owner": store[4],
        "ratings": store[5],
        "covid_restrictions": store[6]
    }

def all_stores():
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM Stores;"
        cursor.execute(query)
        result = cursor.fetchall()
    finally:
        connection.close()

    result = list(map(lambda store: {
        "id": store[0],
        "name": store[1],
        "location": store[2],
        "hours": store[3],
        "owner": store[4],
        "ratings": store[5],
        "covid_restrictions": store[6]
    }, list(result)))
    return result

def search_stores_by_name(keyword, minRating, takeoutArr):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                SELECT s.Store_ID,
                       s.Store_Name,
                       s.Store_Location,
                       s.Opening_Hours,
                       s.Store_Owner,
                       s.Store_Ratings,
                       s.Covid_Restrictions,
                       u.User_DisplayName
                FROM Stores s JOIN Users u ON s.Store_Owner = u.User_Username
                WHERE s.Store_Name LIKE %s
                  AND s.Store_Ratings > (%s/10)
                  AND s.Covid_Restrictions IN %s
                """
        cursor.execute(query, (f"%{keyword}%", int(float(minRating)*10), takeoutArr))
        result = cursor.fetchall()
    finally:
        connection.close()

    result = list(map(lambda store: {
        "id": store[0],
        "name": store[1],
        "location": store[2],
        "hours": store[3],
        "owner": f"{store[7]} ({store[4]})",
        "ratings": store[5],
        "covid_restrictions": store[6]
    }, list(result)))
    return result

def create_store(name, location, hours, owner, ratings, covid_restrictions):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                INSERT INTO Stores(
                    Store_Name, Store_Location, Opening_Hours,
                    Store_Owner, Covid_Restrictions
                ) VALUES (%s, %s, %s, %s, %s);
                """
        cursor.execute(query, (name, location, hours, owner, covid_restrictions))
        result = cursor.lastrowid
        connection.commit()
    finally:
        connection.close()
    return result

def update_store(store_id, name, location, hours, owner, ratings, covid_restrictions):
    connection = get_connection()
    try:
        cursor = connection.cursor()

        if name:
            query = """
                    UPDATE Stores
                    SET Store_Name = %s
                    WHERE Store_ID = %s
                    """
            cursor.execute(query, (name, store_id))

        if location:
            query = """
                    UPDATE Stores
                    SET Store_Location = %s
                    WHERE Store_ID = %s
                    """
            cursor.execute(query, (location, store_id))

        if hours:
            query = """
                    UPDATE Stores
                    SET Opening_Hours = %s
                    WHERE Store_ID = %s
                    """
            cursor.execute(query, (hours, store_id))

        if owner:
            query = """
                    UPDATE Stores
                    SET Store_Owner = %s
                    WHERE Store_ID = %s
                    """
            cursor.execute(query, (owner, store_id))

        if ratings:
            query = """
                    UPDATE Stores
                    SET Store_Ratings = %s
                    WHERE Store_ID = %s
                    """
            cursor.execute(query, (ratings, store_id))

        if covid_restrictions:
            query = """
                    UPDATE Stores
                    SET Covid_Restrictions = %s
                    WHERE Store_ID = %s
                    """
            cursor.execute(query, (covid_restrictions, store_id))
        connection.commit()
    finally:
        connection.close()
    return store_id

def delete_store(store_id):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                DELETE FROM Stores
                WHERE Store_ID = %s
                """
        cursor.execute(query, store_id)
        connection.commit()
    finally:
        connection.close()

def find_delivery_options(store_id):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        query = """
                SELECT d.Store_Name, d.Delivery_Available, d.OptionsID
                FROM Delivery as D Natural JOIN Stores as S
                WHERE S.DeliveryAvailable = 'YES' AND S.Store_ID = %s
                """
        cursor.execute(query, store_id)
        connection.commit()
    finally: 
        connection.close()

def find_all_delivery_options():
    connection = get_connection()
    try:

        query = """
                SELECT *
                FROM Delivery, Stores
                WHERE Stores.DeliveryAvailable = 'YES'
                """
        cursor.execute(query)
        connection.commit()
    finally:
        connection.close()



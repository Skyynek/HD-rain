from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists,create_database
import psycopg2

#!/usr/bin/python
from configparser import ConfigParser


def config(filename='localSettings.py', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db
def create_tables():
    
    """ create tables in the PostgreSQL database"""
    commands = (
       """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
            
        )
        """,
        )
    conn = None
    
    try:
        
        # connect to the PostgreSQL server
        conn = psycopg2.connect("dbname=postgres user=anthony password=password")
      
        cur = conn.cursor()
        # create table one by one
        for command in commands:

            cur.execute(command)
        # close communication with the PostgreSQL database server
        cur.close()
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def insert_vendor(users):
    """ insert a new user into the users table """
    sql = """INSERT INTO users (firstname, lastname,email,password) 
VALUES ('Anthony', 'Berot', 'anthony@gmail.com', 'password');"""
    conn = None
   
    try:
       
        # connect to the PostgreSQL database
        conn = psycopg2.connect("dbname=postgres user=anthony password=password")
        
        # create a new cursor
        cur = conn.cursor()
        
        # execute the INSERT statement
        cur.execute(sql, (users,))
        
       
        print("hello")
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

create_tables()
insert_vendor("users")
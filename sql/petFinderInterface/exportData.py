# source: https://www.postgresqltutorial.com/postgresql-python/connect/
import psycopg2


parameters = psycopg2.connect(
    host= "localhost",
    user= "postgres",
    password= "password",
    database= "CS467_test",
    port= 5432,
)

def connect():
    conn = None

    try: 
        conn = parameters

        cur = conn.cursor()
        
        queryCommand = None #insert query string

        print('PostgreSQL database version: ')
        cur.execute('SELECT version()')

        db_version = cur.fetchone()
        print(db_version)

        cur.close()


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed')

if __name__ == '__main__':
    connect()

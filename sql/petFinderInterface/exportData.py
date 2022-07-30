import os

# source: https://www.postgresqltutorial.com/postgresql-python/connect/
# import psycopg2


# parameters = psycopg2.connect(
#     host= "localhost",
#     user= "postgres",
#     password= "password",
#     database= "CS467_test",
#     port= 5432,
# )

# def connect():
#     conn = None

#     try: 
#         conn = parameters

#         cur = conn.cursor()
        
#         queryCommand = None #insert query string

#         print('PostgreSQL database version: ')
#         cur.execute('SELECT version()')

#         db_version = cur.fetchone()
#         print(db_version)

#         cur.close()


#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)

#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed')

root = os.path.dirname(__file__)
root = root + 'txtSQL/'
script = ''

file_names = [
'1_state_sql.txt',
'2_city_sql.txt',
'3_zip_sql.txt',
'4_type_sql.txt',
'5_size_sql.txt',
'6_shelter_sql.txt',
'8_availability_sql.txt',
'9_pet_sql.txt',
'10_breed_sql.txt',
'11_dispositionTable_sql.txt',
'12_names_sql.txt',
'13_pet_breed_sql.txt',
'14_pet_disp_sql.txt',
'15_pet_photos_sql.txt',
'16_fav_pets_sql.txt',
'17_rej_pets_sql.txt'
]

for x in file_names:
    txt_file = open(root + x,'r', encoding="utf8")
    txt = txt_file.read()
    script += txt
    script += '\n'


with open('./seedSQL.txt','w',encoding="utf-8") as file:
    file.write(script)


#print(script)


# if __name__ == '__main__':
#     print('generating SQL txt')
#     #connect()

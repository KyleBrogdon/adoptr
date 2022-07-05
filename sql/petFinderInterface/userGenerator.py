import os
import random
import petpy

apiKey = 'WnA5GqjNe8BG0u0K0j98iMB1u0BL3PDzhEE5Z1uGnsN9yrs5KW'
secretKey = 'p7NFhXFZ41uV2yZfhyKKsaiuOWjAcLPKckSmBurG'

pf=petpy.Petfinder(apiKey,secretKey)


### users
with open('./sourceFiles/names.txt') as nameF:
    nameList = nameF.readlines()

for x in range(len(nameList)):
    nameList[x] = nameList[x].strip()

firstName =['site']
lastName = ['admin']
email =['siteAdmin@email.com']
password = '12345'
adminPassword = 'password'
adminStatus =[True]

firstName.append("shelter")
lastName.append("admin")
email.append('shelteradmin@email.com')
adminStatus.append(True)

firstName.append("app")
lastName.append("user")
email.append("appuser@email.com")
adminStatus.append(False)

for x in range(3,10):
    firstName.append(random.choice(nameList))
    lastName.append(random.choice(nameList))
    email.append(str(firstName[x]) + str(lastName[x]) + "@email.com")
    status = random.randint(1,100)
    if status < 20:
        aStatus = True
    else:
        aStatus = False
    adminStatus.append(aStatus)
    
# for x in range(len(firstName)):    
#     print(str(firstName[x])+", "+lastName[x]+", "+ str(email[x]) + ", " + str(adminStatus[x]))


with open('./txtSQL/names_sql.txt','w') as nameF:
    nameF.write('INSERT INTO \n')
    nameF.write('\tapp_user (firstName, lastName, email, password, adminStatus)\n')
    nameF.write('VALUES\n')
    for x in range(len(firstName)):
        if x == len(firstName)-1:
            nameF.write('\t(' + str(firstName[x]) + ', '+ str(lastName[x]) +', ' + str(email[x]) + ', ' + str(password) + ', ' + str(adminStatus[x]) + ')')
        else:
            nameF.write('\t(' + str(firstName[x]) + ', '+ str(lastName[x]) +', ' + str(email[x]) + ', ' + str(password) + ', ' + str(adminStatus[x]) + '),\n')



### shelters

orgs = pf.organizations(results_per_page=20,pages=1)
orgs = orgs['organizations']

orgIDS =[]
orgNames =[]
orgEmail =[]
orgPhone =[]
orgAdd=[]
orgCity = []
orgState =[]
orgZip = []
for x in orgs:
    orgIDS.append(x['id'])
    orgNames.append(x['name'])
    orgEmail.append(x['email'])
    orgPhone.append(x['phone'])
    orgAdd.append(x['address'])


for x in orgAdd:
    orgCity.append(x['city'])
    orgState.append(x['state'])
    orgZip.append(x['postcode'])

with open('./sourceFiles/shelter_List.txt','w') as shelterF:
    shelterF.write('ids\tname\temail\tpassword\tphone\tzip\tcity\tstate\n')
    for x in range(len(orgIDS)):
        shelterF.write(str(orgIDS[x]) + '\t'+ str(orgNames[x]) +'\t' + str(orgEmail[x]) + '\t' + str(password) + '\t' + str(orgPhone[x]) + '\t' + str(orgZip[x]) + '\t' + str(orgCity[x]) + '\t' + str(orgState[x]) +'\n')




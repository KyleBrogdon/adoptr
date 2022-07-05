import pandas
import petpy
import os
import json 
import csv


def remove_duplicates(x):
    return list( dict.fromkeys(x) )


def delete_element(x, pos):
    if pos < len(x):
        x.pop(pos)

#State Tables
stateTable =[]

with open('./sourceFiles/usLocationData.txt', newline='') as states:
    states_read = csv.DictReader(states, delimiter='\t')
    for states in states_read:
        stateTable.append(dict(states))


stateNames = []
stateCodes = []
cityName = []
zipCode = []


for x in stateTable:
    stateNames.append(x['stateName'])
    stateCodes.append(x['stateCode'])
    cityName.append(x['city'])
    zipCode.append(x['zip'])

zipped_lists = zip(stateCodes,stateNames,cityName, zipCode)
sorted_group = sorted(zipped_lists)
tuples = zip(*sorted_group)
stateCodes,stateNames,cityName, zipCode = [list(tuple) for tuple in tuples]


stateList = remove_duplicates(stateNames)
stateCodesList = remove_duplicates(stateCodes)


with open('./txtSQL/state_sql.txt','w') as stateF:
    stateF.write('INSERT INTO \n')
    stateF.write('\tstate (stateName, stateCode)\n')
    stateF.write('VALUES\n')
    for x in range(len(stateList)):
        if x == len(stateList) - 1:
            stateF.write('\t(' + str(stateList[x]) + ', '+ str(stateCodesList[x]) +')')
        else:
            stateF.write('\t(' + str(stateList[x]) + ', '+ str(stateCodesList[x]) +'),\n')


stateIDFK = []
i = 0
for x in range(len(stateCodes)):
    if stateCodes[x] == stateCodesList[i]:
        pass
    else:
        i = i + 1
    stateID = i
    stateIDFK.append(stateID + 1)  



###need to remove duplicate cities (no working yet)
cityNameDup = cityName.copy()
stateIDFKDup = stateIDFK.copy()
cityN = cityName[0]
i = 1
for x in range(1,len(cityNameDup)):
    try:
        if cityN == cityNameDup[x]:
            index = cityNameDup.index(cityNameDup[x])
            delete_element(cityNameDup, index)
            delete_element(stateIDFKDup, index)
        else:
            pass
        cityN = cityNameDup[x]
    except:
        break




with open('./txtSQL/city_sql.txt','w') as cityF:
    cityF.write('INSERT INTO \n')
    cityF.write('\tcity (cityName, stateID)\n')
    cityF.write('VALUES\n')
    for x in range(len(cityName)):
        if x == len(cityName) - 1:
            cityF.write('\t(' + str(cityName[x]) + ', '+ str(stateIDFK[x]) +')')
        else:
            cityF.write('\t(' + str(cityName[x]) + ', '+ str(stateIDFK[x]) +'),\n')

cityIDFK =[]

for x in range(len(zipCode)):
    index = cityNameDup.index(cityName[x])
    cityIDFK.append(index + 1)


with open('./txtSQL/zip_sql.txt','w') as zipF:
    zipF.write('INSERT INTO \n')
    zipF.write('\tzipcode (zipcode, cityID)\n')
    zipF.write('VALUES\n')
    for x in range(len(zipCode)):
        if x == len(zipCode) -1:
            zipF.write('\t(' + str(zipCode[x]) + ', '+ str(cityIDFK[x]) +')')
        else:
            zipF.write('\t(' + str(zipCode[x]) + ', '+ str(cityIDFK[x]) +'),\n')


# with open('./sourceFiles/shelter_List.txt') as shelterF:
#     shelterList = shelterF.readlines()



########### shelters
shelterTable =[]
with open('./sourceFiles/shelter_List.txt', newline='') as shelters:
    shelterList = csv.DictReader(shelters, delimiter='\t')
    for shelters in shelterList:
        shelterTable.append(dict(shelters))

# for x in range(len(shelterList)):
#     shelterList[x] = shelterList[x].strip()

# print(shelterTable)

####assign location fks

shelterCode=[]
shelterName =[]
shelterEmail =[]
shelterPhone=[]
shelterZip=[]
shelterState=[]
shelterCity=[]

for x in shelterTable:
    shelterCode.append(x['ids'])
    shelterName.append(x['name'])
    shelterEmail.append(x['email'])
    shelterPhone.append(x['phone'])
    shelterZip.append(x['zip'])
    shelterCity.append(x['city'])
    shelterState.append(x['state'])

shelterZipFKID =[]
shelterCityFKID =[]
shelterStateFKID =[]

for x in shelterZip:
    try:
        index = zipCode.index(x.lstrip("0"))
    except:
        try:
            index = zipCode.index(str(int(x)+1))
        except:
            index = zipCode.index(str(int(x)-1))

    shelterZipFKID.append(index + 1)
    shelterCityFKID.append(cityIDFK[index])
    shelterStateFKID.append(stateIDFK[index])


# for x in range(len(shelterZip)):
#     print(str(shelterZip[x]) + ', ' + str(shelterZipFKID[x])+ ', ' + str(shelterCityFKID[x])+ ', ' + str(shelterStateFKID[x]))

with open('./txtSQL/shelter_sql.txt','w') as shelterF:
    shelterF.write('INSERT INTO \n')
    shelterF.write('\tshelter (shelterCode, shelterName, email, password, phoneNumber, zipcodeID, cityID, stateID)\n')
    shelterF.write('VALUES\n')
    for x in range(len(shelterCode)):
        if x == len(zipCode) -1:
            shelterF.write('\t(' + str(shelterCode[x]) + ', '+ str(shelterName[x]) + ', '+ str(shelterEmail[x]) + ', '+ str(shelterPhone[x]) + ', '+ str(shelterZipFKID[x]) + ', '+ str(shelterCityFKID[x]) + ', '+ str(shelterStateFKID[x]) +')')
        else:
            shelterF.write('\t(' + str(shelterCode[x]) + ', '+ str(shelterName[x]) + ', '+ str(shelterEmail[x]) + ', '+ str(shelterPhone[x]) + ', '+ str(shelterZipFKID[x]) + ', '+ str(shelterCityFKID[x]) + ', '+ str(shelterStateFKID[x]) +'),\n')
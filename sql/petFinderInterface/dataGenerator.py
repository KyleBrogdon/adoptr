import petpy
import random
import datetime
import time
import csv

## Functions
def petCheck(petObj,orgID,petList):
    pets = petObj.animals(results_per_page=10,pages=1,organization_id=orgID)
    if len(pets) > 0:
        pl = pets['animals']
        
        if len(pl) >= 10:
            for x in range(10):
                petList.append(pl[x])
        else:
            for x in range(len(pl)):
                petList.append(pl[x])

        return True
    else:
        return False

def fkValues(emptyList,valueList,SearchList):
    for x in valueList:
        index = SearchList.index(x)
        emptyList.append(index+1)

def remove_duplicates(x):
    return list( dict.fromkeys(x) )

def delete_element(x, pos):
    if pos < len(x):
        x.pop(pos)

def time_elapsed(stime, instance):
    toc = time.time()
    timeElapsed = toc-stime
    print(str(instance) + " Time Elapsed: " + str(timeElapsed) + ' sec\n')


#### Generate Data 
start = time.time()

#generate users
tic= time.time()
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



with open('./txtSQL/names_sql.txt','w', encoding="utf-8") as nameF:
    nameF.write('INSERT INTO \n')
    nameF.write('\tapp_user (firstname, lastname, email, password, adminstatus)\n')
    nameF.write('VALUES\n')
    for x in range(len(firstName)):
        if x == len(firstName)-1:
            nameF.write("\t('" + str(firstName[x]) + "', '"+ str(lastName[x]) +"', '" + str(email[x]) + "', '" + str(password) + "', '" + str(adminStatus[x]) + "');")
        else:
            nameF.write("\t('" + str(firstName[x]) + "', '"+ str(lastName[x]) + "', '" + str(email[x]) + "', '" + str(password) + "', '" + str(adminStatus[x]) + "'),\n")



time_elapsed(tic, "Users")
tic= time.time()

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
    cityName.append(str(x['city']).replace("'",""))
    zipCode.append(x['zip'])

zipped_lists = zip(stateCodes,stateNames,cityName, zipCode)
sorted_group = sorted(zipped_lists)
tuples = zip(*sorted_group)
stateCodes,stateNames,cityName, zipCode = [list(tuple) for tuple in tuples]

stateList = remove_duplicates(stateNames)
stateCodesList = remove_duplicates(stateCodes)

for x in range(len(stateList)):
    stateList[x] = stateList[x].strip()

with open('./sourceFiles/stateList.txt','w',encoding="utf-8") as stateLTxt:
    for x in range(len(stateCodesList)):
        stateLTxt.write(str(stateCodesList[x]) + '\n')


stateIDFK = []
i = 0
for x in range(len(stateCodes)):
    if stateCodes[x] == stateCodesList[i]:
        pass
    else:
        i = i + 1
    stateID = i
    stateIDFK.append(stateID + 1)  

time_elapsed(tic, "States")
tic= time.time()


cityNameDump = cityName.copy()
stateIDFKDup = stateIDFK.copy()
temp = []

print("size city: " + str(len(cityNameDump)))

# with open('./sourceFiles/cityDump.txt','w') as cityD:
#     cityD.write('city\n')
#     for x in range(len(cityNameDump)):
#         cityD.write(str(cityNameDump[x]) +'\n')

temp.append(cityNameDump[0])
last = cityNameDump[0]
for x in range(1,len(cityNameDump)):
    if cityNameDump[x] != last:
        temp.append(cityNameDump[x])
        last = cityNameDump[x]

cityNameDump = temp
print("size city: " + str(len(cityNameDump)))

# with open('./sourceFiles/cityTemp.txt','w') as cityD:
#     cityD.write('city\n')
#     for x in range(len(temp)):
#         cityD.write(str(temp[x]) +'\n')


cityIDFK =[]

for x in range(len(zipCode)):
    index = cityNameDump.index(cityName[x])
    cityIDFK.append(index + 1)



with open('./txtSQL/zip_sql.txt','w',encoding="utf-8") as zipF:
    zipF.write('INSERT INTO \n')
    zipF.write('\tzipcode (zipcode, cityid)\n')
    zipF.write('VALUES\n')
    for x in range(len(zipCode)):
        if x == len(zipCode) -1:
            zipF.write("\t(" + str(zipCode[x]) + ", "+ str(cityIDFK[x]) +");")
        else:
            zipF.write("\t(" + str(zipCode[x]) + ", "+ str(cityIDFK[x]) +"),\n")


with open('./txtSQL/city_sql.txt','w',encoding="utf-8") as cityF:
    cityF.write('INSERT INTO \n')
    cityF.write('\tcity (cityname, stateid)\n')
    cityF.write('VALUES\n')
    for x in range(len(cityNameDump)):
        if x == len(cityNameDump) - 1:
            cityF.write("\t('" + str(cityNameDump[x]) + "', "+ str(stateIDFK[x]) +");")
        else:
            cityF.write("\t('" + str(cityNameDump[x]) + "', "+ str(stateIDFK[x]) +"),\n")


with open('./txtSQL/state_sql.txt','w',encoding="utf-8") as stateF:
    stateF.write('INSERT INTO \n')
    stateF.write('\tstate (statename, statecode)\n')
    stateF.write('VALUES\n')
    for x in range(len(stateList)):
        if x == len(stateList) - 1:
            stateF.write("\t('" + str(stateList[x]) + "', '" + str(stateCodesList[x]) +"');")
        else:
            stateF.write("\t('" + str(stateList[x]) + "', '" + str(stateCodesList[x]) +"'),\n")




time_elapsed(tic, "Cities")
tic= time.time()


apiKey ='hV1nfrraIBbpA3NQ7y0qqTkIFJHm5pdnrqTXTJtBnUIxW4nErQ'
secretKey ='WPv7M1lfZGbpwejoJkMGTRIncBk8fSVRAuGvWmwP'


pf = petpy.Petfinder(apiKey,secretKey)


####animals and orgs

pets = []
orgs = []
tic= time.time()

#for x in range(5):
for x in range(len(stateList)):
    stateCode = str(stateCodesList[x])
    stateOrgs = pf.organizations(state = stateCode, results_per_page= 100)
    stateOrgs = stateOrgs['organizations']

    for shelter in stateOrgs:
        sID = shelter['id']

        if sID[0:2] != stateCode:
            stateOrgs.remove(shelter)


    orgsWPets = []
    checked = []


    i = 0
    while len(orgsWPets) < 2 and i < len(stateOrgs) and i < 10:
        i = i + 1
        orgNumber = random.randrange(0,len(stateOrgs),1)

        if orgNumber not in checked:
            checked.append(orgNumber)
            testOrg = stateOrgs[orgNumber]
            orgID = testOrg['id']
            try:
                orgInfo = pf.organizations(organization_id=orgID)
                if(petCheck(pf,orgID,pets)):
                    orgsWPets.append(orgInfo['organizations'])

            except:
                pass

    for x in orgsWPets:
        orgs.append(x)  

print(len(orgs))

print('Orgs with pets')

toc = time.time()
timeElapsed = toc-tic
print("Org Time Elapsed: " + str(timeElapsed) + 's\n')

#shelters
orgIDS =[]
orgNames =[]
orgEmail =[]
orgPhone =[]
orgAdd=[]
orgCity = []
orgState =[]
orgZip = []
password = '12345'

for x in orgs:
    orgIDS.append(x['id'])
    orgNames.append(str(x['name']).replace("'",''))
    orgEmail.append(str(x['email']).replace(" ",''))
    orgPhone.append(str(x['phone']).replace(" ",''))
    orgAdd.append(x['address'])


for x in orgAdd:
    orgCity.append(x['city'])
    orgState.append(x['state'])
    orgZip.append(x['postcode'])

shelterZipFKID =[]
shelterCityFKID =[]
shelterStateFKID =[]


for x in orgZip:
    if x.lstrip("0") in zipCode:
        index = zipCode.index(x.lstrip("0"))
        shelterZipFKID.append(index+1)
    else:
        shelterZipFKID.append('NULL')

for x in orgCity:
    if x in cityNameDump:
        index = cityNameDump.index(x)
        shelterCityFKID.append(index+1)
    else:
        shelterCityFKID.append('NULL')

print(len(stateCodes))


for x in orgState:
    if x in stateCodesList:
        index = stateCodesList.index(x)
        shelterStateFKID.append(index+1)
    else:
        shelterStateFKID.append('NULL')



# print('orgIds: ' + str(len(orgIDS)))
# print('orgNames: ' + str(len(orgNames)))
# print('orgEmail: ' + str(len(orgEmail)))
# print('orgPhone: ' + str(len(orgPhone)))
# print("shelterZipFKID: " + str(len(shelterZipFKID)))
# print("shelterCityFKID: " + str(len(shelterCityFKID)))
# print("shelterStateFKID: " + str(len(shelterStateFKID)))

with open('./sourceFiles/shelter_List.txt','w',encoding="utf-8") as shelterF:
    shelterF.write('ids\tname\temail\tpassword\tphone\tzip\tcity\tstate\n')
    for x in range(len(orgIDS)):
        shelterF.write(str(orgIDS[x]) + '\t'+ str(orgNames[x]) +'\t' + str(orgEmail[x]) + '\t' + str(password) + '\t' + str(orgPhone[x]) + '\t' + str(orgZip[x]) + '\t' + str(orgCity[x]) + '\t' + str(orgState[x]) +'\n')



with open('./txtSQL/shelter_sql.txt','w',encoding="utf-8") as shelterF:
    shelterF.write('INSERT INTO \n')
    shelterF.write('\tshelter (sheltercode, sheltername, email, password, phonenumber, zipcodeid, cityid, stateid)\n')
    shelterF.write('VALUES\n')
    for x in range(len(orgIDS)):
        if x == len(orgIDS) - 1:
            shelterF.write("\t('" + str(orgIDS[x]) + "', '" + str(orgNames[x]) + "', '" + str(orgEmail[x]) + "', " + str(password) + ", '" + str(orgPhone[x]) + "', " + str(shelterZipFKID[x]) + ", " + str(shelterCityFKID[x]) + ", " + str(shelterStateFKID[x]) +");")
        else:
            shelterF.write("\t('" + str(orgIDS[x]) + "', '" + str(orgNames[x]) + "', '" + str(orgEmail[x]) + "', " + str(password) + ", '" + str(orgPhone[x]) + "', " + str(shelterZipFKID[x]) + ", " + str(shelterCityFKID[x]) + ", " + str(shelterStateFKID[x]) +"),\n")



time_elapsed(tic, "shelters")
tic= time.time()

sizeOps = ['extra small', 'small', 'medium','large', 'extra large', 'unknown']
adoptOps = ['adoptable', 'adopted', 'unavailable', 'unknown']
typeOps = ['Dog','Cat','Rabbit','small-furry','Horse','Bird','scales-fins-other','Barnyard']


dispOps = ['good_with_children','good_with_dogs','good_with_cats',
    'house_trained','declawed','special_needs','shots_current', 'affectionate', 'friendly'
    'playful','intelligent','cute','happy', 'gentle','curious','funny', 'quiet', 'dignified', 
    'couch potato', 'loves kisses']



photoPetFKID = []
photoPicFKID = []
petImages =[]

petDispIDFK = []
dispIDFK = []


##########Pets
petNames =[]
petAge=[]
petBlurb =[]
today = datetime.date.today()
petType =[]
petBreed =[]
petGender =[]
petSize = []
petStatus =[]
petAts =[]
petTags =[]
petEnv =[]
petOrg =[]
petSN=[]
petSt = []
petDispo = []

i = 1
j = 1
for x in pets:
    petNames.append(str(x['name']).replace("'",''))
    petAge.append(x['age'])
    if x['description'] != None:
        blurb = str(x['description']).replace('\n','')
        petBlurb.append(blurb.replace("'",' '))
    else:
        petBlurb.append('None')
    petType.append(x['type'])
    petB = x['breeds']
    petBreed.append(str(petB['primary']).replace("'",' '))
    petGender.append(x['gender'])
    petSize.append(x['size'].lower())
    petStatus.append(x['status'])
    petAts.append(x['attributes'])
    petAt = x['attributes']
    petSt.append(petAt['shots_current'])
    petSN.append(petAt['spayed_neutered'])
    petTags.append(x['tags'])
    petTag = x['tags']
    petEnv.append(x['environment'])
    petE = x['environment']
    petP = x['photos']
    petOrg.append(x['organization_id'])
    if len(petP) > 0:
        tempPhotos =[]
        for x in range(len(petP)):
            pics = petP[x]
            petImages.append(pics['full'])
            photoPetFKID.append(i)
            photoPicFKID.append(j)
            j = j + 1
    i =  i + 1

    if petAt['spayed_neutered'] == True:
        petDispo.append('spayed_neutered')

    if petAt['house_trained'] == True:
        petDispo.append('house_trained')

    if petAt['declawed'] == True:
        petDispo.append('declawed')

    if petAt['special_needs'] == True:
        petDispo.append('special_needs')

    if petAt['shots_current'] == True:
        petDispo.append('shots_current')

    if petE['children'] == None:
        petDispo.append('good_with_children')

    if petE['dogs'] == None:
        petDispo.append('good_with_dogs')

    if petE['cats'] == None:
        petDispo.append('good_with_cats')

    for x in petTag:
        petDispo.append(x.lower())

    for d in petDispo:
        if d in dispOps:
            index = dispOps.index(d)
            dispIDFK.append(index + 1)
        else:
            dispOps.append(d)
            dispIDFK.append(len(dispOps))
        petDispIDFK.append(i)



with open('./sourceFiles/pet_list.txt','w', encoding="utf-8") as petF:
    for x in range(len(petNames)):
        petF.write('#' + str(x) + ' ')
        petF.write('Name: ' + str(petNames[x]) + '\n')
        petF.write('age: ' + str(petAge[x]) + '\n')
        petF.write('Blurb: ' + str(petBlurb[x]) + '\n')
        petF.write('type: ' + str(petType[x]) + '\n')
        petF.write('breed: ' + str(petBreed[x]) + '\n')
        petF.write('gender: ' + str(petGender[x]) + '\n')
        petF.write('size: ' + str(petSize[x]) + '\n')
        petF.write('Status: ' + str(petStatus[x]) + '\n')
        petF.write('Attributes: ' + str(petAts[x]) + '\n')
        petF.write('tags: ' + str(petTags[x]) + '\n')
        petF.write('env: ' + str(petEnv[x]) + '\n')
        petF.write('Org: ' + str(petOrg[x]) + '\n')
        petF.write('\n\n')



for x in range(len(petType)):
    if petType[x] == 'Small & Furry':
        petType[x] = 'small-furry'
    elif petType[x] == 'Scales, Fins & Other':
        petType[x] = 'scales-fins-other'



shelterIDFK = []
sizeIDFK =[]
snIDFK = []
avlIDFK = []
typeIDFK=[]


fkValues(shelterIDFK,petOrg,orgIDS)
fkValues(sizeIDFK,petSize,sizeOps)
fkValues(typeIDFK,petType,typeOps)
fkValues(avlIDFK,petStatus,adoptOps)

# print('petName: ' + str(len(petNames)))
# print('petAge: ' + str(len(petAge)))
# print('petGender: ' + str(len(petGender)))
# print('petBlurb: ' + str(len(petBlurb)))
# print('petSn: ' + str(len(petSN)))
# print('petSt: ' + str(len(petSt)))
# print('petSize: ' + str(len(sizeIDFK)))
# print('petAv: ' + str(len(avlIDFK)))
# print('petType: ' + str(len(typeIDFK)))
# print('petShelter: ' + str(len(shelterIDFK)))

with open('./txtSQL/pet_id_photos_sql.txt','w', encoding="utf-8") as petPhotoF:
    petPhotoF.write('INSERT INTO\n')
    petPhotoF.write('\tpet_image (petid,imageid\n')
    petPhotoF.write('VALUES\n')
    for x in range(len(petImages)):
        if x == len(petImages) - 1:
            petPhotoF.write("\t("+ str(photoPetFKID[x]) + ", " + str(photoPicFKID[x]) +  ");")
        else:
            petPhotoF.write("\t("+ str(photoPetFKID[x]) + ", " + str(photoPicFKID[x]) +  "),\n")


with open('./txtSQL/photo_sql.txt','w', encoding="utf-8") as petPicF:
    petPicF.write('INSERT INTO\n')
    petPicF.write('\timages (imageurl)\n')
    petPicF.write('VALUES\n')    
    for x in range(len(petImages)):
        if x == len(petImages) - 1:
            petPicF.write("\t('"+ str(petImages[x]) + "');")
        else:
            petPicF.write("\t('"+ str(petImages[x]) + "'),\n")


with open('./txtSQL/dispositionTable_sql.txt','w', encoding="utf-8") as dispF:
    dispF.write('INSERT INTO \n')
    dispF.write('\tdisposition (dispstatus)\n')
    dispF.write('VALUES\n')
    for x in range(len(dispOps)):
        if x == len(dispOps)-1:
            dispF.write("\t('" + str(dispOps[x]) + "');")
        else:
            dispF.write("\t('" + str(dispOps[x]) + "'),\n")


with open('./txtSQL/adopt_sql.txt','w',encoding="utf-8") as adoptF:
    adoptF.write('INSERT INTO \n')
    adoptF.write('\tavailability (availability)\n')
    adoptF.write('VALUES\n')
    for x in range(len(adoptOps)):
        if x == len(adoptOps)-1:
            adoptF.write("\t('" + str(adoptOps[x]) + "');")
        else:
            adoptF.write("\t('" + str(adoptOps[x]) +  "'),\n")


with open('./txtSQL/size_sql.txt','w',encoding="utf-8") as sizeF:
    sizeF.write('INSERT INTO \n')
    sizeF.write('\tsize (petSize)\n')
    sizeF.write('VALUES\n')
    for x in range(len(sizeOps)):
        if x == len(sizeOps)-1:
            sizeF.write("\t('" + str(sizeOps[x]) + "');")
        else:
            sizeF.write("\t('" + str(sizeOps[x]) +  "'),\n")


with open('./txtSQL/pet_disp_sql.txt','w',encoding="utf-8") as petDispF:
    petDispF.write('INSERT INTO\n')
    petDispF.write('\tdispositino_pet (dispid,petid)\n')
    petDispF.write('VALUES\n')
    for x in range(len(petDispIDFK)):
        if x == len(petDispIDFK) -1:
            petDispF.write("\t("+ str(dispIDFK[x]) + ", " + str(petDispIDFK[x]) +  ");")
        else:
            petDispF.write("\t("+ str(dispIDFK[x]) + ", " + str(petDispIDFK[x]) +  "),\n")


with open('./txtSQL/pet_sql.txt','w',encoding="utf-8") as petF:
    petF.write('INSERT INTO \n')
    petF.write('\tpet (name, age, sex, blurb, dateprofile, snstatus, ststatus, sizeid, avid, typeid, shelterid)\n')
    petF.write('VALUES\n')
    for x in range(len(petNames)):
        if x == len(petNames) -1:
            petF.write("\t('"+ str(petNames[x]) + "', '"  + str(petAge[x]) + "', '"  + str(petGender[x]) + "', '"  + str(petBlurb[x]) + "', '"   + str(today) + "', "  + str(petSN[x]) + ", "  + str(petSt[x]) + ", "  + str(sizeIDFK[x]) + ", "  + str(avlIDFK[x]) + ", "  + str(typeIDFK[x]) + ", "  + str(shelterIDFK[x]) + ");")
        else:
            petF.write("\t('"+ str(petNames[x]) + "', '"  + str(petAge[x]) + "', '"  + str(petGender[x]) + "', '"  + str(petBlurb[x]) + "', '"   + str(today) + "', "  + str(petSN[x]) + ", "  + str(petSt[x]) + ", "  + str(sizeIDFK[x]) + ", "  + str(avlIDFK[x]) + ", "  + str(typeIDFK[x]) + ", "  + str(shelterIDFK[x]) + "),\n")


time_elapsed(tic, "Pets")
tic= time.time()


#distribute calls

### types
animalTypes = pf.animal_types()

animalTypes = animalTypes['types']
animalTypeNames =[]
typeIDFK = []

for x in animalTypes:
    animalTypeNames.append(x['name'])

for x in range(len(animalTypeNames)):
    if animalTypeNames[x] == 'Small & Furry':
        animalTypeNames[x] = 'small-furry'
    elif animalTypeNames[x] == 'Scales, Fins & Other':
        animalTypeNames[x] = 'scales-fins-other'


### breeds ########################
breedList= []
i = 1
for x in animalTypeNames:
    breeds = pf.breeds(x.lower())
    breeds = breeds['breeds']
    breeds = breeds[x.lower()]
    for y in breeds:
        breedList.append(str(y).replace("'",' '))
        typeIDFK.append(i)
    i = i + 1

zipped_lists = zip(breedList,typeIDFK)
sorted_group = sorted(zipped_lists)
tuples = zip(*sorted_group)
breedList,typeIDFK = [list(tuple) for tuple in tuples]

####pet_breeds
breedIDFK = []
petIDFK = []

for x in range(len(petBreed)):
    index = breedList.index(petBreed[x])
    breedIDFK.append(index+1)
    petIDFK.append(x+1)

time_elapsed(tic, "Properties")
tic= time.time()


with open('./txtSQL/type_sql.txt','w',encoding="utf-8") as typeF:
    typeF.write('INSERT INTO \n')
    typeF.write('\ttype (typeName)\n')
    typeF.write('VALUES\n')
    for x in range(len(animalTypeNames)):
        if x == len(animalTypeNames)-1:
            typeF.write("\t('" + str(animalTypeNames[x]) + "');")
        else:
            typeF.write("\t('" + str(animalTypeNames[x]) + "'),\n")


with open('./txtSQL/breed_sql.txt','w',encoding="utf-8") as breedF:
    breedF.write('INSERT INTO \n')
    breedF.write('\tbreed (breedname, typeid)\n')
    breedF.write('VALUES\n')
    for x in range(len(breedList)):
        if x == len(breedList)-1:
            breedF.write("\t('" + str(breedList[x]) + "', "  + str(typeIDFK[x]) + ");")
        else:
            breedF.write("\t('" + str(breedList[x]) + "', "  + str(typeIDFK[x]) + "),\n")


with open('./txtSQL/pet_breed_sql.txt','w',encoding="utf-8") as pet_breedF:
    pet_breedF.write('INSERT INTO \n')
    pet_breedF.write('\tpet_breed (breedid, petid)\n')
    pet_breedF.write('VALUES\n')
    for x in range(len(breedIDFK)):
        if x == len(breedIDFK)-1:
            pet_breedF.write('\t(' + str(breedIDFK[x]) + ', ' + str(petIDFK[x])+');')
        else:
            pet_breedF.write('\t(' + str(breedIDFK[x]) + ', ' + str(petIDFK[x]) + '),\n')


time_elapsed(tic, "Sql")
tic= time.time()

stop = time.time()
print("total time: " + str(stop-start) + "\n")

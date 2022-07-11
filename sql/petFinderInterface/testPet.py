import petpy

apiKey = 'WnA5GqjNe8BG0u0K0j98iMB1u0BL3PDzhEE5Z1uGnsN9yrs5KW'
secretKey = 'p7NFhXFZ41uV2yZfhyKKsaiuOWjAcLPKckSmBurG'


####animals and orgs
dispOps = ['good_with_children','good_with_dogs','good_with_cats',
    'house_trained','declawed','special_needs','shots_current', 'affectionate', 'friendly'
    'playful','intelligent','cute','happy', 'gentle','curious','funny', 'quiet', 'dignified', 
    'couch potato', 'loves kisses']

pf = petpy.Petfinder(apiKey,secretKey)

pet = pf.animals(results_per_page=1,pages=1)
pet = pet['animals']
pet = pet[0]

petNames =pet['name']
petAge=pet['age']
petBlurb =pet['description']
petType =pet['type']
petBreed =pet['breeds']
petGender =pet['gender']
petSize = pet['size']
petStatus =pet['status']
petAts = pet['attributes']
petTags = pet['tags']
petEnv = pet['environment']
petPhotos =pet['photos']

if len(petPhotos) > 0:
    tempPhotos =[]
    for x in range(len(petPhotos)):
        pics = petPhotos[x]
        tempPhotos.append(pics['full'])
    petPhotos = tempPhotos

petOrg =pet['organization_id']

petDispo = []

print('Name: ' + str(petNames) + '\n')
print('Age: ' + str(petAge) + '\n')
print('Blurb: ' + str(petBlurb) + '\n')
print('Type: ' + str(petType) + '\n')
print('Breed: ' + str(petBreed) + '\n')
print('Gender: ' + str(petGender) + '\n')
print('size: ' + str(petSize) + '\n')
print('status: ' + str(petStatus) + '\n')
print('Attributes: ' + str(petAts) + '\n')
print('Tags: ' + str(petTags) + '\n')
print('Environment: ' + str(petEnv) + '\n')
print('Photos: ' + str(petPhotos) + '\n')
print('petOrg: ' + str(petOrg) + '\n')


atTemp = []
tagsTemp =[]
envTemp =[]

if petAts['spayed_neutered'] == True:
    petDispo.append('spayed_neutered')

if petAts['house_trained'] == True:
    petDispo.append('house_trained')

if petAts['declawed'] == True:
    petDispo.append('declawed')

if petAts['special_needs'] == True:
    petDispo.append('special_needs')

if petAts['shots_current'] == True:
    petDispo.append('shots_current')



if petEnv['children'] == None:
    petDispo.append('good_with_children')

if petEnv['dogs'] == None:
    petDispo.append('good_with_dogs')

if petEnv['cats'] == None:
    petDispo.append('good_with_cats')

for x in petTags:
    petDispo.append(x.lower())

petID = 1
petIDFK = []
dispIDFK = []

for x in petDispo:
    if x in dispOps:
        index = dispOps.index(x)
        dispIDFK.append(index + 1)
        
    else:
        dispOps.append(x)
        dispIDFK.append(len(dispOps))
    petIDFK.append(petID)


print('petDisp: '  + str(petDispo) + '\n')
    

for x in range(len(dispIDFK)):
    print('petID: ' + str(petIDFK[x]) + ', dispID: ' + str(dispIDFK[x]) + '\n')



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




with open('./txtSQL/type_sql.txt','w') as nameF:
    nameF.write('INSERT INTO \n')
    nameF.write('\ttype (typeName)\n')
    nameF.write('VALUES\n')
    for x in range(len(animalTypeNames)):
        if x == len(animalTypeNames)-1:
            nameF.write('\t(' + str(animalTypeNames[x]) + ')')
        else:
            nameF.write('\t(' + str(animalTypeNames[x]) + '),\n')



### breeds
breedList= []
i = 1
for x in animalTypeNames:
    breeds = pf.breeds(x.lower())
    breeds = breeds['breeds']
    breeds = breeds[x.lower()]
    for y in breeds:
        breedList.append(y)
        typeIDFK.append(i)
    i = i + 1

zipped_lists = zip(breedList,typeIDFK)
sorted_group = sorted(zipped_lists)
tuples = zip(*sorted_group)
breedList,typeIDFK = [list(tuple) for tuple in tuples]


with open('./txtSQL/breed_sql.txt','w') as nameF:
    nameF.write('INSERT INTO \n')
    nameF.write('\tbreed (breedName, typeID)\n')
    nameF.write('VALUES\n')
    for x in range(len(breedList)):
        if x == len(breedList)-1:
            nameF.write('\t(' + str(breedList[x]) + ', ' + str(typeIDFK[x])+')')
        else:
            nameF.write('\t(' + str(breedList[x]) + ', ' + str(typeIDFK[x]) + '),\n')



####pet_breeds
breedIDFK = []
petIDFK = []

for x in range(len(petBreed)):
    index = breedList.index(petBreed[x])
    breedIDFK.append(index+1)
    petIDFK.append(x+1)
    
with open('./txtSQL/pet_breed_sql.txt','w') as nameF:
    nameF.write('INSERT INTO \n')
    nameF.write('\tpet_breed (breedID, petID)\n')
    nameF.write('VALUES\n')
    for x in range(len(breedIDFK)):
        if x == len(breedIDFK)-1:
            nameF.write('\t(' + str(breedIDFK[x]) + ', ' + str(petIDFK[x])+')')
        else:
            nameF.write('\t(' + str(breedIDFK[x]) + ', ' + str(petIDFK[x]) + '),\n')



import petpy

apiKey = 'WnA5GqjNe8BG0u0K0j98iMB1u0BL3PDzhEE5Z1uGnsN9yrs5KW'
secretKey = 'p7NFhXFZ41uV2yZfhyKKsaiuOWjAcLPKckSmBurG'

pf=petpy.Petfinder(apiKey,secretKey)

animalTypes = pf.animal_types()

animalTypes = animalTypes['types']
animalTypeNames =[]
typeIDFK = []

### animal types
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


### animal breeds
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

with open('./txtSQL/breed_sql.txt','w') as nameF:
    nameF.write('INSERT INTO \n')
    nameF.write('\tbreed (breedName, typeID)\n')
    nameF.write('VALUES\n')
    for x in range(len(breedList)):
        if x == len(breedList)-1:
            nameF.write('\t(' + str(breedList[x]) + ', ' + str(typeIDFK[x])+')')
        else:
            nameF.write('\t(' + str(breedList[x]) + ', ' + str(typeIDFK[x]) + '),\n')


# convertExcelToJson

Build an API that takes an excel file as input, parses it and stores the data in the database.

## Features

- A POST route “/api/pet” to add pets from an excel file
- A GET route “/api/pet” to get all the pets in the database
- A GET route “/api/pet/<petId>” to get a specific pet (petId will be a dynamic value eg. /api/pet/abc123)
- A PATCH route “/api/pet/<petId>” to update the details of a specific pet
- A DELETE route “/api/pet/<petId>” to delete a specific pet

## Columns in the excel file

1. Name
2. Type
3. Breed
4. Age

## Tech stack to be used

Node.js, Express and MongoDB using mongoose

##
Packages Installed

1)express

2)Mongoose

3)xlsx

3)body-parser

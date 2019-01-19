# Purpose
Back-end API for simple inventory rental management. 

## Getting Started

#### Prerequisites
Dependencies are listed in requirements.txt. To install all the dependencies for this project, create a virtual environment with Python 3.6 and run the following command to install dependencies:
```
pip install -r requirements.txt
```

See below for basic database design.

#### Running the Application
To run the application (Flask, localhost:5000):
```
python server.py
```

## DB Design

users >---< items

| users                |    | items                 |    | checked_out_items       |
|----------------------|    |-----------------------|    |-------------------------|
| id (PK)    | INT     |    | int (PK)    | INT     |    | id (PK)       | INT     |
| first_name | VARCHAR |    | description | VARCHAR |    | item_id       | INT     |
| last_name  | VARCHAR |    | count       | INT     |    | user_id       | INT     |
| email      | VARCHAR |    | available   | INT     |    | checkin_date  | DATE    |
|            |         |    |             |         |    | checkout_date | DATE    |

## To Do
- allow for uploading of csv to add new users
- functionality for item creation/updating

## Setup
Currently links to React front-end here: [https://github.com/tehtertot/dongleminder]
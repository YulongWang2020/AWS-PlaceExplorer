# AWS-PlaceExplorer

## Introduction:

Place Explorer is a web application built using Bootstrap, Javascript, and AWS microservices. It allows users to upload their own picture on the map as well as check pictures uploaded by other users. It provides an intuitive way to explore tourism.

## Architecture and Components:

![alt text](https://github.com/YulongWang2020/AWS-PlaceExplorer/blob/master/architecture.jpg)

### S3 Web Frontend:
Used Bootstrap to create the UI and Google Map API for Javascript to embed the map. S3 uploading and API calls are done by AWS Javascript SDK.

### Cognito:
The frontend talk with cognito to signup and login user. When user signing up, Cognito will send the verify code to user email to confirm the account. After login, app will store the token returned by Cognito in to local variable. Every time user upload the marker, the frontend will check if the id token is still valid, if not, it will ask the user to login again.

### Api Gateway:
The frontend call POST method to upload picture to S3 bucket, and uses GET to search markers.

### Lambda Function (LF0):
When an authorized user uploaded a image to S3 (which also calls the POST api), LF0 gets invoked. The frontend sends the userid, file name, marker location, and comment to the lamdba function. Then, the function will go to S3 bucket and check if the image has been successfully uploaded, if true, it will rename the image using uuid. After that, the new uploaded marker is appended to the corresponding user in Dynamodb. LF0 also index the uploaded marker in ElasticSearch.

### DynamoBD:
Stores user name, user id, and all markers(comment, location, and image url) uploaded by the user.

### ElasticSearch:
Stores user id, marker location and image url.

### Lambda Function (LF1):
The GET method invokes this function and it will use ElasticSearch to search all markers in current view bound. It return marker location and image url to the frontend.













# Complete Backend in node js

  This is the complete backend in node js

- [Model Link(schema link) ](
    https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj
)

# Notes
 git cannot tracked the empty folder we need to create the file inside the folder incase if we want to track that folder as well or we can create the .gitkeep file inside that folder and now folder will tracked

 To generate the .gitignore file code
 url:- https://mrkandreev.name/snippets/gitignore-generator/

   # "type": "module" Added in packet.json :-
    To use the import(statement) library instead of require(when we need packages to use)
  
when we make chanes in env file then we need to restart the server again 
  
  # Use dotenv as import
  till now dotenv is used only with require so to use as import state we need to write
  this in script 
  -r dotenv/config --experimental-json-modules

  which mean now we can use the dotenv package as import statement

 


# mongodb connection

Always write code in try and catch block

devDependencies:- means only used in development on production this will not use


# access token and Refresh Token
Acces token expiry is less as compare to refresh token mostly we put the refresh token expiry for more time as compare to access token

  * we will store the refresh token in the db but not store the access token in Db
  * access and refresh token creates in same way but the major difference is that in refresh token the expiry time is much and we add only id in payload instead of user detail


# Topic: - Upload file in backend
  * Always use file upload functionality as utility so that we can use that utility wherever we needed file upload functionality
  * cloudnairy is used to upload file and this returns us the url which we will store in the DB
  * We need two package for file uploading in express js
  1. multer 
  2. Express file upload

install cloudnairy 
install multer

cloudnairy url:- 
https://cloudinary.com/users/register_free

# Topic : http crash course
  Http vs https:- in http data is send in plain text but in https data is sent in encrypted form
  HTTP:- Hyper text transer protocol
  url:- uniform resource locator (location )
  urI:- uniform resource indentifier 
  Https headers:- key-value sent along with request and response
  used for :- caching, authentication , manage state:- x prefix(depricated)
  Request headers:- from client
  Response headrs:- from server
  payload headrs:- data


most common headers:
Accept: application/json:- what kind of data is accepting
user-agent:- where request come from which browser etc(mobile browser)
authorization:- from frontend(where authorization token is sent)

# Http methods
GET, POST , DELETE

PUT:- Repalce a resource
PATCH:- Change a part of resource


# http status codes
  1**   informational
  2**   Success
  3**   Redirection
  4**   client error
  5**   server error


  100   continue 
  102   processing
  200   ok
  201   created
  202   accepted
  307   tempraroy redirect
  308   permanent redirect
  400   bad request
  401   unauthirized
  402   payment required
  404   not found
  500   internal server error
  504   Gatway time out

# Router and controller with debugging
steps
1. Get user deails from frontend
2. Check validation
3. Check already exit with email or username or not
4. check for image
5. upload images on cloudinary
6. return url from cloudinary
7. Create user object - create entry in db
8. Return the response excluding(password and refresh token)
9. if user is not created then return error else return user

when we added the file midleware for file handling like multer then 
that gives us the access of req.files in the controller 


# Login building Registe controller

# How to use postman
How to use the postman for the Backend:-

=>   First verify that register functionality is working or not

=> Use the form data if we have file need to upload other wise use json
 object type data in postman

=> In postman environment we can set the variable and give them a 
Values
=> After that we can link that variable with the collection by selecting the 
Environment in the right side in the postman
=>
For example i have 
Set the variable in the environment
 Server:- localhost//8080
Use them in the collection
Like
Wherever we needed that variable 
{{server}}

# thunder client 
vs code extension to hit the api's

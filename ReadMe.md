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
acces token expiry is less as compare to refresh token mostly we put the refresh token expiry for more time as compare to access token

* we will store the refresh token in the db but not store the access token in Db

* access and refresh token creates in same way but the major difference is that in refresh token the expiry time is much and we add only id in payload instead of user detail


# Topic: - Upload file in backend
* Always use file upload functionality as utility so that we can use that utility wherever we needed file upload functionality
* cloudnairy is used to upload file and this returns us the url which we will store in the DB
* We need two package for file uploading in express js
1. multer 
2. express file upload

install cloudnairy 
install multer

cloudnairy url:- 
https://cloudinary.com/users/register_free

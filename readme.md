Full stack crud

1.part1
2.part2

## part 1

- revision (jwt)
- token - better way to get the token
- hashing - password
- we are going to plan backend application
  - notes take app
- express application (basic routes)

## part -2

- relationships --> implement
- frontend -->react (test backend)
- how to connect (frontend - backend)

- deployment (Backend)
- API documentation (swagger)

## today part-1

- revision
  - authentication
  - authorization
  - register -post
  - login - post - token (jwt)

Jwt

- auth/ author
- transfering of data ( relationship)

jwt --->

1. header ---> encryption algo, type of token
2. payload ----> random data
3. signature ---> secret key (verify -decoding)

---

hashing
abc--->$ab#1c ---> 1#$a5c#&0oiuoij

---

Notes taking app

user routes
--> /users/register : to register a new user
--> /users/login : authentication the registered user

for below routes to work the user needs to be authenticated(token)
notes routes
-->/notes/create : creating a new note about some concept

authorization (need to check who is making the changes or getting the notes )
(1- many relationship)
-->/notes : to get all the created notes
-->/notes/update/:noteID : to update any note
-->/notes/delete/:noteID : to delete a note

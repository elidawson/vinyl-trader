# vinyl trader

![record image](images/readme-images/record.jpeg)

vinyl trader is a website used to list, sell, and trade vinyl records. 

My capstone project for the Flatiron Software Engineering Bootcamp.

## User Stories

* Users can browse, favorite, like and comment on vinyl records for sale or trade, in a timeline feed.
* Users can filter timeline by location, name, price, and date added.
* Users can post their own records for sale or trade.
* Users can create, edit, and delete profile
* Users can see all of their posted vinyl and activity in their profile page.
* Users can search all listed vinyl

## Stretch Goals
* Users can interact directly with other users via Direct messages.
* Users can follow other users.
* Ability to actually purchase records (Stripe Integration)

## API Routes
| API Route | Request Method | Body | Response |
|:---:|:---:|:---:|:---:|
|/signup|POST|{name, email, password}|{id, name, email, password}, 201| 
|/login|POST|{email, password}|{{"message": "login successful"}, "user": {id, name, email}}, 201|
|logout|DELETE||{"message": "logout successful"}, 202|
|users/{id}|GET||{id, name, email}, 200|
|/users/{id}|PATCH| {"email", "password"}|{"id", "name", "email"}, 200|
|/users/{id}|DELETE||{}, 204|
|/vinyl|GET||{{id, title, artist, used, release_year, size, like_count}, {...}, {...}}, 200|
|/vinyl/{id}|GET|{id}|{id, title, artist, used, release_year, size, like_count}, 200|
|/vinyl/{id}|PATCH|{id}|{id, title, artist, used, release_year, size, like_count}, 200|
|vinyl/{id}|DELETE||{}, 204|
|comments/{id}|GET|{id}|{record_id, body}, 200|
|comments/{id}|POST|{record_id, body}|{record_id, user_id, body}, 201|
|comments/{id}|PATCH|{body}|{record_id, user_id, body}, 201|
|comments/{id}|DELETE||{}, 204|
|genres|GET||{{name, records}, {...}, {...}}, 200|
|genres/{id}|GET|{id}|{name, records}, 200|
|genres|POST|{name}|{name, records}, 201|
|genres|DELETE||{}, 204|

## Client Routes
|Client Route|Component|
|:---:|:---:|
|/|Home.jsx|
|/signup|Signup.jsx|
|/signin|Signin.jsx|
|/user/{id}|User.jsx|
|/account|Account.jsx|
|/account/edit|AccountEdit.jsx|
|/genres|Genres.jsx|
|/newvinyl|NewVinyl.jsx|
|/vinyl/{id}|Vinyl.jsx|
|/vinyl/{id}|VinylEdit.jsx|
|/search|Search.jsx|
|/notfound|Notfound.jsx|

## React Tree
![React Tree](images/readme-images/react-tree.png)

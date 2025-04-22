# Playground API

This project is an **open-source** API for a social media post application. Everything you need for a backend implementations are done for you from Authentication to CRUD functionalities. You only have to build your own frontend to interact with the API. You can use any frontend frameworks/library your are comfortable working with.

To read more on how to consume the API, please read the docs on this website [https://docs-playground-api.vercel.app]

### Prerequisites

- _Nodejs_
- _Expressjs_
- _TypeScript_
- _SQL_
- _Prisma ORM_

The API is build using **Nodejs** and **Expressjs** and it's written in **TypeScript**. It uses the **PostgreSQL** as the database with **Prisma ORM**.

### How to Access

To get started, on this repo, click on the `code` dropdown and copy the URL. Back in your local editor, open terminal/powershell and paste the URL after git clone.

```shell
git clone https://github.com/leesdonson/api-playground.git <api>
```

**Note** : Make sure to specify the directory which you want your backend code to be, in the place of **api**. If you are already in the directory, just put a dot (.) so it's going to clone it in the current repo/directory.

After you successfully clone the repo, open terminal and navigate to api directory (if you use other directory name) and run the dev server.

```shell
npm run dev
```

### Endpoints

- Auth  
  All authentication related endpoints;
  - Sign In
  - Sign Up
  - Sign Out
- Users  
  All user related endpoints
  - Profile
  - Update Profile
  - Delete profile
- Posts  
  All Posts related endpoints
  - Add post
  - Get single post
  - Get all posts
  - Edit post
  - Delete post
- Comments  
  All comments related endpoints
  - Add comment
  - Get comments
  - Edit comment
  - Delete comment

_Remember_:  
 You are not limited to these, you can modify the code and build on that further. This is just the starting point.

**Note**: For image uploads, I recommend you use Cloudinary as the storage. _Tip_: Before submitting data that requires image, make an async call to Cloudinary and await the call and then get the image url and send it to the backend to store the url in the db.

Thank you  
Happy coding!

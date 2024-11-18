# Data Schema

## Users

- \_id
- name
- email
- password
- role
- createdAt
- updatedAt

```typescript
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'instructor'], default: 'user' },
  },
  { timestamps: true },
)

export default userSchema
```

## Quizzes

- \_id
- topic
- title
- quiz
- solutions --> [{id , body}]
- correctSolution
- createdAt
- updatedAt

```typescript
import mongoose from 'mongoose'

const quizzeSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    quiz: { type: String, required: true, trim: true },
    solutions: {
      type: [
        {
          id: { type: String, required: true },
          body: { type: String, required: true },
        },
      ],
    },
    correctSolution: { type: String, required: true, trim: true },
    // @TODO: add userRef attribute feature
  },
  { timestamps: true },
)

export default quizzeSchema
```

## Announcements

- \_id
- title
- content
- userRef ---> \_id for user
- createdAt
- updatedAt

```typescript
import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, trim: true },
  },
  { timestamps: true },
)

export default announcementSchema
```

# API Endpoints

## **Note:**: How to update user permissions to admin or instructor ?

- In MongoDB Database
- Directly Edit the `role` field of the user document to the desired role -> [ `admin` | `instructor` ] default `user`


## Postman Collection [link](https://api.postman.com/collections/22922208-86977d28-da12-4618-8f11-ed408a40b80d?access_key=PMAT-01JCZCYR5DN3TWDBQ51XQWE6MF)

## Users

### Get All Users [@protectAuth @permission [admin , instructor]]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `GET`  | `/users`              |

<br>

### Create User [@Public]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `POST` | `/users`              |

<br>

### Get User [@protectAuth @permission [admin , instructor, user]]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `GET`  | `/users/:id`          |

<br>

### Update User [@protectAuth @permission [admin , user]]

| METHOD  | localhost:3005/api/v0 |
| :------ | :-------------------- |
| `PATCH` | `/users/:id`          |

<br>

### Delete User [@protectAuth @permission [admin , user]]

| METHOD   | localhost:3005/api/v0 |
| :------- | :-------------------- |
| `DELETE` | `/users/:id`          |

<br>

### Authenticate User [@Public]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `POST` | `users/auth`          |

<br>

## Quizzes

### Get All Quizzes [@protectAuth ]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `GET`  | `/quizzes`            |

### Create Quizze [@protectAuth @permission [admin , instructor]]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `POST` | `/quizzes`            |

### Get Quizze [@protectAuth ]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `GET`  | `/quizzes/:id`        |

### Update Quizze [@protectAuth @permission [admin , instructor]]

| METHOD  | localhost:3005/api/v0 |
| :------ | :-------------------- |
| `PATCH` | `/quizzes/:id`        |

### Delete Quizze [@protectAuth @permission [admin , instructor]]

| METHOD   | localhost:3005/api/v0 |
| :------- | :-------------------- |
| `DELETE` | `/quizzes/:id`        |

## Announcements

### Get All Announcements [@protectAuth ]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `GET`  | `/announcements`      |

### Create Announcement [@protectAuth @permission [admin , instructor]]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `POST` | `/announcements`      |

### Get Announcement [@protectAuth ]

| METHOD | localhost:3005/api/v0 |
| :----- | :-------------------- |
| `GET`  | `/announcements/:id`  |

### Update Announcement [@protectAuth @permission [admin , instructor]]

| METHOD  | localhost:3005/api/v0 |
| :------ | :-------------------- |
| `PATCH` | `/announcements/:id`  |

### Delete Announcement [@protectAuth @permission [admin , instructor]]

| METHOD   | localhost:3005/api/v0 |
| :------- | :-------------------- |
| `DELETE` | `/announcements/:id`  |

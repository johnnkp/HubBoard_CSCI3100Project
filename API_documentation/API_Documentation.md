<a name="top"></a>
# HubBoard API v0.0.0

HubBoard API

# Table of contents

- [Admin](#Admin)
  - [Get all user data](#Get-all-user-data)
  - [Reset User Password](#Reset-User-Password)
  - [Verify if user is admin](#Verify-if-user-is-admin)
- [Auth](#Auth)
  - [Email verification](#Email-verification)
  - [Google Authentication](#Google-Authentication)
  - [Google Authentication Callback](#Google-Authentication-Callback)
  - [Login](#Login)
  - [Resend verification email](#Resend-verification-email)
  - [Reset Password](#Reset-Password)
  - [Send Reset Password Email](#Send-Reset-Password-Email)
  - [User registration](#User-registration)
- [Socket](#Socket)
  - [Notifications of user](#Notifications-of-user)
- [User](#User)
  - [Get info of current user](#Get-info-of-current-user)
  - [Get profile photo](#Get-profile-photo)
  - [Logout](#Logout)
  - [Modify password](#Modify-password)
  - [Upload profile photo](#Upload-profile-photo)
  - [Verify if user is authenticated](#Verify-if-user-is-authenticated)
- [User_Interaction](#User_Interaction)
  - [Friend request](#Friend-request)
  - [Friend Request Response](#Friend-Request-Response)
  - [Get all user](#Get-all-user)
  - [Get friends list](#Get-friends-list)
  - [Unfriend](#Unfriend)
- [User_Todolist](#User_Todolist)
  - [](#)
  - [Create todolist](#Create-todolist)
  - [Get all comments of a todolist](#Get-all-comments-of-a-todolist)
  - [Get all todolists of current user](#Get-all-todolists-of-current-user)
  - [Update todolist](#Update-todolist)
- [User_Todolist_Checkbox](#User_Todolist_Checkbox)
  - [Create Checkbox](#Create-Checkbox)
  - [Delete Checkbox](#Delete-Checkbox)
  - [Update checkbox](#Update-checkbox)
- [User_Todolist_Comment](#User_Todolist_Comment)
  - [Add comment](#Add-comment)
- [User_Todolist_Contributor](#User_Todolist_Contributor)
  - [Contributor Request](#Contributor-Request)
  - [Remove contributor](#Remove-contributor)
  - [Response to contributor request](#Response-to-contributor-request)

___


# <a name='Admin'></a> Admin

## <a name='Get-all-user-data'></a> Get all user data
[Back to top](#top)

```
GET /api/admin/getAllUser
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True.</p> |
| users | `Object` | <p>User data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False.</p> |
| message | `String` | <p>Error message.</p> |

## <a name='Reset-User-Password'></a> Reset User Password
[Back to top](#top)

```
PUT /api/admin/resetUserPassword
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| username | `String` | <p>Username of the user to reset password</p> |
| password | `String` | <p>New password to set</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Verify-if-user-is-admin'></a> Verify if user is admin
[Back to top](#top)

```
GET /api/admin/adminVerify
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true if user is admin</p> |
| message | `String` | <p>message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false if user is not admin</p> |
| message | `String` | <p>message</p> |

# <a name='Auth'></a> Auth

## <a name='Email-verification'></a> Email verification
[Back to top](#top)

```
GET /api/auth/emailVerify/:token
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>Token for verifying email</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Email verification token not provided</p> |

#### Error response - `404`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Email verification token not found</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Internal server error</p> |

## <a name='Google-Authentication'></a> Google Authentication
[Back to top](#top)

<p>redirects to google authentication page</p>

```
POST /api/auth/google
```

## <a name='Google-Authentication-Callback'></a> Google Authentication Callback
[Back to top](#top)

<p>Handle callback from Google authentication</p>

```
POST /api/auth/google/callback
```

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| code | `String` |  |
| scope | `String` |  |
| authuser | `String` |  |
| promote | `String` |  |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| redirectPage | `String` | <p>Page to redirect</p> |
| message | `String` | <p>Success message</p> |
| email | `String` | <p>User email from Google profile for registration, undefined if login successful.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Login'></a> Login
[Back to top](#top)

<p>API for login operation. Return cookie if success.</p>

```
POST /api/auth/login
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| username | `String` | <p>Username (min 3 characters).</p> |
| password | `String` | <p>Password (min 6 characters).</p> |
### Success response

#### Success response - `200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `400`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |
| error_code | `Number` | <p>Error code: 1 : Invalid username or password, 2 : Email not verified, 3 : Wrong username or password, 4 : User not found</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Internal server error</p> |

## <a name='Resend-verification-email'></a> Resend verification email
[Back to top](#top)

```
POST /api/auth/emailResend
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>Email address to resend a verification email.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True.</p> |
| message | `String` | <p>Success message.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false.</p> |
| message | `String` | <p>Error message.</p> |

## <a name='Reset-Password'></a> Reset Password
[Back to top](#top)

```
POST /api/auth/resetPassword
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| resetPasswordToken | `String` | <p>&quot;resetPasswordToken&quot; of the user</p> |
| newPassword | `String` | <p>New password of the user (min. 6 characters)</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Send-Reset-Password-Email'></a> Send Reset Password Email
[Back to top](#top)

```
POST /api/auth/resetPasswordEmail
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>Email address of the user to reset the password.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True if the email was sent successfully.</p> |
| message | `String` | <p>Success message.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False if the email was not sent successfully.</p> |
| message | `String` | <p>Error message.</p> |

## <a name='User-registration'></a> User registration
[Back to top](#top)

```
POST /api/auth/register
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| username | `String` | <p>Username (min. 3 characters)</p> |
| email | `String` | <p>Email</p> |
| password | `String` | <p>Password (min. 6 characters)</p> |
### Success response

#### Success response - `202`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| message | `String` | <p>Verification email sent</p> |

### Error response

#### Error response - `409`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| error_attr | `String` | <p>Attribute that cause error</p> |
| message | `String` | <p>Error message</p> |

#### Error response - `500`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Internal server error</p> |

# <a name='Socket'></a> Socket

## <a name='Notifications-of-user'></a> Notifications of user
[Back to top](#top)

<p>This socket is used to get notifications of user</p>

```
SOCKET notifications
```

### Examples

Example usage:

```js
ws.on('notifications', (notifications) => {
     // Do something
})
```


### Success response example

#### Success response example - `Example return:`

```js
// Array of notifications
[
    {
        "_id": "62289d1c7f3f8b9b913c7672", // Notification id
        "content": { // Notification content
            "_id": "62289d1c7f3f8b9b913c7670", // Friend request id
            "fromUser": {
                "_id": "621f6f49849ea9671627004e",
                "username": "username"
            },
        },
        "owner": "621f6f49849ea9671627004e",
        "time": "2022-03-09T12:49:41.321Z",
        "__t": "FriendRequestNotification", // Notification type
        "__v": 0
    }
]
```

# <a name='User'></a> User

## <a name='Get-info-of-current-user'></a> Get info of current user
[Back to top](#top)

```
GET /api/user/info
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| username | `String` | <p>Username of current user.</p> |
| email | `String` | <p>Email of current user.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| error | `String` | <p>Error message.</p> |

## <a name='Get-profile-photo'></a> Get profile photo
[Back to top](#top)

```
GET /api/user/profilePhoto/:username
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| username | `String` | **optional** <p>Username of user that you want to get profile photo. If not provided, will return profile photo of current user.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| file | `File` | <p>Profile photo. If no profile photo exists, will return a default profile photo.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Logout'></a> Logout
[Back to top](#top)

```
POST /api/user/logout
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true.</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false.</p> |
| message | `String` | <p>Error message.</p> |

## <a name='Modify-password'></a> Modify password
[Back to top](#top)

```
PUT /api/user/passwordModify
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| oldPassword | `String` | <p>Old password</p> |
| newPassword | `String` | <p>New password (min. 6 characters)</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Upload-profile-photo'></a> Upload profile photo
[Back to top](#top)

```
PUT /api/user/profilePhoto
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| profilePhoto | `File` | <p>Profile photo. A file with a file extension of .jpg, .jpeg, or .png and a size of less than 1 MB.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Verify-if-user-is-authenticated'></a> Verify if user is authenticated
[Back to top](#top)

```
GET /api/user/authVerify
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true if user is authenticated</p> |
| message | `String` | <p>message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false if user is not authenticated</p> |
| message | `String` | <p>message</p> |

# <a name='User_Interaction'></a> User_Interaction

## <a name='Friend-request'></a> Friend request
[Back to top](#top)

<p>Send a friend request to target user.</p>

```
POST /api/user/interaction/friendRequest
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| targetUsername | `String` | <p>The username of target user.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True.</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False.</p> |
| message | `String` | <p>Error message</p> |

## <a name='Friend-Request-Response'></a> Friend Request Response
[Back to top](#top)

```
POST /api/user/interaction/friendRequestResponse
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| requestId | `String` | <p>The id of the friend request.</p> |
| isAccepted | `Boolean` | <p>If the request is accepted.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True.</p> |
| message | `String` | <p>Success message.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False.</p> |
| message | `String` | <p>The error message.</p> |

## <a name='Get-all-user'></a> Get all user
[Back to top](#top)

```
GET /api/user/interaction/getAllUser
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `String` | <p>true</p> |
| users | `Object[]` | <p>List of user.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `String` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Get-friends-list'></a> Get friends list
[Back to top](#top)

```
GET /api/user/interaction/getFriendsList
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| friendsList | `Object[]` | <p>List of friends' username</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Unfriend'></a> Unfriend
[Back to top](#top)

```
POST /api/user/interaction/unfriend
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| targetUsername | `String` | <p>The username of the user to unfriend.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True.</p> |
| message | `String` | <p>The message to display to the user.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False.</p> |
| message | `String` | <p>The error message.</p> |

# <a name='User_Todolist'></a> User_Todolist

## <a name=''></a> 
[Back to top](#top)

```
DELETE /api/user/todolist/deleteTodolist
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>id of the todolist to delete.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Create-todolist'></a> Create todolist
[Back to top](#top)

```
POST /api/user/todolist/createTodolist
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| title | `String` | <p>Title of the todolist</p> |
| description | `String` | <p>Optional. Description of the todolist</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>True</p> |
| todolist | `Object` | <p>The created todolist</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
{
    "success": true,
    "todolist": {
        "owner": "621f6f49849ea9671627004e",
        "contributors": [],
        "title": "todolist title",
        "description": "todolist description",
        "active": true,
        "comments": [],
        "_id": "623b58dc2529210b39129903",
        "checkboxes": [],
        "__v": 0
    }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>False</p> |
| message | `String` | <p>Error message</p> |

## <a name='Get-all-comments-of-a-todolist'></a> Get all comments of a todolist
[Back to top](#top)

```
GET /api/user/todolist/getAllComments/:todolistId
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>The id of the todolist</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| comments | `Object[]` | <p>The comments of the todolist</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>The error message</p> |

## <a name='Get-all-todolists-of-current-user'></a> Get all todolists of current user
[Back to top](#top)

```
GET /api/user/todolist/getAllTodolists
```
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success |  | <p>true</p> |
| todolists | `Object[]` | <p>List of all todolists.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success |  | <p>false</p> |
| message |  | <p>Error message</p> |

## <a name='Update-todolist'></a> Update todolist
[Back to top](#top)

```
PUT /api/user/todolist/updateTodolist/:id
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>id of the todolist to update</p> |
| title | `String` | <p>Optional. Title to update</p> |
| description | `String` | <p>Optional. Description to update</p> |
| isActive | `Boolean` | <p>Optional. isActive to update</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |
| todolist | `Object` | <p>Updated todolist</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

# <a name='User_Todolist_Checkbox'></a> User_Todolist_Checkbox

## <a name='Create-Checkbox'></a> Create Checkbox
[Back to top](#top)

```
POST /api/user/todolist/checkbox/createCheckbox
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>Todolist id</p> |
| checkboxContent | `String` | <p>Optional (default: &quot;&quot;). Checkbox Content</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |
| todolist | `Object` | <p>Todolist Object after creation</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Delete-Checkbox'></a> Delete Checkbox
[Back to top](#top)

```
DELETE /api/user/todolist/checkbox/deleteCheckbox
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>Todolist id</p> |
| checkboxId | `String` | <p>Checkbox id</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |
| todolist | `Object` | <p>Todolist Object after creation</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Update-checkbox'></a> Update checkbox
[Back to top](#top)

```
PUT /api/user/todolist/checkbox/updateCheckbox
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>Todolist id</p> |
| checkboxId | `String` | <p>Checkbox id</p> |
| isChecked | `Boolean` | <p>Optional. Checkbox is checked or not.</p> |
| content | `String` | <p>Optional. Checkbox content.</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true.</p> |
| message | `String` | <p>Success message.</p> |
| todolist | `Object` | <p>Updated todolist.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false.</p> |
| message | `String` | <p>Error message.</p> |

# <a name='User_Todolist_Comment'></a> User_Todolist_Comment

## <a name='Add-comment'></a> Add comment
[Back to top](#top)

```
POST /api/user/todolist/comment/addComment
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| todolistId | `String` | <p>Todolist id</p> |
| content | `String` | <p>Comment content</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true.</p> |
| comment | `Object` | <p>Created comment object.</p> |
| todolist | `Object` | <p>Updated todolist object.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false.</p> |
| message | `String` | <p>Error message.</p> |

# <a name='User_Todolist_Contributor'></a> User_Todolist_Contributor

## <a name='Contributor-Request'></a> Contributor Request
[Back to top](#top)

```
POST /api/user/todolist/contributor/contributorRequest
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| targetUsername | `String` | <p>Username of the target user</p> |
| todolistId | `String` | <p>Id of the todolist</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Remove-contributor'></a> Remove contributor
[Back to top](#top)

```
DELETE /api/user/todolist/contributor/removeContributor
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| targetUsername | `String` | <p>Username of the target user</p> |
| todolistId | `String` | <p>Id of the todolist</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |

## <a name='Response-to-contributor-request'></a> Response to contributor request
[Back to top](#top)

```
POST /api/user/todolist/contributor/contributorRequestResponse
```

### Request Body

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| requestId | `String` | <p>id of the contributor request</p> |
| isAccepted | `Boolean` | <p>accept or not</p> |
### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>true</p> |
| message | `String` | <p>Success message</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| success | `Boolean` | <p>false</p> |
| message | `String` | <p>Error message</p> |


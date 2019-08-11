# iTodo
The best place to create your Todo-list

# Overview

1. Packages
2. Routing
3. Further Development
 


# Packages

There are a lot of packages that were used in this app,
which were:

1. bcrypt
2. cors
3. dotenv
4. express
5. google-auth-library
6. googleapis
7. jsonwebtoken
8. mongoose
9. morgan
10. nodemailer

# Routing
Complete routing of this app

#  User Routes

Includes SignIn, Google SignIn, and Resgitration

# POST /user/signin

To Sign In without using google authorization

    url: 'http://localhost:3000/user/signin'
    headers: token *required*,
    body: {
        email:{
            type: string
            required: true
        } ,
        password:{
            type: string
            required: true
        }
    },
    response status: {
        success: {
            message: 'Login Success'
            status: 200
        },
        error: {
            message:'Not Found',
            status: 404
        }
    }



# POST /user/Gsignin

To Sign In using google authorization

    url: 'http://localhost:3000/user/Gsignin'
    headers: token *required*,
    body: {
        email:{
            type: string
            required: true
        } ,
        password:{
            type: string
            required: true
        }
    },
    response status: {
        success: {
            message: 'Login Success'
            status: 200
        },
        error: {
            message:'Not Found',
            status: 404
        }
    }


# POST /user/register

To Register 

    url: 'http://localhost:3000/user/register'
    headers: none,
    body: {
        name:{
            type: string
            required: true
        } ,
        email:{
            type: string
            required: true
        },
        password:{
            type:string,
            required:true
        }
    },
    response status: {
        success: {
            message: 'Account is successfully created'
            status: 201
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }

# Todo Routes

Includes, CRUD of TODO, Getting current user profile, filtering Todo List

# POST /todo/createTodo

User creating Todo (status will have default value of 'Undone')

    url: 'http://localhost:3000/todo/createTodo'
    headers: token *required*,
    body: {
        name:{
            type: string
            required: true
        } ,
        description:{
            type: string
            required: true
        },
        due_date:{
            type:date,
            required:true
        }
    },
    response status: {
        success: {
            data2 : {
                name,
                description,
                status,
                due_date
            },
            message: 'Todo is successfully created'
            status: 201
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }


# POST /todo/updateStatusTodo

User can change their todo status whether it is 'Done' or 'Undone'

    url: 'http://localhost:3000/todo/updateStatusTodo'
    headers: token *required*,
    body: {
        status:{
            type: string
            required: true
        } 
    },
    response status: {
        success: {
            data : {
                name,
                description,
                status,
                due_date
            },
            message: 'Status is successfully updated'
            status: 201
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }

# POST /todo/deleteTodo

## Deleting User's Todo

    url: 'http://localhost:3000/todo/deleteTodo'
    headers: token *required*,
    body: {
        id: {
            type: string,
            required: true
        }
        status:{
            type: string
            required: true
        } 
    },
    response status: {
        success: {
            data : {
                name,
                description,
                status,
                due_date
            },
            message: 'Todo is successfully deleted'
            status: 200
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }

# POST /todo/getProfile

## Get Current User's Profile

    url: 'http://localhost:3000/todo/getProfile',
    headers: token *required*,
    body: none,
    response status: {
        success: {
            name : {
                type: string
            },
            message: 'Todo is successfully deleted'
            status: 200
        },  error: {
            message: 'Wrong token'
            status: 404
            }
    }
# POST /todo/donelist

## Get Current User's Done Todo's list

    url: 'http://localhost:3000/todo/donelist'
    headers: token *required*,
    body: none,
    response status: {
        success: {
            data : {
                name,
                description,
                status: 'Done',
                due_date
            },
            message: found your done todo list'
            status: 200
        },
        error: {
            message: 'Not Found'
            status: 404
        }
    }


# POST /todo/undonelist

## Get Current User's Undone Todo's list

    url: 'http://localhost:3000/todo/undonelist'
    headers: token *required*,
    body: none,
    response status: {
        success: {
            data : {
                name,
                description,
                status: 'Undone',
                due_date
            },
            message: 'found your undone todo list'
            status: 200
        },
        error: {
            message: 'Not Found'
            status: 404
        }
    }

# Further Development

## Hopefully there are many things that can be developed from this app such as integrating with google calendar











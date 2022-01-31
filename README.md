### ReadMe

This is a simple REST API server using nodeJS and MongoDB


It follows this order for CRUD operations - 
Incoming Request => route => controller => service => Database

## You will find the following functionaities -


Auth using JWT access and refresh tokens

    - Sign up

    - Login 


Restaurant discovery 

    - Add restaurant

    - Update restaurant

    - Find nearby restaurant (MapsApi Needed)

    - Get all restaurants added by user

    - List nearby restaurants by rating


Note - I have purposely excluded the Maps API key for security/billing reasons


## Further course of feature implementation -


Auth using JWT access and refresh tokens

    - Logout

    - Email verification

    - token handling

        -Get access token from refresh token

        -Expire refresh token



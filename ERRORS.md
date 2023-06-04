# Explanations and solutions for errors that may occur
## Table of contents
- [Unauthenticated user to perform private api requests](#unauthenticated-user-to-perform-private-api-requests)
- [The authorization header entered is invalid](#the-authorization-header-entered-is-invalid)
- [Token returned from refreshtoken function is null | undefined](#token-returned-from-refreshtoken-function-is-null--undefined)
- [Request or Response function configured in createAxiosApi is returning null or undefined value](#request-or-response-function-configured-in-createaxiosapi-is-returning-null-or-undefined-value)
- [Parameters object is empty](#parameters-object-is-empty)
- [Key [keyName] not found in path [pathName]](#key-keyname-not-found-in-path-pathname)
- [No parameter key was found in the specified path ${path}](#no-parameter-key-was-found-in-the-specified-path-path)

## API erros
### Unauthenticated user to perform private api requests

> `Explanation`: The private method of the API requires that the token exists in the cookie or has been included in the authorization header, otherwise it will return an error.

>`Solution`: Perform authentication or login to generate the token and use `api.cookie.set(token)` to insert the token or add the token directly in the authorization header.

<br/>

### The authorization header entered is invalid

> `Explanation`: This can occur if the Authorization header has been set incorrectly.

> `Solution`: If you have configured `tokenAccessType` in `createAxiosApi`, check if it was typed correctly without extra spaces.

<br/>

### Token returned from refreshtoken function is null | undefined

> `Explanation`: This error can occur if the `refreshToken` function configured in `createAxiosApi` is not returning the token or string.

> `Solution`: Review your `refreshToken` function, this function should be asynchronous and return only the token.

<br/>

### Request or Response function configured in createAxiosApi is returning null or undefined value

> `Explanation`: The error can occur if one of the functions is not returning the `req` or `res` after your changes.

> `Solution`: Return the `req` or `res` in their respective functions.

<br/>

## Route erros

### Parameters object is empty

> `Explanation`: The parameter passed in the `param` function is an empty object.

> `Solution`: Make sure you are passing a valid object in your api route containing the keys and values.

<br/>

### Key [keyName] not found in path [pathName]

> `Explanation`: You are probably passing a key in the api route which was not set correctly in the `param` function of the routes.

> `Solution`: Make sure you correctly pass the name of the keys configured in the routes.

<br/>

### No parameter key was found in the specified path ${path}

> `Explanation`: This error can occur if you are using `param` in a configured route without passing a key in the path. E.g. `param('/user')`

> `Solution`: Be sure to pass a curly brace in the path when using the `param` function. E.g. `param('/user/:id')`
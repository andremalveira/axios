# Explanations and solutions for errors that may occur
## Table of contents
- [Unauthenticated user to perform private api requests](#unauthenticated-user-to-perform-private-api-requests)
- [The authorization header entered is invalid](#the-authorization-header-entered-is-invalid)
- [Token returned from refreshtoken function is null | undefined](#token-returned-from-refreshtoken-function-is-null--undefined)
- [Request or Response function configured in createAxiosApi is returning null or undefined value](#request-or-response-function-configured-in-createaxiosapi-is-returning-null-or-undefined-value)

## API erros
### Unauthenticated user to perform private api requests

> `Explanation`: The private method of the API requires that the token exists in the cookie or has been included in the authorization header, otherwise it will return an error.

>`Solution`: Perform authentication or login to generate the token and use `api.cookie.set(token)` to insert the token or add the token directly in the authorization header.


### The authorization header entered is invalid

> `Explanation`: This can occur if the Authorization header has been set incorrectly.

> `Solution`: If you have configured `tokenAccessType` in `createAxiosApi`, check if it was typed correctly without extra spaces.


### Token returned from refreshtoken function is null | undefined

> `Explanation`: This error can occur if the `refreshToken` function configured in `createAxiosApi` is not returning the token or string.

> `Solution`: Review your `refreshToken` function, this function should be asynchronous and return only the token.


### Request or Response function configured in createAxiosApi is returning null or undefined value

> `Explanation`: The error can occur if one of the functions is not returning the `req` or `res` after your changes.

> `Solution`: Return the `req` or `res` in their respective functions.


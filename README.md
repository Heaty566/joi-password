![npm](https://img.shields.io/npm/v/joi-password)
![npm](https://img.shields.io/npm/dw/joi-password)
![npm bundle size](https://img.shields.io/bundlephobia/min/joi-password)

[![NPM](https://nodei.co/npm/joi-password.png)](https://nodei.co/npm/joi-password/)

# joi-password

A Joi extension that help to validate a complex password

## Installation

### Npm

```sh
npm install joi joi-password
```

### Yarn

```sh
yarn add joi joi-password
```

### CDN

```html
<script src="https://unpkg.com/joi@17.4.2/dist/joi-browser.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/heaty566/joi-password@2.0.3/cdn/joi-password.min.js"></script>
```

## Joi extend function

-   minOfUppercase(min: number): Specifies the minimum number of uppercase string characters.
-   minOfLowercase(min: number): Specifies the minimum number of lowercase string characters.
-   minOfSpecialCharacters(min: number): Specifies the minimum number of special string characters.
-   minOfNumeric(min: number): Specifies the minimum number of numeric characters.
-   noWhiteSpaces(): Verifies that a schema has no white spaces, Please do not combine trim() function to make this function works perfectly.

## Usage

```javascript
const joi = require("joi");
const joiPassword = require("joi-password");

const schema = (input) =>
    joi
        .object({
            username: joi.string().min(5).max(10).required(),
            password: joiPassword
                .string()
                .minOfSpecialCharacters(2)
                .minOfLowercase(2)
                .minOfUppercase(2)
                .minOfNumeric(2)
                .noWhiteSpaces()
                .required(),
        })
        .validate(input);

const { error, value } = schema({ username: "hello", password: "aaAA@@00" });

console.log(error); // undefined
```

## Custom error message

```javascript
const joi = require("joi");
const joiPassword = require("joi-password");

const schema = (input) =>
    joi
        .object({
            data: joiPassword
                .string()
                .minOfSpecialCharacters(2)
                .minOfLowercase(3)
                .minOfUppercase(4)
                .minOfNumeric(5)
                .noWhiteSpaces()
                .messages({
                    "password.minOfUppercase": "{#label} my custom error message min {#min}",
                    "password.minOfLowercase": "{#label} my custom error message min {#min}",
                    "password.minOfSpecialCharacters": "{#label} my custom error message min {#min}",
                    "password.minOfNumeric": "{#label} my custom error message min {#min}",
                    "password.noWhiteSpaces": "{#label} my custom error message",
                }),
        })
        .validate(input, { abortEarly: false });

const { error } = schema({ data: "aA@0 " });

console.log(error);
// 'data' my custom error message min 2
// 'data' my custom error message min 3
// 'data' my custom error message min 4
// 'data' my custom error message min 5
// 'data' my custom error message
```

## @hapi/joi supports

https://www.npmjs.com/package/hapi-joi-password

## License

MIT

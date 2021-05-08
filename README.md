A Joi extension that help to validate a complex password

## Installation

### Npm

```sh
npm i joi-password
```

### Yarn

```sh
yarn add joi-password
```

## Joi extend function

- minOfUppercase(min: number): Specifies the minimum number of uppercase string characters.
- minOfLowercase(min: number): Specifies the minimum number of lowercase string characters.
- minOfSpecialCharacters(min: number): Specifies the minimum number of special string characters.
- minOfNumeric(min: number): Specifies the minimum number of numeric characters.

## Example

```javascript
import Joi from "joi";
import { JoiPasswordComplexity } from "joi-password";

const schema = (input: any) =>
      Joi.object({
            username: Joi.string().min(5).max(10).required(),
            password: JoiPasswordComplexity.string().minOfSpecialCharacters(2).minOfLowercase(2).minOfUppercase(2).minOfNumeric(2).required(),
      }).validate(input);

const { error } = schema({ username: "hello", password: "aaAA@@00" });

console.log(error); // undefined
```

## Custom error message

```javascript
const schema = (input: any) =>
      Joi.object({
            data: JoiPasswordComplexity.string().minOfSpecialCharacters(2).minOfLowercase(2).minOfUppercase(2).minOfNumeric(2).messages({
                  "password.minOfUppercase": "my custom error message",
                  "password.minOfLowercase": "my custom error message",
                  "password.minOfSpecialCharacters": "my custom error message",
                  "password.minOfNumeric": "my custom error message",
            }),
      }).validate(input, { abortEarly: false });

const { error } = schema({ data: "aA@0" });

console.log(error);
// my custom error message
// my custom error message
// my custom error message
// my custom error message
```

## License

MIT

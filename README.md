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
- noWhiteSpaces(): Verifies that a schema has no white spaces, Please do not combine trim() function to make this function works perfectly.

## Example

```javascript
import Joi from "joi";
import { JoiPassword } from "joi-password";

const schema = (input: any) =>
      Joi.object({
            username: Joi.string().min(5).max(10).required(),
            password: JoiPassword.string()
                  .minOfSpecialCharacters(2)
                  .minOfLowercase(2)
                  .minOfUppercase(2)
                  .minOfNumeric(2)
                  .noWhiteSpaces()
                  .required(),
      }).validate(input);

const { error, value } = schema({ username: "hello", password: "aaAA@@00" });

console.log(error); // undefined
```

## Custom error message

```javascript
import Joi from "joi";
import { JoiPassword } from "joi-password";

const schema = (input: any) =>
      Joi.object({
            data: JoiPassword.string()
                  .minOfSpecialCharacters(2)
                  .minOfLowercase(3)
                  .minOfUppercase(4)
                  .minOfNumeric(5)
                  .noWhiteSpaces()
                  .messages({
                        "password.minOfUppercase": "my custom error message min {#min}",
                        "password.minOfLowercase": "my custom error message min {#min}",
                        "password.minOfSpecialCharacters": "my custom error message min {#min}",
                        "password.minOfNumeric": "my custom error message min {#min}",
                        "password.noWhiteSpaces": "my custom error message",
                  }),
      }).validate(input, { abortEarly: false });

const { error } = schema({ data: "aA@0 " });

console.log(error);
// my custom error message min 2
// my custom error message min 3
// my custom error message min 4
// my custom error message min 5
// my custom error message
```

## License

MIT

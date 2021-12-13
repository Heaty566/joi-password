const joi = require('joi');
const joiPassword = require('joi-password');

const schema = (input) =>
    joi
        .object({
            name: joi.string().min(5).max(10).required(),
            password: joiPassword
                .string()
                .minOfSpecialCharacters(2)
                .minOfLowercase(2)
                .minOfUppercase(2)
                .minOfNumeric(2)
                .noWhiteSpaces()
                .notIncludeField(['name'])
                .required(),
        })
        .validate(input);

const { error } = schema({ name: 'hello', password: 'aaAA@@00' });

console.log(error); // undefined

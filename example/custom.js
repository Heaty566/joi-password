const joi = require('joi');
const joiPassword = require('joi-password');

const schema = (input) =>
    joi
        .object({
            name: joi.string(),
            password: joiPassword
                .string()
                .minOfSpecialCharacters(2)
                .minOfLowercase(3)
                .minOfUppercase(4)
                .minOfNumeric(5)
                .noWhiteSpaces()
                .notIncludeField(['name'])
                .messages({
                    'password.minOfUppercase': '{#label} my custom error message min {#min}',
                    'password.minOfLowercase': '{#label} my custom error message min {#min}',
                    'password.minOfSpecialCharacters': '{#label} my custom error message min {#min}',
                    'password.minOfNumeric': '{#label} my custom error message min {#min}',
                    'password.noWhiteSpaces': '{#label} my custom error message',
                    'password.notIncludeField': '{#label} my custom error message {#field}',
                }),
        })
        .validate(input, { abortEarly: false });

const { error } = schema({ name: 'a', password: 'a ' });

console.log(error);
// "password" my custom error message min 2
// "password" my custom error message min 3
// "password" my custom error message min 4
// "password" my custom error message min 5
// "password" my custom error message
// "password" my custom error message name

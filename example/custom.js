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

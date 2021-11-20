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

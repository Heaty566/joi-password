const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = (input) =>
      joi
            .object({
                  username: joi.string().required(),
                  password: joiPassword
                        .string()
                        .minOfSpecialCharacters(3)
                        .minOfLowercase(4)
                        .minOfUppercase(5)
                        .minOfNumeric(6)
                        .noWhiteSpaces()
                        .onlyLatinCharacters()
                        .messages({
                              'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                              'password.minOfSpecialCharacters':
                                    '{#label} should contain at least {#min} special character',
                              'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                              'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                              'password.noWhiteSpaces': '{#label} should not contain white spaces',
                              'password.onlyLatinCharacters': '{#label} should contain only latin characters',
                        }),
            })
            .validate(input, { abortEarly: false });

const { error } = schema({ username: 'aA', password: 'aA@0は ' });

console.log(error);
// 'password' should contain at least 3 special character
// 'password' should contain at least 4 lowercase character
// 'password' should contain at least 5 uppercase character
// 'password'  should contain at least 6 numeric character
// 'password' should not contain white spaces
// 'password' should contain only latin characters

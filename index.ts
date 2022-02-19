import * as joi from 'joi';

export interface JoiStringExtend extends joi.StringSchema {
      /**
       * @description  Specifies the minimum number of uppercase string characters.
       * @param min - the minimum number of uppercase string characters required.
       */
      minOfUppercase(min: number): this;

      /**
       * @description  Specifies the minimum number of lowercase string characters.
       * @param min - the minimum number of lowercase string characters required.
       */
      minOfLowercase(min: number): this;

      /**
       * @description  Specifies the minimum number of special string characters.
       * @param min - the minimum number of special string characters required.
       */
      minOfSpecialCharacters(min: number): this;

      /**
       * @description  Specifies the minimum number of numeric characters.
       * @param min - the minimum number of numeric characters required.
       */
      minOfNumeric(min: number): this;

      /**
       * @description Verifies a field has no white spaces; please do not use trim() function to make this function works perfectly.
       */
      noWhiteSpaces(): this;
}
// /**
//  * @description Verifies a field does not include the value of other fields.
//  * @param fields - a array of name of other fields.
//  * @example 'Password should not include name or username'
//  */
// notIncludeWith(fields: string[]): this;
export interface JoiPasswordExtend extends joi.Root {
      string(): JoiStringExtend;
}

export const joiPassword: JoiPasswordExtend = joi.extend((joi) => {
      return {
            type: 'string',
            base: joi.string(),
            messages: {
                  'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                  'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
                  'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                  'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                  'password.noWhiteSpaces': '{#label} should not contain white spaces',
                  // 'password.notIncludeWith': '{#label} should not include {#field}',
            },
            rules: {
                  minOfUppercase: {
                        method(min: any) {
                              return this.$_addRule({
                                    name: 'minOfUppercase',
                                    args: { min },
                              });
                        },
                        args: [
                              {
                                    name: 'min',
                                    assert: (value) => typeof value === 'number' && !isNaN(value),
                                    message: 'must be a number',
                              },
                        ],
                        validate: (value: string, helpers: joi.CustomHelpers, { min = 0 }: any) => {
                              if (!new RegExp(`(?=(.*[A-Z]){${min}})`).test(value))
                                    return helpers.error('password.minOfUppercase', { min });

                              return value;
                        },
                  },
                  minOfLowercase: {
                        method(min: any) {
                              return this.$_addRule({
                                    name: 'minOfLowercase',
                                    args: { min },
                              });
                        },
                        args: [
                              {
                                    name: 'min',
                                    assert: (value) => typeof value === 'number' && !isNaN(value),
                                    message: 'must be a number',
                              },
                        ],
                        validate: (value: string, helpers: joi.CustomHelpers, { min = 0 }: any) => {
                              if (!new RegExp(`(?=(.*[a-z]){${min}})`).test(value))
                                    return helpers.error('password.minOfLowercase', { min });

                              return value;
                        },
                  },

                  minOfSpecialCharacters: {
                        method(min: any) {
                              return this.$_addRule({
                                    name: 'minOfSpecialCharacters',
                                    args: { min },
                              });
                        },
                        args: [
                              {
                                    name: 'min',
                                    assert: (value) => typeof value === 'number' && !isNaN(value),
                                    message: 'must be a number',
                              },
                        ],
                        validate: (value: string, helpers: joi.CustomHelpers, { min = 0 }: any) => {
                              const numSpecial = value.length - (value.match(/[a-zA-Z0-9]/g) || []).length;
                              if (numSpecial < min)
                                    return helpers.error('password.minOfSpecialCharacters', {
                                          min,
                                    });

                              return value;
                        },
                  },
                  minOfNumeric: {
                        method(min: any) {
                              return this.$_addRule({
                                    name: 'minOfNumeric',
                                    args: { min },
                              });
                        },
                        args: [
                              {
                                    name: 'min',
                                    assert: (value) => typeof value === 'number' && !isNaN(value),
                                    message: 'must be a number',
                              },
                        ],
                        validate: (value: string, helpers: joi.CustomHelpers, { min = 0 }: any) => {
                              if (!new RegExp(`(?=(.*[0-9]){${min}})`, 'g').test(value))
                                    return helpers.error('password.minOfNumeric', { min });

                              return value;
                        },
                  },
                  noWhiteSpaces: {
                        validate: (value: string, helpers: joi.CustomHelpers) => {
                              if (new RegExp(` `, 'g').test(value)) return helpers.error('password.noWhiteSpaces');

                              return value;
                        },
                  },
                  // notIncludeWith: {
                  //       method(fields: string[]) {
                  //             return this.$_addRule({
                  //                   name: 'notIncludeWith',
                  //                   args: { fields },
                  //             });
                  //       },
                  //       args: [
                  //             {
                  //                   name: 'fields',
                  //                   assert: (value) => value && Array.isArray(value),
                  //                   message: 'must be an array of string',
                  //             },
                  //       ],
                  //       validate: (
                  //             value: string,
                  //             helpers: joi.CustomHelpers,
                  //             { fields = [] }: { fields: string[] },
                  //       ) => {
                  //             const objectValue: Record<string, string> = helpers.state?.ancestors[0];

                  //             if (objectValue) {
                  //                   const isIncludes = fields.filter((item) => {
                  //                         return (
                  //                               Object.keys(objectValue).includes(item) &&
                  //                               Boolean(
                  //                                     objectValue[item]
                  //                                           .split(' ')
                  //                                           .filter((item2) => item2.includes(value)).length,
                  //                               )
                  //                         );
                  //                   });

                  //                   if (Boolean(isIncludes.length)) {
                  //                         return helpers.error('password.notIncludeWith', { field: isIncludes[0] });
                  //                   }
                  //             }
                  //             return value;
                  //       },
                  // },
            },
      };
});

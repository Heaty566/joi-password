import { joiPassword, joiPasswordExtendCore } from '../index';
import joi from 'joi';

describe('JoiPasswordComplexity', () => {
      describe('Pass', () => {
            const schema = (input: any) =>
                  joi
                        .object({
                              data: joiPassword
                                    .string()
                                    .minOfSpecialCharacters(2)
                                    .minOfLowercase(2)
                                    .minOfUppercase(2)
                                    .minOfNumeric(2)
                                    .noWhiteSpaces(),
                        })
                        .validate(input);
            it('Pass all check character', () => {
                  const { error } = schema({ data: 'aA@0aA@0' });
                  expect(error).toBeUndefined();
            });
            it('Pass all check character', () => {
                  const { error } = schema({
                        data: 'aaAaaaaaaaaaaaaaaaA@@~```````````````$$$@csacsac00',
                  });

                  expect(error).toBeUndefined();
            });
      });

      describe('minOfUppercase', () => {
            const schema = (value: string) => joiPassword.string().minOfUppercase(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0A');
                  expect(error).toBeUndefined();
            });

            it('Failed uppercase characters', () => {
                  const { error } = schema('aaA@@00');
                  // console.log(error);
                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfUppercase');
            });
      });

      describe('minOfLowercase', () => {
            const schema = (value: string) => joiPassword.string().minOfLowercase(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0a');
                  expect(error).toBeUndefined();
            });

            it('Failed lowercase characters', () => {
                  const { error } = schema('aA@@0A0');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfLowercase');
            });
      });

      describe('minOfSpecialCharacters', () => {
            const schema = (value: string) => joiPassword.string().minOfSpecialCharacters(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0@');
                  expect(error).toBeUndefined();
            });

            it('Failed special characters', () => {
                  const { error } = schema('aaAA@00');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfSpecialCharacters');
            });
      });

      describe('minOfNumeric', () => {
            const schema = (value: string) => joiPassword.string().minOfNumeric(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@01');
                  expect(error).toBeUndefined();
            });

            it('Failed numeric characters', () => {
                  const { error } = schema('aaAA@@');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfNumeric');
            });
      });

      describe('noWhiteSpaces', () => {
            const schema = (value: string) => joiPassword.string().noWhiteSpaces().validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0');
                  expect(error).toBeUndefined();
            });

            it('Failed has white spaces index 0', () => {
                  const { error } = schema(' aaAA@@12');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
            it('Failed has white spaces index middle', () => {
                  const { error } = schema('aaAA   @@12');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
            it('Failed has white spaces index middle', () => {
                  const { error } = schema('  aa  AA   @@1  2  ');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
            it('Failed has white spaces index length', () => {
                  const { error } = schema('aaAA@@12 ');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
      });
});
describe('JoiPasswordComplexity core', () => {
      describe('Pass', () => {
            const schema = (input: any) =>
                  joi
                        .object({
                              data: joi
                                    .extend(joiPasswordExtendCore)
                                    .string()
                                    .minOfSpecialCharacters(2)
                                    .minOfLowercase(2)
                                    .minOfUppercase(2)
                                    .minOfNumeric(2)
                                    .noWhiteSpaces(),
                        })
                        .validate(input);
            it('Pass all check character', () => {
                  const { error } = schema({ data: 'aA@0aA@0' });
                  expect(error).toBeUndefined();
            });
            it('Pass all check character', () => {
                  const { error } = schema({
                        data: 'aaAaaaaaaaaaaaaaaaA@@~```````````````$$$@csacsac00',
                  });

                  expect(error).toBeUndefined();
            });
      });

      describe('minOfUppercase', () => {
            const schema = (value: string) =>
                  joi.extend(joiPasswordExtendCore).string().minOfUppercase(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0A');
                  expect(error).toBeUndefined();
            });

            it('Failed uppercase characters', () => {
                  const { error } = schema('aaA@@00');
                  // console.log(error);
                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfUppercase');
            });
      });

      describe('minOfLowercase', () => {
            const schema = (value: string) =>
                  joi.extend(joiPasswordExtendCore).string().minOfLowercase(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0a');
                  expect(error).toBeUndefined();
            });

            it('Failed lowercase characters', () => {
                  const { error } = schema('aA@@0A0');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfLowercase');
            });
      });

      describe('minOfSpecialCharacters', () => {
            const schema = (value: string) =>
                  joi.extend(joiPasswordExtendCore).string().minOfSpecialCharacters(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0@');
                  expect(error).toBeUndefined();
            });

            it('Failed special characters', () => {
                  const { error } = schema('aaAA@00');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfSpecialCharacters');
            });
      });

      describe('minOfNumeric', () => {
            const schema = (value: string) =>
                  joi.extend(joiPasswordExtendCore).string().minOfNumeric(2).validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@01');
                  expect(error).toBeUndefined();
            });

            it('Failed numeric characters', () => {
                  const { error } = schema('aaAA@@');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.minOfNumeric');
            });
      });

      describe('noWhiteSpaces', () => {
            const schema = (value: string) =>
                  joi.extend(joiPasswordExtendCore).string().noWhiteSpaces().validate(value);

            it('Pass', () => {
                  const { error } = schema('aA@0aA@0');
                  expect(error).toBeUndefined();
            });

            it('Failed has white spaces index 0', () => {
                  const { error } = schema(' aaAA@@12');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
            it('Failed has white spaces index middle', () => {
                  const { error } = schema('aaAA   @@12');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
            it('Failed has white spaces index middle', () => {
                  const { error } = schema('  aa  AA   @@1  2  ');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
            it('Failed has white spaces index length', () => {
                  const { error } = schema('aaAA@@12 ');

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe('password.noWhiteSpaces');
            });
      });
});

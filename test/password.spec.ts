import { joiPassword } from '../index';
import joi from 'joi';

describe('JoiPasswordComplexity', () => {
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
    describe('Pass', () => {
        it('Pass all check character', () => {
            const { error } = schema({ data: 'aaAA@@00' });
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
        it('Failed uppercase characters', () => {
            const { error } = schema({ data: 'aaA@@00' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.minOfUppercase');
        });
    });
    describe('minOfLowercase', () => {
        it('Failed lowercase characters', () => {
            const { error } = schema({ data: 'aAA@@00' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.minOfLowercase');
        });
    });

    describe('minOfSpecialCharacters', () => {
        it('Failed special characters', () => {
            const { error } = schema({ data: 'aaAA@00' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.minOfSpecialCharacters');
        });
    });

    describe('minOfNumeric', () => {
        it('Failed numeric characters', () => {
            const { error } = schema({ data: 'aaAA@@' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.minOfNumeric');
        });
    });

    describe('noWhiteSpaces', () => {
        it('Failed has white spaces index 0', () => {
            const { error } = schema({ data: ' aaAA@@12' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.noWhiteSpaces');
        });
        it('Failed has white spaces index middle', () => {
            const { error } = schema({ data: 'aaAA   @@12' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.noWhiteSpaces');
        });
        it('Failed has white spaces index middle', () => {
            const { error } = schema({ data: '  aa  AA   @@1  2  ' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.noWhiteSpaces');
        });
        it('Failed has white spaces index length', () => {
            const { error } = schema({ data: 'aaAA@@12 ' });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe('password.noWhiteSpaces');
        });
    });

    describe('notIncludeField', () => {
        it('Pass', () => {
            const schema = (input: any) =>
                joi
                    .object({
                        name: joiPassword.string(),
                        password: joiPassword.string().notIncludeField(['name']),
                    })
                    .validate(input);

            const { error } = schema({ password: 'test123', name: 'test' });

            expect(error?.details[0].type).toBe('password.notIncludeField');
        });
        it('Pass two fields', () => {
            const schema = (input: any) =>
                joi
                    .object({
                        name: joiPassword.string(),
                        username: joiPassword.string(),
                        password: joiPassword.string().notIncludeField(['name', 'username']),
                    })
                    .validate(input);

            const { error } = schema({ password: 'test123', name: 'test' });
            expect(error?.details[0].type).toBe('password.notIncludeField');
        });
    });
});

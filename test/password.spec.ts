import { JoiPasswordComplexity } from "../password";
import Joi from "joi";

describe("JoiPasswordComplexity", () => {
      const schema = (input: any) =>
            Joi.object({
                  data: JoiPasswordComplexity.string().minOfSpecialCharacters(2).minOfLowercase(2).minOfUppercase(2).minOfNumeric(2).noWhiteSpaces(),
            }).validate(input);

      it("Pass all check character", () => {
            const { error } = schema({ data: "aaAA@@00" });
            expect(error).toBeUndefined();
      });
      it("Pass all check character", () => {
            const { error } = schema({
                  data: "aaAaaaaaaaaaaaaaaaA@@~```````````````$$$@csacsac00",
            });

            expect(error).toBeUndefined();
      });

      it("Failed uppercase characters", () => {
            const { error } = schema({ data: "aaA@@00" });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe("password.minOfUppercase");
      });
      it("Failed lowercase characters", () => {
            const { error } = schema({ data: "aAA@@00" });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe("password.minOfLowercase");
      });
      it("Failed special characters", () => {
            const { error } = schema({ data: "aaAA@00" });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe("password.minOfSpecialCharacters");
      });
      it("Failed numeric characters", () => {
            const { error } = schema({ data: "aaAA@@" });

            expect(error).toBeDefined();
            expect(error?.details[0].type).toBe("password.minOfNumeric");
      });

      describe("noWhiteSpaces", () => {
            it("Failed has white spaces index 0", () => {
                  const { error } = schema({ data: " aaAA@@12" });

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe("password.noWhiteSpaces");
            });
            it("Failed has white spaces index middle", () => {
                  const { error } = schema({ data: "aaAA   @@12" });

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe("password.noWhiteSpaces");
            });
            it("Failed has white spaces index middle", () => {
                  const { error } = schema({ data: "  aa  AA   @@1  2  " });

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe("password.noWhiteSpaces");
            });
            it("Failed has white spaces index length", () => {
                  const { error } = schema({ data: "aaAA@@12 " });

                  expect(error).toBeDefined();
                  expect(error?.details[0].type).toBe("password.noWhiteSpaces");
            });
      });
});

import { validateCPF, validateName, validateEmail } from "../validations";

describe("validateCPF", () => {
  it("should return true for an empty CPF", () => {
    expect(validateCPF("")).toBe(true);
  });

  it("should return false for a CPF with less than 11 characters", () => {
    expect(validateCPF("1234567890")).toBe(false);
  });

  it("should return true for a CPF with 11 or more characters", () => {
    expect(validateCPF("12345678901")).toBe(true);
  });
});

describe("validateName", () => {
  it("should return true for an empty name", () => {
    expect(validateName("")).toBe(true);
  });

  it("should return false for a name that does not match the regex", () => {
    expect(validateName("John")).toBe(false);
    expect(validateName("123John")).toBe(false);
    expect(validateName("123John Doe123")).toBe(false);
  });

  it("should return true for a valid name", () => {
    expect(validateName("John Doe")).toBe(true);
  });
});

describe("validateEmail", () => {
  it("should return true for an empty email", () => {
    expect(validateEmail("")).toBe(true);
  });

  it("should return false for an email that does not match the regex", () => {
    expect(validateEmail("john.doe")).toBe(false);
    expect(validateEmail("john.doe@")).toBe(false);
    expect(validateEmail("john.doe@domain")).toBe(false);
  });

  it("should return true for a valid email", () => {
    expect(validateEmail("john.doe@example.com")).toBe(true);
  });
});

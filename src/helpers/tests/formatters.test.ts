import {
  applyCPFMask,
  getCPFNumbers,
  formatDateToDayMonthYear,
} from "../formatters";

describe("Formatters", () => {
  describe("applyCPFMask", () => {
    it("should apply CPF mask correctly", () => {
      expect(applyCPFMask("12345678901")).toBe("123.456.789-01");
      expect(applyCPFMask("123.456.789-01")).toBe("123.456.789-01");
      expect(applyCPFMask("123456789")).toBe("123.456.789");
    });

    it("should handle empty string", () => {
      expect(applyCPFMask("")).toBe("");
    });

    it("should handle non-numeric characters", () => {
      expect(applyCPFMask("abc12345678901xyz")).toBe("123.456.789-01");
    });
  });

  describe("getCPFNumbers", () => {
    it("should remove non-numeric characters", () => {
      expect(getCPFNumbers("123.456.789-01")).toBe("12345678901");
      expect(getCPFNumbers("abc123.456.789-01xyz")).toBe("12345678901");
    });

    it("should handle empty string", () => {
      expect(getCPFNumbers("")).toBe("");
    });
  });

  describe("formatDateToDayMonthYear", () => {
    it("should format date correctly", () => {
      expect(formatDateToDayMonthYear("2023-10-05")).toBe("05/10/2023");
      expect(formatDateToDayMonthYear("1990-01-01")).toBe("01/01/1990");
    });
  });
});

export class MathUtils {
  /**
   * Calculates the sum of an array of numbers.
   * @param {number[]} arr - Array of numbers.
   * @returns {number} The sum of all numbers in the array.
   */
  static sum(arr: number[]): number {
    return arr.reduce((acc, num) => acc + num, 0);
  }

  /**
   * Calculates the average of an array of numbers.
   * @param {number[]} arr - Array of numbers.
   * @returns {number} The average of the numbers.
   */
  static average(arr: number[]): number {
    if (arr.length === 0) return 0;
    return this.sum(arr) / arr.length;
  }

  /**
   * Finds the maximum number in an array.
   * @param {number[]} arr - Array of numbers.
   * @returns {number} The maximum number.
   */
  static max(arr: number[]): number {
    return Math.max(...arr);
  }

  /**
   * Finds the minimum number in an array.
   * @param {number[]} arr - Array of numbers.
   * @returns {number} The minimum number.
   */
  static min(arr: number[]): number {
    return Math.min(...arr);
  }

  /**
   * Rounds a number to a specified number of decimal places.
   * @param {number} num - The number to round.
   * @param {number} decimalPlaces - Number of decimal places to round to.
   * @returns {number} The rounded number.
   */
  static round(num: number, decimalPlaces = 2): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  /**
   * Generates a random integer between two values, inclusive.
   * @param {number} min - Minimum value.
   * @param {number} max - Maximum value.
   * @returns {number} A random integer between min and max.
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export class DateUtils {
  // Convert a date from one format to another
  static convertDateFormat(
    date: string,
    fromFormat: string,
    toFormat: string
  ): string {
    const dateTime = this.parseDate(date, fromFormat);
    if (!dateTime) throw new Error("Invalid date or format.");
    return this.formatDate(dateTime, toFormat);
  }

  // Convert a date string to a timestamp
  static convertToTimestamp(date: string, format: string): number {
    const dateTime = this.parseDate(date, format);
    if (!dateTime) throw new Error("Invalid date or format.");
    return dateTime.getTime();
  }

  // Convert a timestamp to a human-readable date format
  static convertFromTimestamp(timestamp: number, format: string): string {
    const dateTime = new Date(timestamp);
    return this.formatDate(dateTime, format);
  }

  // Get the current date in a specific format
  static getCurrentDate(format: string): string {
    const currentDate = new Date();
    return this.formatDate(currentDate, format);
  }

  // Convert a date to UTC format
  static convertToUTC(date: string, format: string): string {
    const dateTime = this.parseDate(date, format);
    if (!dateTime) throw new Error("Invalid date or format.");
    return this.formatDate(dateTime, format, true);
  }

  // Convert a UTC date to local timezone
  static convertFromUTC(
    date: string,
    format: string,
    timezone: string = "Europe/Paris"
  ): string {
    const dateTime = this.parseDate(date, format);
    if (!dateTime) throw new Error("Invalid date or format.");

    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return dateTime.toLocaleString("en-GB", options);
  }

  // Helper to parse date from string
  private static parseDate(date: string, format: string): Date | null {
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) return null;
    return new Date(parsedDate);
  }

  // Helper to format date to a specific format
  private static formatDate(
    date: Date,
    format: string,
    toUTC: boolean = false
  ): string {
    const options: Intl.DateTimeFormatOptions =
      this.getDateFormatOptions(format);

    if (toUTC) {
      return date.toLocaleString("en-GB", { ...options, timeZone: "UTC" });
    }

    return date.toLocaleString("en-GB", options);
  }

  // Map the date format string to DateTimeFormatOptions
  private static getDateFormatOptions(
    format: string
  ): Intl.DateTimeFormatOptions {
    const options: Intl.DateTimeFormatOptions = {};
    const formatParts = format.split(/[^a-zA-Z]+/);

    formatParts.forEach((part) => {
      switch (part) {
        case "YYYY":
          options.year = "numeric";
          break;
        case "MM":
          options.month = "2-digit";
          break;
        case "DD":
          options.day = "2-digit";
          break;
        case "HH":
          options.hour = "2-digit";
          break;
        case "mm":
          options.minute = "2-digit";
          break;
        case "ss":
          options.second = "2-digit";
          break;
        default:
          break;
      }
    });

    return options;
  }
}

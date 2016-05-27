export module Random {
  function id(numberOfChars?: number): string;
  function secret(numberOfChars?: number): string;
  function fraction(): number;
  function hexString(numberOfDigits: number): string; // @param numberOfDigits, @returns a random hex string of the given length
  function choice(array: any[]): string; // @param array, @return a random element in array
  function choice(str: string): string; // @param str, @return a random char in str
}

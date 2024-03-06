/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const strippedStr = str.replace(/[^\w\s]/g, "").replace(/\s+/g, "");
  const forwardString = strippedStr.toLowerCase();
  const reversedString = forwardString.split("").reverse().join("");
  return forwardString === reversedString;
}

module.exports = isPalindrome;

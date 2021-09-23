/**
 * Base 64 encodes UTF-16 encoded strings
 *
 * @param {*} string
 * @return {*}
 */
function btoaUTF16(string) {
  const charCodeArray = new Uint16Array(string.length);

  // you could use a for loop without the split to move in the string for better performance
  string.split("").forEach((_, index) => {
    charCodeArray[index] = string.charCodeAt(index);
  });

  return btoa(String.fromCharCode(...new Uint16Array(charCodeArray.buffer)));
}

/**
 * Decodes base64 encoded UTF-16 strings
 *
 * @param {*} encoded
 * @return {*}
 */
function atobUTF16(encoded) {
  binary = atob(encoded);
  const bytes = new Uint16Array(binary.length);

  // you could use a for loop without the split to move in the string for better performance
  binary.split("").forEach((_, index) => {
    bytes[index] = binary.charCodeAt(index);
  });

  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

// Our base64 string with weird chars
const encoded = btoaUTF16("HUË - Sársziget");
const decoded = atobUTF16(encoded);

console.log("encoded:", encoded);
console.log("decoded:", decoded);

var phone_number_regex = /(\({1}[0-9]{3}\)\s[0-9]{3}-[0-9]{4})|([0-9]{3}\s[0-9]{3}\s[0-9]{4})|([0-9]{10})|([0-9]{3}\s{1}[0-9]{7})|""/
var postal_code_regex = /[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}/
// console.log(/^[0-9]*$/.test('144eede'))
// console.log(/^[0-9]*$/.test('e111'))
// console.log(/^[0-9]*$/.test(''))

// console.log(/([0-9]{10,15})|(^$)/.test(''))
// console.log(/([0-9]{10,15})|(^$)/.test('1234'))
// console.log(/([0-9]{10,15})|(^$)/.test('1234567890'))

// console.log(postal_code_regex.test('V3R2X2'))
// console.log(postal_code_regex.test('v3r2x2'))
// console.log(postal_code_regex.test('v3r3sq'))

console.log(phone_number_regex.test('(604) 123-1234'));
console.log(phone_number_regex.test('604 123 1234'));
console.log(phone_number_regex.test('6041231234'));
console.log(phone_number_regex.test('604 1231234'));

var number = '6041231234'
var number1 = '604 123 1234'
var number2 = '(604) 123-1234'
var number3 = '604 1231234'




// { } Is the character count
// [ ] Is the range of characters to test
//  * Is Zero or more characters use this
//  ^ Is The beginning of the character
//  $ Is the end of the character
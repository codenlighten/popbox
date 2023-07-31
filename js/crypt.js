const decrypt = (password, ciphertext) => {
	// Decrypt
	let bytes = CryptoJS.AES.decrypt(ciphertext, password);
	let originalText = bytes.toString(CryptoJS.enc.Utf8);
	// console.log("orig", originalText);
	purse = originalText;
	// console.log(originalText);
	return originalText;
};
const encrypt = (password, message) => {
	var ciphertext = CryptoJS.AES.encrypt(message, password).toString();
	return ciphertext;
};

const doubleEncrypt = async (password, message) => {
	// console.log(message);
	let encrypted = await encrypt(password, message);
	let encrypted2 = await encrypt(password, encrypted);
	// console.log(encrypted2);
	await decryptPrivKey(password, encrypted2);
	return encrypted2;
};
const sha256 = async (string) => {
	const utf8 = new TextEncoder().encode(string);
	const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((bytes) => bytes.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};

const toHex = (txt) => {
	const encoder = new TextEncoder();
	return Array.from(encoder.encode(txt))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
};

const hexConvert = (str1) => {
	// console.log("hex being converted", str1);
	var hex = str1.toString();
	var str = "";
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	// console.log("hex being converted", str1, str);

	return str;
};

const decryptPrivKey = async (password, privateKey) => {
	let privKey = await decrypt(password, privateKey);
	let secondDecrypt = await decrypt(password, privKey);
	return secondDecrypt;
};

const arrayToBase64 = (buffer) => {
	var binary = "";
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	let myBase = window.btoa(binary);
	console.log(myBase);
	return myBase;
};

const getUUID = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
};

function ascii_to_hexa(str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join("");
}

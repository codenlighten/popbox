const Mnemonic = bsv.Mnemonic;

const generateKeys = async (password) => {
	const mnemonic = Mnemonic.fromRandom();
	const hdPrivateKey = mnemonic.toHDPrivateKey();
	const privateKey = hdPrivateKey.privateKey;
	const publicKey = privateKey.toPublicKey();
	const address = publicKey.toAddress();
	const wif = privateKey.toWIF();
	const keys = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
		wif: wif,
	};
	localStorage.address = address.toString();
	// localStorage.keys = JSON.stringify(keys);
	const encryptedInfo = await encrypt(password, JSON.stringify(keys));
	localStorage.encryptedInfo = encryptedInfo;
	return keys;
};

const retrieveWif = (password) => {
	const encryptedInfo = localStorage.encryptedInfo;
	const info = JSON.parse(decrypt(password, encryptedInfo));
	const wif = info.wif;
	return wif;
};

const revealMnemonic = () => {
	const mnemonic = document.getElementById("mnemonic");
	if (mnemonic.innerHTML === "***Reveal Mnemonic***") {
		console.log("reveal");
		const userObject = localStorage.userObject;
		const encryptedInfo = JSON.parse(userObject).encryptedInfo;
		console.log(encryptedInfo);
		const password = document.getElementById("password").value;
		if (!password) return alert("Enter a password");

		const info = JSON.parse(decrypt(password, encryptedInfo));
		const mnemonics = info.mnemonics;
		console.log(mnemonics);
		// document.getElementById("mnemonic").innerHTML = mnemonics;
	} else {
		// document.getElementById("mnemonic").innerHTML = "***Reveal Mnemonic***";
	}
};

const createWallet = () => {
	const mnemonic = Mnemonic.fromRandom();
	const password = document.getElementById("password").value;

	if (!password) return alert("Enter a password");
	const hdPrivateKey = mnemonic.toHDPrivateKey();
	const privateKey = hdPrivateKey.privateKey;
	const publicKey = privateKey.toPublicKey();
	const address = publicKey.toAddress();

	const keys = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
	};
	const encryptedKeys = encrypt(password, JSON.stringify(keys));
	return encryptedKeys;
};

// Store mnemonic in localStorage

// if (!localStorage.encryptedInfo) {
// 	document.getElementById("generate").style.display = "block";
// }

const retrieveKeys = () => {
	const password = document.getElementById("password").value;
	if (!password) return alert("Enter a password");
	const encryptedInfo = localStorage.encryptedInfo;
	const info = JSON.parse(decrypt(password, encryptedInfo));
	const mnemonic = info.mnemonic;
	const privateKey = info.privateKey;
	const publicKey = info.publicKey;
	const address = info.address;
	const wif = info.wif;
	const keys = {
		address: address,
		mnemonic: mnemonic,
		privateKey: privateKey,
		publicKey: publicKey,
		wif: wif,
	};
	return keys;
};

// retrieveKeys();

// if (!localStorage.address) {
// 	const password = prompt("Enter a password");
// 	const keys = generateKeys(password);
// 	console.log(keys);
// }

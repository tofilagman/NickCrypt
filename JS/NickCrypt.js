/*!
 * Nick Crypto Service Provider
 * (c) LJ Gomez, Nick Yap 
 *	2018
 */
(function () {
    var DEBUG = true;
    (function (undefined) {
        var window = this || (0, eval)('this'),
		document = window['document'],
		navigator = window['navigator'],
		jQueryInstance = window["jQuery"],
		JSON = window["JSON"];

        (function (factory) {
            // Support three module loading scenarios
            if (typeof define === 'function' && define['amd']) {
                // [1] AMD anonymous module
                define(['exports', 'require'], factory);
            } else if (typeof exports === 'object' && typeof module === 'object') {
                // [2] CommonJS/Node.js
                factory(module['exports'] || exports); // module.exports is for Node.js
            } else {
                // [3] No module loader (plain <script> tag) - put directly in global namespace
                factory(window['NickCrypt'] = {});
            }
        }
			(function (nExports, amdRequire) {
			    var NickCrypt = typeof nExports !== 'undefined' ? nExports : {};
			    NickCrypt.exportSymbol = function (nPath, object) {
			        var tokens = nPath.split(".");
			        var target = NickCrypt;
			        for (var i = 0; i < tokens.length - 1; i++)
			            target = target[tokens[i]];
			        target[tokens[tokens.length - 1]] = object;
			    };

			    NickCrypt.exportProperty = function (owner, publicName, object) {
			        owner[publicName] = object;
			    };
			    NickCrypt.version = "0.0.1";

			    NickCrypt.exportSymbol('version', NickCrypt.version);
				 
				 NickCrypt.Encrypt = (function (data, password, salt) {
					 
					var compData = LZString.compressToEncodedURIComponent(data);
					var key = CryptoJS.enc.Utf8.parse(password);
					var iv = CryptoJS.enc.Utf8.parse(salt);
					var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(compData), key,
						{
							keySize: 128 / 8,
							iv: iv,
							mode: CryptoJS.mode.CBC,
							padding: CryptoJS.pad.Pkcs7
						});
					 
			        return  encrypted.toString();
			    });
				
				NickCrypt.Decrypt = (function (data, password, salt) {
					 
					var key = CryptoJS.enc.Utf8.parse(password);
					var iv = CryptoJS.enc.Utf8.parse(salt);
					
			          var decrypted = CryptoJS.AES.decrypt(data, key, {
						keySize: 128 / 8,
						iv: iv,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					});
					
					 var dec =  decrypted.toString(CryptoJS.enc.Utf8);
					 
					 return LZString.decompressFromEncodedURIComponent(dec);
			    }); 
			}))
	}())
})()
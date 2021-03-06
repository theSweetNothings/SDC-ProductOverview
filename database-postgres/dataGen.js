const fs = require('fs');
const faker = require('faker');

const writeProducts = fs.createWriteStream('productsList.csv');
const writeProductFeatures = fs.createWriteStream('productfeatures.csv');
const writeStyles = fs.createWriteStream('styles.csv');
const writeProductPhotos = fs.createWriteStream('photos.csv');
const writeProductSkus = fs.createWriteStream('skus.csv');

//ProductList
function writeTenMillionProducts(writer, encoding, callback) {
	let i = 100;
	let id = 0;
	console.log('#:', id);
	function write() {
		let ok = true;
		do {
			i -= 1;
			id += 1;
			let name = faker.commerce.productName();
			let slogan = faker.lorem.sentence();
			let description = faker.lorem.sentences(2);
			let category = faker.commerce.product();
			let default_price = faker.commerce.price(2, 1000, 2, '$');

			const data = `${id}|${name}|${slogan}|${description}|${category}|${default_price}\n`;

			if (i === 0) {
				writer.write(data, encoding, callback);
			} else {
				ok = writer.write(data, encoding);
			}
		} while (i > 0 && ok);
		if (i > 0) {
			writer.once('drain', write);
		}
	}
	write();
}

writeTenMillionProducts(writeProducts, 'utf-8', () => {
  writeProducts.end();
});

//Features
function writeTenMillionProductFeatures(writer, encoding, callback) {
	let i = 100;
	let id = 0;
	console.log('#:', id);
	function write() {
		let ok = true;
		do {
			i -= 1;
			id += 1;
			let product_id = id;
			let features = '';
			let numberOfFeatures = Math.ceil(Math.random() * 2);
			for (let j = 1; j <= numberOfFeatures; j++) {
				let feature = faker.commerce.productMaterial();
				let value = faker.commerce.productAdjective();
				features += `${product_id}|${feature}|${value}\n`;
			}

			if (i === 0) {
				writer.write(features, encoding, callback);
			} else {
				ok = writer.write(features, encoding);
			}
		} while (i > 0 && ok);
		if (i > 0) {
			writer.once('drain', write);
		}
	}
	write();
}

writeTenMillionProductFeatures(writeProductFeatures, 'utf-8', () => {
  writeProductFeatures.end();
});

//Styles
function writeTenMillionStyles(writer, encoding, callback) {
	let i = 100;
	let id = 0;
	console.log('#:', id);
	function write() {
		let ok = true;
		do {
			i -= 1;
			id += 1;
			let product_id = id;
			let styles = '';
			let boolDefault = 1;
			let numberOfStyles = 2;
			for (var j = 0; j < numberOfStyles; j++) {
				let style_id = j + 1;
				let name = faker.commerce.productName();
				let original_price = faker.commerce.price(500, 1000, 2, '$');
				let sale_price = faker.commerce.price(2, 499, 2, '$');
				let isDefault = boolDefault;
				boolDefault = 0;
				styles += `${product_id}|${style_id}|${name}|${original_price}|${sale_price}|${isDefault}\n`;
			}

			if (i === 0) {
				writer.write(styles, encoding, callback);
			} else {
				ok = writer.write(styles, encoding);
			}
		} while (i > 0 && ok);
		if (i > 0) {
			writer.once('drain', write);
		}
	}
	write();
}

writeTenMillionStyles(writeStyles, 'utf-8', () => {
    writeStyles.end();
});

//Photos
function writeTenMillionProductPhotos(writer, encoding, callback) {
	let i = 100;
	let id = 0;
	console.log('#:', id);
	function write() {
		let ok = true;
		do {
			i -= 1;
			id += 1;
			let product_id = id;
			let photos = '';
			let style_id = 0;
			let numberOfPhotos = 2;
			for (var j = 0; j < numberOfPhotos; j++) {
				let thumbnail_url = faker.image.imageUrl();
				let url = thumbnail_url;
				style_id = style_id + 1;
				photos += `${product_id}|${style_id}|${url}|${thumbnail_url}\n`;
			}

			if (i === 0) {
				writer.write(photos, encoding, callback);
			} else {
				ok = writer.write(photos, encoding);
			}
		} while (i > 0 && ok);
		if (i > 0) {
			writer.once('drain', write);
		}
	}
	write();
}

writeTenMillionProductPhotos(writeProductPhotos, 'utf-8', () => {
  writeProductPhotos.end();
});

//Skus
function writeTenMillionProductSkus(writer, encoding, callback) {
	let i = 100;
	let id = 0;
	console.log('#:', id);
	function write() {
		let ok = true;
		do {
			i -= 1;
			id += 1;
			let product_id = id;
			let skus = '';
			let typeOfClothing = Math.ceil(Math.random() * 2);
			let style_id = 1;
			let styles = 2;

			let shirtSize = ['S', 'M', 'L'];
			let shoeSize = ['8', '9', '10'];
			let inStock;
			for (var l = 0; l < styles; l++) {
				style_id = style_id + l;
				if (typeOfClothing === 1) {
					for (var k = 0; k < shirtSize.length; k++) {
						inStock = Math.ceil(Math.random() * 25);
						sku = { S: inStock, M: inStock, L: inStock };
						skus += `${product_id}|${style_id}|${shirtSize[k]}|${inStock} \n`;
					}
				} else {
					for (var j = 0; j < shoeSize.length; j++) {
						inStock = Math.ceil(Math.random() * 25);
						sku = { 8: inStock, 9: inStock, 10: inStock };
						skus += `${product_id}|${style_id}|${shoeSize[j]}|${inStock} \n`;
					}
				}
			}
			if (i === 0) {
				writer.write(skus, encoding, callback);
			} else {
				ok = writer.write(skus, encoding);
			}
		} while (i > 0 && ok);
		if (i > 0) {
			writer.once('drain', write);
		}
	}
	write();
}

writeTenMillionProductSkus(writeProductSkus, 'utf-8', () => {
	writeProductSkus.end();
});

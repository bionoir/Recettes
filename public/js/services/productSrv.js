/**
 * @author fda
 */

livreRecettes.service("productService", function() {
	
	var products = [];
	
	this.getProducts = function () {
		return firebase.database().ref('/products').once('value').then(function(data) {
				var values = data.val();
				products = [];
				for (v in values) {
					products.push({
						productName : values[v].productName, 
						productType : values[v].productType,
						productRef	: v
					});	
				}
				return products;
			},
			function(error) {
				console.error(error);
			});
	};
	
	/* Adding new product in Firebase DB */
	this.putNewProduct = function (productName,productType) {
		if (productName.length >= 5) {
			firebase.database().ref('/products').push({
				'productName' : productName,
				'productType' : productType
			}).catch(function(error){
				alert('Une erreur est survenue lors de l\'enregistrement dans la base de données : ' + error.message)
			});
		}
	};
	
	this.removeProduct = function (productReference) {
		try{
			firebase.database().ref('/products/' + productReference).remove();
		}catch(error){
			alert('Erreur lors de la suppression : ' + error.message);
		};
	};
	
	this.editProduct = function (productNewData) {
		try{
			var newData = {
				productName : productNewData.productName,
				productType : productNewData.productType				
			};
			
			var updates = {};
			updates['/products/' + productNewData.productReference] = newData;
			
			firebase.database().ref().update(updates);
		}catch(error){
			alert('Erreur en phase de modification du produit : ' + error.message);
		};
	};
});
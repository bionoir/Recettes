/**
 * @author fda
 */

livreRecettes.controller("ProductsController", function($scope, $uibModal, $log, productService) {
	
	$scope.items = ['item1', 'item2', 'item3'];
	
	$scope.products = [];
	
	initProducts();
	
	function initProducts() {
		productService.getProducts().then(function(products) {
			$scope.$apply(function() {
				$scope.products = products;
			});
		});
	}
	
	$scope.addProduct = function () {
		
		var productName = $scope.newProduct.productName;
        var productType = $scope.newProduct.productType;
        productService.putNewProduct(productName, productType);
        //customersService.insertCustomer(firstName, lastName, city);
        $scope.newProduct.productName = '';
        $scope.newProduct.productType = '';
        
        initProducts();
	}
	
	$scope.removeProduct = function (productReference) {
		productService.removeProduct(productReference);
		initProducts();
	}
	
	$scope.editProduct = function (product) {
		
		var modalInstance = $uibModal.open({
			animation: true,
	      	templateUrl: 'modalProductEditionContent.html',
	      	controller: 'ModalInstanceCtrlForProductEdition',
	      	/*size: null,*/
	      	resolve: {
	        	product: function () {
	          		return product;
	        	}
	      	}
	    });
	
	    modalInstance.result.then(function (productNewData) {
	      productService.editProduct(productNewData);
	      initProducts();
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	}
		
});


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

livreRecettes.controller('ModalInstanceCtrlForProductEdition', function ($scope, $uibModalInstance, product) {

  $scope.productToEdit = product;
  
  $scope.ok = function () {
  	var newProductData = {
  		productReference : product.productRef,
  		productName : $scope.productToEdit.productName,
  		productType : $scope.productToEdit.productType
  	}
    $uibModalInstance.close(newProductData);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
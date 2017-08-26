/*
	User Interface Code Start
*/
$(document).ready(function(){
	// setting all pages height
	$(".row").css("height", ($(window).height()-($(".jumbotron").outerHeight(true) + $(".breadcrumb").outerHeight(true))));
	var orderCount = 0;
	var order;
	var totalBill;
	var stopProcess = false;
	var delAddress = {
		usrName:null,usrEmail:null,usrContactNo:null,addrLine:null,city:null,state:null,pincode:null,country:null
	}
	var PizzaOrder = new Order(null, null);

	//On next button
	$('button.goToNextStep').click(function(){
		if(this.name === "address"){
			var inputData = document.body.querySelectorAll('input');
			inputData.forEach(function(data){
				delAddress[`${data.id}`] = data.value.trim();
			})
			PizzaOrder.address.push(delAddress);
			PizzaOrder.address.forEach(function(add){
				if(add.usrName != null && add.usrName!= "" && add.usrEmail != null && add.usrEmail!= "" && add.usrContactNo != null && add.usrContactNo!= ""&& add.addrLine != null && add.addrLine!= "" && add.city != null && add.city!= "" && add.state !=  null && add.state!= "" &&  add.pincode != null && add.pincode != "" &&  add.country != null && add.country != "" ){
					
					if(!($('#order').hasClass('orderAdded'))){
						$('#order').addClass('orderAdded')
						if(PizzaOrder.toppings != null && PizzaOrder.toppings){
							$('.toppingOrder').prepend(`<span>Toppings</span>`);
							PizzaOrder.toppings.forEach(function(topping){
								$('.toppingOrder ul').append(`<li>${topping}</li>`);
							})
						}
						$('#order .bread').append(`<img src="img/${PizzaOrder.bread}.jpg" class="img-thumbnail">`);
						$('#order .size').append(`<img src="img/${PizzaOrder.size}.jpg" class="img-thumbnail">`);
						//Adress Confirmation
						$('#order .addressConfirm ul').append(`<li><b>Name: </b>${delAddress.usrName}</li><li><b>Email: </b> ${delAddress.usrEmail}</li><li><b>Contact No: </b>${delAddress.usrContactNo}</li>`);
						$('#order .addressConfirm ul').append(`<li><b>Address: </li></b><p>${delAddress.addrLine}, ${delAddress.city}, ${delAddress.state}, ${delAddress.pincode}, ${delAddress.country}</p>`);
					}
					stopProcess = false;
				}else {
					
					alert("Please fill the form");
					stopProcess = true;
				}
			})
		}
		if( this.name === "pizzaType" && PizzaOrder.size === null){
			alert('Please select pizza size');
		} else if (this.name === "breadType" && PizzaOrder.bread === null){
			alert('Please select Bread');
		}else if(stopProcess == false){
			$(this).parents('.row').next().removeClass('hide');
			$(`.${this.name}Link`).removeClass('active');
			$(`.${this.name}Link`).next().removeClass('hide');
			$(`.${this.name}Link`).next().addClass('active');
		}
		

	})

	//On Pizza size selection
	$('#pizza-type img').click(function(){
		PizzaOrder.size = this.alt;
		$('#pizza-type .img-wrapper').removeClass("selected");
		$(this).parents('.img-wrapper').addClass("selected");
	})

	//On bread selection
	$('#bread-type img').click(function(){
		PizzaOrder.bread = this.alt;
		$('#bread-type .img-wrapper').removeClass("selected");
		$(this).parents('.img-wrapper').addClass("selected");
	})

	//topping checkbox click
	$('.topping').click(function(){
		var topping;
		$(this).find('i').toggleClass('checked');
		topping = $(this).find('p').text()
		if($(this).find('i').hasClass('checked')){
			PizzaOrder.toppings.push(topping);
		}else {
			console.log(PizzaOrder.toppings.indexOf(topping));
			PizzaOrder.toppings[PizzaOrder.toppings.indexOf(topping)] = null;
		}

	})

	//order amount
	$('.orderConfirm i').click(function(){
		$(this).addClass('checked');
		totalBill = PizzaOrder.price();
		$('.amount b').text(totalBill);
		$('.amount').removeClass('hide');
	})

	$('#order button').click(function(){
		$('.row').addClass('hide');
		$('#orderPlaced').removeClass('hide')
		$("#orderPlaced span").append(totalBill);
	})
	$('.refresh').click(function(){
		location.reload();
	})

})
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
				if((add.usrName != null || add.usrName!= "") && (add.usrEmail != null || add.usrEmail!= "") && (add.usrContactNo != null || add.usrContactNo!= "") && (add.addrLine != null || add.addrLine!= "")&& (add.city != null || add.city!= "")&& (add.state !=  null || add.state!= "")&& (add.pincode != null || add.pincode != "") &&  (add.country != null || add.country != "") ){
					if(PizzaOrder.toppings){
						$('.toppingOrder').append(`<p>With Below Toppings</p>`);
						PizzaOrder.toppings.forEach(function(topping){
							$('.toppingOrder').append(`<p>${topping}</p>`);
						})
					}
					$('#order .bread').append(`<img src="img/${PizzaOrder.bread}.jpg">`);
					$('#order .size').append(`<img src="img/${PizzaOrder.size}.jpg">`);
					
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
			$(`.${this.name}Link`).parents('li').next().removeClass('hide');
			$(`.${this.name}Link`).parents('li').next().children().addClass('active');
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
		}else if(PizzaOrder.toppings.indexOf('topping')> -1){
			PizzaOrder.toppings[order.toppings.indexOf('topping')] = null;
		}

	})

	$('.bill').click(function(){
		totalBill = PizzaOrder.price();
	})


})
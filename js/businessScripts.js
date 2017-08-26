//business logic
/*
	Order Constructor
*/
var Order = function(name,bread) {
	this.size = name;
	this.bread =bread;
	this.toppings =[];
	this.address= [];
}

/*
	Order Constructor
*/
var Price = {
	personalPizza: 1,
	regularPizza: 2,
	largePizza: 3,
	xtraLargePizza:4,
	Cheese:0.1,
	Pepperoni:0.3,
	Artichoke:0.1,
	Anchovy:0.2,
	Tomato:0.2,
	Mushroom:0.1,
	Meatball:0.5,
	Broccoli:0.1
}

/*
	Price Calculation prototype
*/
Order.prototype.price = function(){
	var bill = 0;
	var obj = this;
	$.each(Price ,function(key, value){
		if(obj.size === key){
			bill += value;
		}
		obj.toppings.forEach(function(topping){
			if(topping === key){
				bill += value;
			}
		})
	}, 0)
	return bill;
}

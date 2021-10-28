class Payment {
  constructor(customer){
    this.customer = customer;
    this.more = 'Yes'
    this.stkPrdArr = ['Apple', 'Orange', 'Strawberry']
    this.resObj = {}
  }

  process(products, quantities, email){
    var newOrder = { totalPrice: 0, line_items: [] };

    var i = 0;
    while(this.more == 'Yes'){
      i = newOrder.line_items.length;
        if(i == products.length - 1) this.more = 'No'; // we processed the last product

      var product = products[i];
      if (!this.stkPrdArr.includes(products[i].name)) {
        return "no stock for this product"
      };

      let lt = {
        "product": products[i],
        "quantity": quantities[i],
        "order": newOrder
      };
      console.log(lt);

      newOrder.line_items.push(lt);
      newOrder.totalPrice += products[i].price * quantities[i]
    };

    this.getDesc = function() {
      this.description = "Payment created by " + this.customer.full_name + " for $" + newOrder.totalPrice;
    }

    StripeCharger.create_charge(
      this.customer,
      newOrder.totalPrice,
      "usd",
      this.getDesc()
    );

    if(email != "No"){
      SendThanksEmailToCustomer.send_email(this.customer, newOrder);
    }

    this.savePayment()

    this.resObj = newOrder
  }

  savePayment(){
    console.log("Store in the database!");
  }

}

class StripeCharger {
  static create_charge(customer, amount, currency, description) {
    console.log("Some magic happens here where we push this charge to Stripe");
    return;
  }
}

class SendThanksEmailToCustomer {
  static send_email(customer, order) {
    console.log("Some magic happens here where we send an email");
    return;
  }
}

var products = [
  {name: "Apple", price: 10},
  {name: "Orange", price: 15}
];
var quantities = [3, 2]

var customer = { full_name: "Jane Doe"};
var payment = new Payment(customer);
payment.process(products, quantities);
console.log(`The order amount is $${payment.resObj.totalPrice}`); // It should be 60

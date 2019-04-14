// In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this unit. 
// The app will take in orders from customers and deplete stock from the store's inventory. 
// As a bonus task, you can program your app to track product sales across your store's departments and 
// then provide a summary of the highest-grossing departments in the store.

// Make sure you save and require the MySQL and Inquirer npm packages in your homework files--
// your app will need them for data input and storage.

// also required: .gitignore, bamazon.sql to store database schema, and do the following
// command line opereations: npm init -y, npm install, npm install mysql, npm install inquirer

// =========================================================================================================== //
// 2. Then create a Table inside of that database called `products`.
// 3. The products table should have each of the following columns:
//    * item_id (unique id for each product)
//    * product_name (Name of product)
//    * department_name
//    * price (cost to customer)
//    * stock_quantity (how much of the product is available in stores)
// 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  //  1. Create a MySQL Database called `bamazon`.
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnection();
});


// 5. Then create a Node application called `bamazonCustomer.js`. Running 
// this application will first display all of the items available for sale. Include the ids, 
// names, and prices of products for sale.
function afterConnection () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
            "Item ID: " +
              res[i].item_id +
              " || Product Name: " +
              res[i].product_name +
              " || Department Name: " +
              res[i].department_name +
              " || Price: " +
              res[i].price +
              " || Stock Quantity: " +
              res[i].stock_quantity
          );
        }
      });
    runSearch()
};

// 6. The app should then prompt users with two messages.
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to make a purchase?",
        choices: [
          "Yes",
          "No",
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Yes":
            itemSearch();
            break;
  
        case "NO":
            connection.end();
            break;
        }
      });
  }

function itemSearch() {
    // prompt for info about the item(s) being purchased
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          message: "Excellent! What is the item id of the product you would like to purchase?",
          validate: function(input){
            if(isNaN(input)){
              console.log(" Please enter a number.")
            } else {
              return true
            }
          }
        },
        {
          name: "stock_quantity",
          type: "input",
          message: "How many of this product would you like to purchase?",
          validate: function(input){
            if(isNaN(input)){
              console.log(" Please enter a number.")
            } else {
              return true
            }
          }
        },
      ])
      .then(function(answer) {
        let item_id = answer.item_id;
		let stock_quantity = answer.stock_quantity;
		console.log("You have asked to purchase " + stock_quantity + " of item ID " + item_id); 
        // 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
        // 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
        //    * This means updating the SQL database to reflect the remaining quantity.
        //    * Once the update goes through, show the customer the total cost of their purchase.    

        // tthe function for selecting the products from the database in order to check for sufficient stock:
        selectProducts(item_id , stock_quantity);   
      });
};

function selectProducts(item_id,stock_quantity) {
    connection.query("SELECT * FROM products WHERE item_id = item_id", function(err, res) {
      if (err) throw err;
  
    // Checks to see if there is sufficient inventory
        if(stock_quantity>res[0].stock_quantity) {
            console.log("Insufficient inventory in stock!");
            afterConnection();
        } 
        else {  
            //displays how much the customer owes
            let total = (parseInt(stock_quantity)*(res[0].price));
            console.log("Thank you. You owe " + "$" + total);
            //calculates the new inventory level and calls a function to update the database
            let updatedQuantity = (res[0].stock_quantity) - (parseInt(stock_quantity));
            updateQuantity(item_id, updatedQuantity);
        }
    });
  };
  
// Updates inventory in the database if there is a sale
function updateQuantity(item_id, updatedQuantity) {
    var updating = connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:updatedQuantity},{item_id: item_id}],
      function(err, res) {
          if (err) throw err;
      });
    afterConnection();
};

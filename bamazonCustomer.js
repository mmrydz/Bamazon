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
    console.log("\n\nWelcome to Bamazon, where we take your money AND your personal data!!\n\n");
    displayProducts();
});

// 5. Then create a Node application called `bamazonCustomer.js`. Running 
// this application will first display all of the items available for sale. Include the ids, 
// names, and prices of products for sale.
function displayProducts () {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\n\n===================== Products =====================");
        for (var i = 0; i < res.length; i++) {
            console.log(
            "\nItem ID: " +
              res[i].item_id +
              " || Product Name: " +
              res[i].product_name +
              " || Department Name: " +
              res[i].department_name +
              " || Price: " +
              res[i].price +
              " || Quantity in Stock: " +
              res[i].stock_quantity
          );
        }
      });

    goShopping()
};

// 6. The app should then prompt users with two messages.
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

function goShopping() {
    // prompt for info about the item(s) being purchased
    inquirer
        .prompt([
        {
        name: "which_id",
        type: "input",
        message: "What is the item id of the product you would like to purchase?",
        validate: function(input){
            if(isNaN(input)){
            console.log(" Please enter a number.")
            } else {
            return true
            }
        }
        },
        {
        name: "how_many",
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
        .then (function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, {
                item_id: answers.which_id
            }, function (err, res) {

                let qStock = res[0].stock_quantity;
                let qWanted = answers.how_many;

    // 7. Once the customer has placed the order, your application should check if your store has enough 
    // of the product to meet the customer's request.
    // 8. If your store _does_ have enough of the product, you should fulfill the customer's order.
    // * This means updating the SQL database to reflect the remaining quantity.
    // * Once the update goes through, show the customer the total cost of their purchase.
             
                if (qStock >= qWanted) {
                    var qLeft = qStock - qWanted;
                    var totalOwed = (res[0].price * qWanted).toFixed(2);
                    var itemBought = res[0].product_name;                    
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: qLeft  
                        },
                            {
                                item_id: answers.which_id
                        }
                    ],
                        function (error) {
                            if (error) throw err;
                            console.log("\n\n============= Your Order is Confirmed =============" +
                                        "\nItem:     " + itemBought +
                                        "\nQuantity: " + qWanted + 
                                        "\nPrice:    " +"$" + res[0].price +
                                        "\nTotal:     $" + totalOwed +
                                        "\n\n" +
                                        "    Thank you for your business AND your personal data!" +
                                        "\n\n====================================================\n\n");
                            displayProducts();
                        }
                    );
                } else {
    // * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

                    console.log("\n============== Your Order is Not Confirmed ==============" +
                                "\n\n            Insufficient inventory in stock" + 
                               "\n\n========================================================\n");
                   displayProducts();
                }
            });
        });
};


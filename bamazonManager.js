// Running this application will:
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("\n\nWelcome to Bamazon, where we take your money AND your personal data!!\n\n");
    displayProducts();
});

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

function goShopping() {
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
                    console.log("\n============== Your Order is Not Confirmed ==============" +
                                "\n\n            Insufficient inventory in stock" + 
                               "\n\n========================================================\n");
                   displayProducts();
                }
            });
        });
};


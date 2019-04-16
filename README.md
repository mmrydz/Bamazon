Bamazon Customer:

This application creates a virtual shopping experience using mySQL and Node, and utilizing the Inquirer npm package. When you run “node bamazonCustomer.js”, you will see a list of 10 items:

Item ID for each product
Name of Product
Department of Product
Price
Quantity Available

After reviewing the products, you are prompted to input the item ID of the item you would like to purchase. You are then prompted to input the quantity of that item that you want to purchase. If there is sufficient inventory, the program will confirm your order and display the details and the total that you owe. If there is insufficient inventory, you are prompted to choose another product.

View the video demonstration here: https://drive.google.com/file/d/1cgegjUZ83hGg4bWlAi957r5UAdlm4bgo/view?usp=sharing

Bamazon Manager:

Building on Bamazon Customer, running bamazonManager.js will: 

List a set of menu options:
- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

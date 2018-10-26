// var inquirer = require("inquirer");
var mysql = require("mysql");
// var cTable = require('console.table');
var Table = require('cli-table');
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
function afterConnection() {
    inquirer
        .prompt([
            {
                name: "Greeting",
                type: "input",
                message: "Welcome to Bamazon please type in yes to look in our products?",
            }
        ]).then(function (answer) {
            var table = new Table({
                head: ["Id", "Item", "Department", "Price", "Stock"],
                colWidths: [10, 30, 20, 15, 15]
            });
            var query = connection.query("SELECT * FROM products", function (err, res) {
                if (answer.Greeting.toLowerCase() === "yes") {
                    for (var i = 0; i < res.length; i++) {
                        // console.log(res[i].id+" | " + res[i].ProductName + " | " +res[i].DepartmentName+ " | " + res[i].Price + " | " + res[i].StockQuantity);

                        var itemId = res[i].id,
                            product = res[i].ProductName,
                            department = res[i].DepartmentName,
                            price = res[i].Price,
                            quantity = res[i].StockQuantity;

                        table.push(
                            [itemId, product, department, price, quantity]
                        );
                    }
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                    console.log(table.toString());

                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    askUser();
                }
                else {
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                    console.log("Thank you for Visiting Bamazon!!");

                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    connection.end();
                }

            })
        })

}
function askUser() {

    inquirer
        .prompt([
            {
                name: "Question",
                type: "input",
                message: "Whats The ID number of the product you want to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "Question2",
                type: "input",
                message: "how many units of the product  would You like to buy?"
            }
        ])
        .then(function (answer) {

            var inStock;

            connection.query("SELECT * FROM products WHERE id = ?", answer.Question, function (err, res) {

                for (var i = 0; i < res.length; i++) {
                    // var customerChoice;
                    // var inStock;
                    if (parseInt(res[i].id) === parseInt(answer.Question)) {
                        inStock = parseInt(res[i].StockQuantity) - parseInt(answer.Question2);
                        if (inStock < 0) {
                            console.log("Sorry we dont have the product for now check back next week!!");
                        }
                        else {
                            var stock = parseFloat(res[i].Price) * parseFloat(answer.Question2);
                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                            console.log("Item: " + res[i].ProductName);
                            console.log("Total Product Purchased: " + answer.Question2);
                            console.log("Total Price: " + stock);
                            console.log("Your order is Placed!!");

                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                            // console.log("Thank you For purchazing from Amazon!!");
                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    StockQuantity: inStock
                                },
                                {
                                    id: answer.Question
                                }
                            ], function (err) {
                                if (err) throw err;

                                console.log("Thank you For purchazing from Amazon!!");
                                
                                console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                                console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                            })
                        }
                    }
                    else {
                        console.log("The product id you selected is not in our inventory ,PLease inter the Valid id number. Thank you!!")
                        
                    }
                    connection.end();
                }
            })

        })
}
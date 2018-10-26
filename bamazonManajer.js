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
    askUser();
});
function askUser() {

    inquirer
        .prompt([
            {
                name: "Choices",
                type: "rawlist",
                message: "Hello Please choose from the options below?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }

        ])
        .then(function (answer) {
            switch (answer.Choices) {
                case "View Products for Sale":
                    productSale();
                    break;

                case "View Low Inventory":
                    lowInv();
                    break;

                case "Add to Inventory":
                    addInv();
                    break;

                case "Add New Product":
                    addProd();
                    break;
            }
        })
}
function productSale() {
    var table = new Table({
        head: ["Id", "Item", "Price", "Stock"],
        colWidths: [10, 30, 15, 10]
    });
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            throw err
        };
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].id+" | " + res[i].ProductName + " | " +res[i].DepartmentName+ " | " + res[i].Price + " | " + res[i].StockQuantity);

            var itemId = res[i].id,
                product = res[i].ProductName,
                // department = res[i].DepartmentName,
                price = res[i].Price,
                quantity = res[i].StockQuantity;

            table.push(
                [itemId, product, price, quantity]
            );
        }
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

        console.log(table.toString());

        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

        askUser()
        // connection.end();
    })
}
function lowInv() {

    var table = new Table({
        head: ["Id", "Item", "Stock"],
        colWidths: [10, 30, 15]
    });

    connection.query("SELECT * FROM products WHERE StockQuantity < 5", function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {



            var itemId = res[i].id,
                product = res[i].ProductName,
                quantity = res[i].StockQuantity;
            table.push(
                [itemId, product, quantity]
            );
        }
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

        console.log("Our inventory is Lower in This PRoduct below!!");

        console.log(table.toString());
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
        console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

        askUser()
        // connection.end();
    })
}

function addInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        inquirer
            .prompt([
                {
                    name: "Question",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {

                            choiceArray.push(res[i].ProductName);
                        }
                        return choiceArray;
                    },
                    message: "On which product you want to add more on?"
                },
                {
                    name: "Question2",
                    type: "input",
                    message: "How many more you want to add on the prducts?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                var chosenItem;
                var addedInStock;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].ProductName === answer.Question) {
                        chosenItem = res[i];
                        addedInStock = parseInt(res[i].StockQuantity) + parseInt(answer.Question2);
                    }
                }
                if (answer.Question2 > 0) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                StockQuantity: addedInStock
                            },
                            {
                                id: chosenItem.id
                            }
                        ], function (err) {
                            if (err) throw err;
                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                            console.log("Product added successfully!");

                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                            console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                            askUser();
                        }
                    );

                }
                else {
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                    console.log("You need a number thats more than 0!!");

                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                    console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                    addInv();
                }
            });
    });
}
function addProd() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the new product you want to add?"
            },
            {
                name: "Department",
                type: "input",
                message: "What department would you like to place the product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the product?",
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
                message: "How many more you want to add on the prducts?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO products SET ?", {
                ProductName: answer.item,
                DepartmentName: answer.Department,
                Price: answer.price,
                StockQuantity: answer.Question2
            }, function (err, res) {
                if (err) throw err;
                console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                console.log("Your Item IS ADDED!!");

                console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");
                console.log("<*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*><*>");

                console.log("_________________________________________________________________________________________________________");
                askUser();
            })
        })
}
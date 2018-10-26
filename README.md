# Node.js-MySQL

<h1>Bamazon</h1>
<hr>
<h5>Description</h5>

This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm <a href = "https://www.npmjs.com/package/mysql" target = "_blank">mysql</a>package. The application presents two interfaces: customer and manager.

<h5>MySQL Database Setup</h5>

<p>In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the MySQL installation page to install the version you need for your operating system. Once you have MySQL isntalled, you will be able to create the Bamazon database and the products table with the SQL code found in Bamazon.sql. Run this code inside your MySQL client like Sequel Pro to populate the database, then you will be ready to proceed with running the Bamazon <strong>customer</strong> and <strong>manager</strong> interfaces.</p>

<h5>Customer Interface</h5>

<p>The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.</p>

<br>

<p>To watch a Customer demo video <a href="https://drive.google.com/file/d/1WVXlZ0e3znVXtnSjft80_b8p3DjfyjFU/view">Click</a> here.</p>

<h5>Manager Interace</h5>
<p>The manager interface presents a list of four options, as below.</p>
<ul>
<li>The <strong>View Products for Sale</strong> option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.</li>

<li>The <strong>View Low Inventory</strong> option shows the user the items which currently have lower than 5.</li>

<li>The <strong>Add to Inventory</strong> option allows the user to select a given item ID and add additional inventory to the target item.</li>

<li>The <strong>Add New Product</strong> option allows the user to enter details about a new product which will be entered into the database upon completion of the form.</li>
</ul>
<br>
<p>To watch a Manager demo video <a href = "https://drive.google.com/file/d/1Z72LWgTZ4PcBBWiiuMnk4HnOFwA-WF8-/view">Click</a> here.<p>

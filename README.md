# Inventory Management API

This backend is created for inventory management it facilitates user, product and category management.

## User Management

- POST /api/user/signup: Create a new user account.
- POST /api/user/signin: Authenticate and log in an existing user.
- GET /api/user/logout: Log out the current user.

## Category Management

- POST /api/category/add: Add a new category.
- GET /api/category: Retrieve all categories.
- GET /api/category/{id}: Get details of a specific category by ID.
- PUT /api/category/{id}: Update a category by ID.
- DELETE /api/category/{id}: Delete a category by ID.

## Product Management

- POST /api/product/add: Add a new product.
- GET /api/product: Retrieve all products.
- GET /api/product/{id}: Get details of a specific product by ID.
- PUT /api/product/{id}: Update a product by ID.
- DELETE /api/product/{id}: Delete a product by ID.
- PUT /api/product/quantity/{id}: Update the quantity of a product by ID.

These API is built on the following technologies:

- Node.js
- Express.js
- MongoDB


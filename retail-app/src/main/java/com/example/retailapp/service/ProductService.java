package com.example.retailapp.service;

import com.example.retailapp.entity.Product;
import java.util.List;

public interface ProductService {

    //used for getting all products from the database, returns a list
    List<Product> getAllProducts();

    //used for saving a product into the database
    Product saveProduct(Product product);

    //Product updateStockById(Long id);

    //used for finding a product by id and returning it
    Product findById(Long id);


    //deletes a product on the database by id
    void deleteProductById(Long id);

    //decreases the stock of a product on the database
    Product decreaseStock(Product product, int amount);

    //increases the stock of a product on the database
    Product increaseStock(Product product, int amount);

    //update the name field  of a product
    Product updateName(Product product, String name);

    //update the price of a product in the database
    Product updatePrice(Product product, double price);

    //update the category field of a product in the database
    Product updateCategory(Product product, String category);
}

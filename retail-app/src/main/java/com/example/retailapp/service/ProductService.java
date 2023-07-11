package com.example.retailapp.service;

import com.example.retailapp.entity.Product;
import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product saveProduct(Product product);

    //Product updateStockById(Long id);

    Product findById(Long id);

    void deleteProductById(Long id);

    Product decreaseStock(Product product, int amount);

    Product increaseStock(Product product, int amount);

    Product updateName(Product product, String name);

    Product updatePrice(Product product, double price);

    Product updateCategory(Product product, String category);
}

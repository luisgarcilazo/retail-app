package com.example.retailapp.service;

import com.example.retailapp.entity.Product;
import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product saveProduct(Product product);

    //Product updateStockById(Long id);

    Product findById(Long id);

    void deleteProductById(Long id);
}

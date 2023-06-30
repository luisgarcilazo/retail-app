package com.example.retailapp.controller;

import com.example.retailapp.entity.Product;
import com.example.retailapp.entity.User;
import com.example.retailapp.service.ProductService;
import com.example.retailapp.service.UserInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/store")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @Autowired
    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    // GET /products for getting all products
    @GetMapping("/products")
    public List<Product> getProducts(){
        return this.productService.getAllProducts();
    }
    // POST /products for adding a new product
    @PostMapping("/products")
    public Product addClient(@RequestBody Product product) {

        Product dbProduct = productService.saveProduct(product);

        return dbProduct;
    }
    //delete for /products/{id} based on Id
    @DeleteMapping("/products/{id}")
    public List<Product> deleteUser(@PathVariable Long id){
        try {
            Product product = this.productService.findById(id);
            this.productService.deleteProductById(id);
            return this.productService.getAllProducts();
        } catch (RuntimeException e){
            log.error("Delete failed for id: " + id);
            return new ArrayList<>();
        }
    }
}

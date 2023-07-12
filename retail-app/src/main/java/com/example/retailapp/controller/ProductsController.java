package com.example.retailapp.controller;

import com.example.retailapp.entity.Product;
import com.example.retailapp.entity.User;
import com.example.retailapp.service.ProductService;
import com.example.retailapp.service.UserInfoService;
import jakarta.websocket.server.PathParam;
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

    // GET /products/{id} for getting product by id
    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable(name="id") Long id){
        try {
            Product product = this.productService.findById(id);
            return product;
        } catch (RuntimeException e){
            log.error("Get product by id failed for id: " + id);
            return new Product();
        }
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


    //update stock by id
    @PutMapping("/products/{id}/stock/decrease/{amount}")
    public Product decreaseStock(@PathVariable(name = "id") Long id,
                               @PathVariable(name = "amount") int amount){
        log.info("Decreasing product id " + id + " stock by " + amount);
        if(amount < 0){
            log.error("Cannot decrease by an amount less than zero");
            return new Product();
        }
        try {
            Product dbProduct = this.productService.findById(id);
            return this.productService.decreaseStock(dbProduct, amount);
        } catch (RuntimeException e){
            log.error("Decrease stock failed for id: " + id);
            return new Product();
        }
    }

    //increase stock
    @PutMapping("/products/{id}/stock/increase/{amount}")
    public Product increaseStock(@PathVariable(name = "id") Long id,
                               @PathVariable(name = "amount") int amount){
        log.info("Increase product id " + id + " stock by " + amount);
        try {
            Product dbProduct = this.productService.findById(id);
            return this.productService.increaseStock(dbProduct, amount);
        } catch (RuntimeException e){
            log.error("Increase stock failed for id: " + id);
            return new Product();
        }
    }

    //update name of product
    @PutMapping("/products/{id}/name/{name}")
    public Product updateName(@PathVariable(name = "id") Long id,
                               @PathVariable(name = "name") String name){
        log.info("Update name for product id " + id + " to be " + name);
        try {
            Product dbProduct = this.productService.findById(id);
            return this.productService.updateName(dbProduct, name);
        } catch (RuntimeException e){
            log.error("Update name failed for id: " + id);
            return new Product();
        }
    }

    //update price by id
    @PutMapping("/products/{id}/price/{amount}")
    public Product updatePrice(@PathVariable(name = "id") Long id,
                                 @PathVariable(name = "amount") double amount){
        log.info("Update price for product id " + id + " to be " + amount);
        try {
            Product dbProduct = this.productService.findById(id);
            return this.productService.updatePrice(dbProduct, amount);
        } catch (RuntimeException e){
            log.error("Update price failed for id: " + id);
            return new Product();
        }
    }

    //update category of product
    @PutMapping("/products/{id}/category/{category}")
    public Product updateCategory(@PathVariable(name = "id") Long id,
                               @PathVariable(name = "category") String category){
        log.info("Update category for product id " + id + " to be " + category);
        try {
            Product dbProduct = this.productService.findById(id);
            return this.productService.updateCategory(dbProduct, category);
        } catch (RuntimeException e){
            log.error("Update category failed for id: " + id);
            return new Product();
        }
    }
}

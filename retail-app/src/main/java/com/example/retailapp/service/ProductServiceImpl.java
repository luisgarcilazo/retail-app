package com.example.retailapp.service;

import com.example.retailapp.DAO.ProductDAO;
import com.example.retailapp.entity.Product;
import com.example.retailapp.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductDAO productDAO;

    //returns list of all product
    @Override
    public List<Product> getAllProducts() {
        log.info("Getting all products");
        return this.productDAO.findAll();
    }

    //saves a product into the database, returns that product
    @Override
    public Product saveProduct(Product product) {
        log.info("Saving a product for product name: " + product.getName());
        return this.productDAO.save(product);
    }


    //finds the product by id and returns it, throws exception if not found
    @Override
    public Product findById(Long id) {
        log.info("Inside find by id on service");
        Optional<Product> optionalProduct = this.productDAO.findById(id);
        Product product = null;
        if(optionalProduct.isPresent()){
            product = optionalProduct.get();
            return product;
        } else {
            throw new RuntimeException("Product not found for id: " + id);
        }
    }

    //deletes product depending on the id provided
    @Override
    public void deleteProductById(Long id) {
        log.info("Deleting a product for id: " + id);
        this.productDAO.deleteById(id);
    }

    //decreases the stock for the product passed by the amount specified, returns same product
    //will fail if amount > stock as stock cannot be less than 0
    @Override
    public Product decreaseStock(Product product, int amount){
        log.info("Decreasing stock about to be called");
        if(product.getStock() < amount){
            log.error("Cannot decrease stock to be less than current stock");
            return new Product();
        }
        product.setStock(product.getStock()- amount);
        return this.productDAO.save(product);
    }

    //increases stock by the amount provided for the product
    @Override
    public Product increaseStock(Product product, int amount){
        log.info("Increasing stock called");
        product.setStock(product.getStock() + amount);
        return this.productDAO.save(product);
    }

    //updates the name on the product provided and saves it to the database using the DAO
    @Override
    public Product updateName(Product product, String name) {
        log.info("Update name called");
        product.setName(name);
        return this.productDAO.save(product);
    }

    //updates the price on the product provided and saves it to the database using the DAO
    @Override
    public Product updatePrice(Product product, double price) {
        log.info("Update price called");
        product.setPrice(price);
        return this.productDAO.save(product);
    }

    //updates the category on the product provided and saves it to the database using the DAO-
    @Override
    public Product updateCategory(Product product, String category) {
        log.info("Update category called");
        product.setCategory(category);
        return this.productDAO.save(product);
    }

}

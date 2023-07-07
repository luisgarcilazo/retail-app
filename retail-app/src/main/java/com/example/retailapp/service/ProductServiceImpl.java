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

    @Override
    public List<Product> getAllProducts() {
        log.info("Getting all products");
        return this.productDAO.findAll();
    }

    @Override
    public Product saveProduct(Product product) {
        log.info("Saving a product for product name: " + product.getName());
        return this.productDAO.save(product);
    }

//    @Override
//    public Product updateStockById(Long id) {
//        try{
//            Product product = findById(id);
//
//        } catch (RuntimeException e){
//            log.error("Couldn't find product so can't update stock for id: " + id);
//            return new Product();
//        }
//    }

    @Override
    public Product findById(Long id) {
        Optional<Product> optionalProduct = this.productDAO.findById(id);
        Product product = null;
        if(optionalProduct.isPresent()){
            product = optionalProduct.get();
            return product;
        } else {
            throw new RuntimeException("Product not found for id: " + id);
        }
    }

    @Override
    public void deleteProductById(Long id) {
        log.info("Deleting a product for id: " + id);
        this.productDAO.deleteById(id);
    }

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

    @Override
    public Product increaseStock(Product product, int amount){
        log.info("Increasing stock about to be called");
        product.setStock(product.getStock() + amount);
        return this.productDAO.save(product);
    }
}

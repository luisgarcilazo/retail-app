package com.example.retailapp.service;

import com.example.retailapp.entity.ProductOrder;

public interface ProductOrderService {

    //saves a product order into the database
    ProductOrder save(ProductOrder productOrder);
}

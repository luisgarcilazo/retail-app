package com.example.retailapp.service;

import com.example.retailapp.entity.Order;

import java.util.List;

public interface OrderService {

    //method for getting all orders from database
    List<Order> getAllOrders();

    //method for saving an order on the database
    Order save(Order order);

    //method for finding an order by id
    Order findById(Long id);

    //method for updating the status of the order
    Order updateStatus(Order order, String status);
}

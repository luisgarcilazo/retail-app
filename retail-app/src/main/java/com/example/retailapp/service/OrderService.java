package com.example.retailapp.service;

import com.example.retailapp.entity.Order;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    Order save(Order order);

    Order findById(Long id);

    Order updateStatus(Order order, String status);
}

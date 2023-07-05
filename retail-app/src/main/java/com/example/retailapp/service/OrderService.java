package com.example.retailapp.service;

import com.example.retailapp.entity.Order;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    Order save(Order order);
}

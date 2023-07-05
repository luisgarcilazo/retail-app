package com.example.retailapp.controller;

import com.example.retailapp.entity.Order;
import com.example.retailapp.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    // GET method for displaying all orders
    @GetMapping("")
    public List<Order> getOrders(){
        return this.orderService.getAllOrders();
    }

    // POST method for adding an order

    @PostMapping("")
    public Order addOrder(@RequestBody Order order){
        Order dbOrder = orderService.save(order);

        return dbOrder;
    }
}

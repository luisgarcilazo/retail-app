package com.example.retailapp.service;

import com.example.retailapp.DAO.OrderDAO;
import com.example.retailapp.entity.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDAO orderDAO;

    @Override
    public List<Order> getAllOrders() {
        return this.orderDAO.findAll();
    }

    @Override
    public Order save(Order order) {
        log.info("Saving a order");
        log.info(order.toString());
        return this.orderDAO.save(order);
    }
}

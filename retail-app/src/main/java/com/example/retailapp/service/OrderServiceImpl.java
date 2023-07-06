package com.example.retailapp.service;

import com.example.retailapp.DAO.OrderDAO;
import com.example.retailapp.entity.Order;
import com.example.retailapp.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Order findById(Long id) {
        Optional<Order> optionalOrder = this.orderDAO.findById(id);
        Order order = null;
        if(optionalOrder.isPresent()){
            order = optionalOrder.get();
            return order;
        } else {
            throw new RuntimeException("Order not found for order id: " + id);
        }
    }

    @Override
    public Order updateStatus(Order order, String status) {
        log.info("Updating order with id " + order.getId() +  " to have status: " + status);
        order.setStatus(status);
        return this.orderDAO.save(order);
    }
}

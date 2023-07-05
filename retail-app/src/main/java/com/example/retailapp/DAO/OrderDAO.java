package com.example.retailapp.DAO;

import com.example.retailapp.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDAO extends JpaRepository<Order,Long> {
}

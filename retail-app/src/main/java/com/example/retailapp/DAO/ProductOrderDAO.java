package com.example.retailapp.DAO;

import com.example.retailapp.entity.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductOrderDAO extends JpaRepository<ProductOrder,Long> {
}

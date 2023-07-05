package com.example.retailapp.service;

import com.example.retailapp.DAO.OrderDAO;
import com.example.retailapp.DAO.ProductOrderDAO;
import com.example.retailapp.entity.ProductOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProductOrderServiceImpl implements ProductOrderService{

    @Autowired
    private ProductOrderDAO productOrderDAO;
    @Override
    public ProductOrder save(ProductOrder productOrder) {
        return this.productOrderDAO.save(productOrder);
    }
}

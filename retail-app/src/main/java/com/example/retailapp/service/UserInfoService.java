package com.example.retailapp.service;

import com.example.retailapp.entity.Order;
import com.example.retailapp.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserInfoService extends UserDetailsService {

    //gets all users and returns a lit
    List<User> findAll();

    //finds a user by username and returns it
    User findByUsername(String username);

    //saves a developer user to the database
    User saveDev(User user);

    //saves a manager user to the database
    User saveManager(User user);

    //saves a client user to the database
    User saveClient(User user);

    //deletes a user by username from the database
    void deleteUserByUsername(String username);

    //adds an order to the user provided and saves it to the database
    User addOrderToUser(User user, Order order);
}

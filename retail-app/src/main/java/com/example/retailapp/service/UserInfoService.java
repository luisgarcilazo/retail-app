package com.example.retailapp.service;

import com.example.retailapp.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserInfoService extends UserDetailsService {

    List<User> findAll();

    User findByUsername(String username);

    User saveDev(User user);

    User saveManager(User user);

    User saveClient(User user);

    void deleteUserByUsername(String username);
}

package com.example.retailapp.controller;

import com.example.retailapp.entity.Order;
import com.example.retailapp.entity.User;
import com.example.retailapp.service.UserInfoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserDetailsController {

    private UserInfoService userInfoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserDetailsController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    // GET /users endpoint for getting all users
    @GetMapping("/users")
    public List<User> findAll() {
        return userInfoService.findAll();
    }

    // POST /users/client for adding a new client
    @PostMapping("/users/client")
    public User addClient(@RequestBody User user) {

        User dbUser = userInfoService.saveClient(user);

        return dbUser;
    }

    // POST /users/client for adding a new dev
    @PostMapping("/users/dev")
    public User addDev(@RequestBody User user) {

        User dbUser = userInfoService.saveDev(user);

        return dbUser;
    }

    // POST /users/manager for adding a new manager
    @PostMapping("/users/manager")
    public User addManager(@RequestBody User user) {

        User dbUser = userInfoService.saveManager(user);

        return dbUser;
    }
    // POST /users/login for checking if the user details are correct (user for login in front-end)
    @PostMapping("/users/login")
    public User checkUser(@RequestBody User user) {
        log.info("Trying to log in as username: " + user.getUsername());
        try {
            User dbUser = userInfoService.findByUsername(user.getUsername());
            if (dbUser.getUsername() == null) {
                log.error("Logging in failed for username: " + user.getUsername());
                log.error("Reason: Incorrect Password");
                return new User();
            }
            if (dbUser.getUsername().equals(user.getUsername()) && passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                return dbUser;
            } else {
                return new User(); //returns new user with all empty fields
            }
        } catch (RuntimeException e){
            log.error("Logging in failed for username: " + user.getUsername());
            log.error("Reason: Username does not exist");
            return new User(); //returns new user with all empty fields
        }


    }
    @DeleteMapping("/users/{username}")
    public List<User> deleteUser(@PathVariable String username){
        try {
            User user = this.userInfoService.findByUsername(username);
            this.userInfoService.deleteUserByUsername(username);
            return this.userInfoService.findAll();
        } catch (RuntimeException e){
            log.error("Delete failed for username: " + username);
            return new ArrayList<>();
        }
    }

    // PUT mapping for adding order to user
    @PutMapping("/users/{username}/orders")
    public User addOrderToUser(@RequestBody Order order, @PathVariable String username){
        log.info("Adding an order to a user");
        User dbUser = userInfoService.findByUsername(username);
        if (dbUser.getUsername() == null) {
            return new User();
        }
        return userInfoService.addOrderToUser(dbUser, order);
    }

    // GET mapping for getting orders from user
    @GetMapping("/users/{username}/orders")
    public Collection<Order> getOrdersFromUsername(@PathVariable String username){
        log.info("Getting orders from username" + username);
        try {
            User dbUser = userInfoService.findByUsername(username);
            return dbUser.getOrders();
        } catch (RuntimeException e){
            log.error("Getting orders failed for username: " + username);
            return new ArrayList<>();
        }

    }
}

package com.example.retailapp.controller;

import com.example.retailapp.entity.User;
import com.example.retailapp.service.UserInfoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @DeleteMapping("/users/{username}")
    public List<User> deleteUser(@PathVariable String username){
        try {
            User user = this.userInfoService.findByUsername(username);
            this.userInfoService.deleteUserByUsername(username);
            return this.userInfoService.findAll();
        } catch (RuntimeException e){
            System.out.println("Delete failed for username: " + username);
            return new ArrayList<>();
        }
    }
}

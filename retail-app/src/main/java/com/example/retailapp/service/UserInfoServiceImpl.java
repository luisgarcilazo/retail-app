package com.example.retailapp.service;

import com.example.retailapp.DAO.RoleDAO;
import com.example.retailapp.DAO.UserDAO;
import com.example.retailapp.entity.User;
import com.example.retailapp.entity.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserInfoServiceImpl implements UserInfoService{

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private RoleDAO roleDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userDAO.findAll();
    }

    @Override
    public User findByUsername(String username) {
        Optional<User> optionalUser = this.userDAO.findById(username);
        User user = null;
        if(optionalUser.isPresent()){
            user = optionalUser.get();
            return user;
        } else {
            throw new RuntimeException("User not found for username: " + username);
        }
    }

    //manager has role of client and manager
    @Override
    public User saveManager(User user) {
        log.info("Saving a manager for username: " + user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        ArrayList<Role> roleArrayList = new ArrayList<>();
        Role role1 = new Role();
        Role role2 = new Role();
        role1.setId(2L);
        role1.setName("ROLE_CLIENT");
        role2.setId(3L);
        role2.setName("ROLE_MANAGER");
        roleArrayList.add(role1);
        roleArrayList.add(role2);
        user.setRoles(roleArrayList);
        user.setEnabled(true);
        return this.userDAO.save(user);
    }

    //dev has all three roles
    @Override
    public User saveDev(User user) {
        log.info("Saving a developer for username: " + user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        ArrayList<Role> roleArrayList = new ArrayList<>();
        Role role1 = new Role();
        Role role2 = new Role();
        Role role3 = new Role();
        role1.setId(1L);
        role1.setName("ROLE_DEVELOPER");
        role2.setId(2L);
        role2.setName("ROLE_CLIENT");
        role3.setId(3L);
        role3.setName("ROLE_MANAGER");
        roleArrayList.add(role1);
        roleArrayList.add(role2);
        roleArrayList.add(role3);
        user.setRoles(roleArrayList);
        user.setEnabled(true);
        return this.userDAO.save(user);
    }

    //client has role of client
    @Override
    public User saveClient(User user) {
        log.info("Saving a developer for username: " + user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        ArrayList<Role> roleArrayList = new ArrayList<>();
        Role role2 = new Role();
        role2.setId(2L);
        role2.setName("ROLE_CLIENT");
        roleArrayList.add(role2);
        user.setRoles(roleArrayList);
        user.setEnabled(true);
        return this.userDAO.save(user);
    }

    @Override
    public void deleteUserByUsername(String username){
        log.info("Deleting a user for username: " + username);
        this.userDAO.deleteById(username);
    }
    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        log.info("User authenticated has username:  " + user.getUsername());
        log.info("User authenticated has roles:  " + user.getRoles().toString());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}

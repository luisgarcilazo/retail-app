package com.example.retailapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

//help at setting user sql database from
//https://www.udemy.com/course/spring-hibernate-tutorial
//highly recommend!
@Entity
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {

    @Id
    @Column(name="username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Role> roles;


    //extra constructor without roles
    public User(String username, String password, boolean enabled){
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

}

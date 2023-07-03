package com.example.retailapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name="order")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Order {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;


    @Column(name = "zipcode")
    private Long zipcode;

    @Column(name = "status")
    private String status;

    @Column(name = "filename")
    private String filename;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "order_product_orders",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_order_id"))
    private Collection<ProductOrder> productOrders;

}

package com.example.retailapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="product_order")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProductOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne()
    @JoinColumn(name="product_id")
    private Product product;

    @Column(name = "amount")
    private Long amount;
}

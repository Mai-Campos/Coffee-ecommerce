package com.coffee.coffee.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Coffee coffee;

    private int quantity;

    @ManyToOne
    @JsonBackReference
    private Order order;
}

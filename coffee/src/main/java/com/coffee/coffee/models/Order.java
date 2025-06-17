package com.coffee.coffee.models;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    private Long id;
    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User customer;

    @ManyToMany
    @JoinTable(
        name = "order_coffee",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "coffee_id")
    )
    private List<Coffee> coffees = new ArrayList<>();
    
}

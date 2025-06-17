package com.coffee.coffee.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Data
public class Coffee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private String imageUrl;
    private Double price;
    private String recipe;
 
    @ManyToMany(mappedBy = "coffees")
    private List<Order> orders = new ArrayList<>();

    public Coffee() {
    }

    public Coffee(Long id, String name, String description, String imageUrl, Double price, String recipe) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.recipe = recipe;
    }

}

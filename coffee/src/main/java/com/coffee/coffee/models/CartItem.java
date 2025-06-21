package com.coffee.coffee.models;

import lombok.Data;

@Data
public class CartItem {


    private Long productId;
    private String name;
    private double price;
    private int quantity;

     public CartItem(Coffee coffee, int quantity) {
        this.productId = coffee.getId(); // Asumiendo que Coffee tiene getId()
        this.name = coffee.getName();
        this.price = coffee.getPrice();
        this.quantity = quantity;
    }

}

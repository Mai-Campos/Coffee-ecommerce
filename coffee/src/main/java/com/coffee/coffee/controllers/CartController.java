package com.coffee.coffee.controllers;


import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.coffee.coffee.models.CartItem;
import com.coffee.coffee.services.CartService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(HttpSession session) {
        return ResponseEntity.ok(cartService.getCart(session));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> addProduct(@PathVariable Long productId, HttpSession session) {
        cartService.addProductToCart(productId, session);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeProduct(@PathVariable Long productId, HttpSession session) {
        cartService.removeProductFromCart(productId, session);
        return ResponseEntity.ok().build();
    }
}

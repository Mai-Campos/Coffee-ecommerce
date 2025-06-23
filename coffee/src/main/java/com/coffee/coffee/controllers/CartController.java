package com.coffee.coffee.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import com.coffee.coffee.models.CartItem;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IUserRepository;
import com.coffee.coffee.services.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private IUserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
        }
        User user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
        List<CartItem> items = cartService.getCart(user);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{coffeeId}")
    public ResponseEntity<?> addToCart(@PathVariable Long coffeeId, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
        }
        User user = userRepository.findByUserName(userDetails.getUsername()).orElseThrow();
        cartService.addToCart(coffeeId, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{coffeeId}")
    public ResponseEntity<Void> removeProduct(@PathVariable Long coffeeId, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userRepository.findByUserName(userDetails.getUsername())
                                  .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        cartService.removeFromCart(coffeeId, user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/decrement/{coffeeId}")
    public ResponseEntity<Void> decrementProduct(@PathVariable Long coffeeId, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userRepository.findByUserName(userDetails.getUsername())
                                  .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        cartService.decrementFromCart(coffeeId, user);
        return ResponseEntity.ok().build();
    }
}

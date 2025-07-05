package com.coffee.coffee.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.coffee.coffee.models.User;
import com.coffee.coffee.models.Order;
import com.coffee.coffee.services.OrderServiceImpl;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;


    @GetMapping("/admin")
    public ResponseEntity<?> getAllOrders() {
        try {
            return ResponseEntity.ok(orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
   

    @PostMapping
    public ResponseEntity<?> createOrder(
        @RequestParam String address,
        @AuthenticationPrincipal User user) {

        try {
            Order order = orderService.createOrder(user, address);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id){
        try{
             orderService.deleteOrder(id);
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.noContent().build();
        }
       
    }
}

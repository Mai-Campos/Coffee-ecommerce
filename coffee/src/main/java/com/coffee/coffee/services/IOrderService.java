package com.coffee.coffee.services;

import java.util.List;

import com.coffee.coffee.models.Order;
import com.coffee.coffee.models.User;


public interface IOrderService {

    List<Order> getAllOrders();
    void deleteOrder(Long id);
    Order createOrder(User user, String address);
    
}

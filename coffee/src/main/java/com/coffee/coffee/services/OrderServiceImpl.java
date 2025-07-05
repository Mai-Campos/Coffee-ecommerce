package com.coffee.coffee.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.coffee.coffee.models.*;
import com.coffee.coffee.repository.*;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private IOrderItemRepository orderItemRepository;
    @Autowired
    private ICartItemRepository cartItemRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
   
    @Transactional
    public Order createOrder(User user, String address) {
        List<CartItem> cartItems = cartItemRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Carrito vacío.");
        }

        // Calcular total
        double totalPrice = cartItems.stream()
                .mapToDouble(item -> item.getCoffee().getPrice() * item.getQuantity())
                .sum();

        // Crear Order
        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        // Crear y guardar OrderItems
        List<OrderItem> orderItems = cartItems.stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setCoffee(cartItem.getCoffee());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setOrder(savedOrder);
            return orderItem;
        }).collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);

        // Asociar items al pedido
        savedOrder.setOrderItems(orderItems);

        // Limpiar carrito del usuario
        cartItemRepository.deleteByUser(user);

        return orderRepository.save(savedOrder); // devolver el pedido actualizado
    }

    public void deleteOrder(Long id){
        orderRepository.deleteById(id);
    }

}

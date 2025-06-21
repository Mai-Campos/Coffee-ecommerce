package com.coffee.coffee.services;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coffee.coffee.models.CartItem;
import com.coffee.coffee.models.Coffee;
import com.coffee.coffee.repository.ICoffeeRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private ICoffeeRepository coffeeRepository;

   
    public List<CartItem> getCart(HttpSession session) {
        List<CartItem> cart = (List<CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
        }
        return cart;
    }

    public void addProductToCart(Long productId, HttpSession session) {
        Coffee coffee = coffeeRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Café no encontrado: " + productId));

        List<CartItem> cart = getCart(session);

        // Buscar si el producto ya está en el carrito
        for (CartItem item : cart) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + 1);
                return;
            }
        }

        // Si no está, agregar nuevo
        cart.add(new CartItem(coffee, 1));
    }

    public void removeProductFromCart(Long productId, HttpSession session) {
        List<CartItem> cart = getCart(session);
        cart.removeIf(item -> item.getProductId().equals(productId));
    }
}

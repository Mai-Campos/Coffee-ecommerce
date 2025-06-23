package com.coffee.coffee.services;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.coffee.coffee.models.CartItem;
import com.coffee.coffee.models.Coffee;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.ICartItemRepository;
import com.coffee.coffee.repository.ICoffeeRepository;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private ICoffeeRepository coffeeRepository;

    @Autowired
    private ICartItemRepository cartItemRepository;

   
    public List<CartItem> getCart(User user) {
        return cartItemRepository.findByUser(user);
    }

    public void addToCart(Long coffeeId, User user) {
         Coffee coffee = coffeeRepository.findById(coffeeId)
                .orElseThrow(() -> new RuntimeException("Café no encontrado"));

        CartItem item = cartItemRepository.findByCoffeeAndUser(coffee, user)
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setUser(user);
                    newItem.setCoffee(coffee);
                    newItem.setQuantity(0);
                    return newItem;
                });

        item.setQuantity(item.getQuantity() + 1);
        cartItemRepository.save(item);
    }

   public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }

    public void removeFromCart(Long coffeeId, User user) {
        Coffee coffee = coffeeRepository.findById(coffeeId).orElseThrow();
        cartItemRepository.findByCoffeeAndUser(coffee, user).ifPresent(cartItemRepository::delete);
    }

    public void decrementFromCart(Long coffeeId, User user) {
        Coffee coffee = coffeeRepository.findById(coffeeId)
                .orElseThrow(() -> new RuntimeException("Café no encontrado"));

        cartItemRepository.findByCoffeeAndUser(coffee, user).ifPresent(item -> {
            int currentQuantity = item.getQuantity();
            if (currentQuantity > 1) {
                item.setQuantity(currentQuantity - 1);
                cartItemRepository.save(item);
            } else {
                cartItemRepository.delete(item);
            }
        });
    }
}

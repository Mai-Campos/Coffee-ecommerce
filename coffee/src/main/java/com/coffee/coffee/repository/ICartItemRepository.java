package com.coffee.coffee.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.coffee.coffee.models.CartItem;
import com.coffee.coffee.models.Coffee;
import com.coffee.coffee.models.User;

public interface ICartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUser(User user);

    void deleteByUser(User user);

    Optional<CartItem> findByCoffeeAndUser(Coffee coffee, User user);

}

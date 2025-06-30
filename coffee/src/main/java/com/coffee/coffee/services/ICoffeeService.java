package com.coffee.coffee.services;

import java.util.List;
import com.coffee.coffee.models.Coffee;

public interface ICoffeeService {
    
    List<Coffee> getAllCoffees();
    Coffee getCoffeeById(Long id);
    Coffee createCoffee(Coffee coffee);
    void deleteCoffee(Long id);
    boolean exist(Long id);
    Coffee updateCoffee(Long id, Coffee coffee);
    Coffee updateFeaturedStatus(Long id, boolean featured);

}

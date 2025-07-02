package com.coffee.coffee.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import com.coffee.coffee.models.Coffee;
import com.coffee.coffee.repository.ICoffeeRepository;

@Service
public class CoffeeServiceImpl implements ICoffeeService {

     @Autowired
     ICoffeeRepository coffeeRepository;

    @Override
    public List<Coffee> getAllCoffees() {
         List<Coffee> coffees = new ArrayList<Coffee>();
         coffees = coffeeRepository.findAll();
         return coffees;  
    }

    @Override
    public Coffee getCoffeeById(Long id) {
         Coffee coffee = coffeeRepository.findById(id).get();
         return coffee;
    }

    @Override
    public Coffee createCoffee(Coffee coffee) {
         return coffeeRepository.save(coffee);
    }

    @Override
    public void deleteCoffee(Long id) {
         coffeeRepository.deleteById(id);
    }

    @Override
    public boolean exist(Long id) {
          return coffeeRepository.existsById(id);
    }

     @Override
    public Coffee updateCoffee(Long id, Coffee coffee) {
         return coffeeRepository.save(coffee);
    }

    @Override
    public Coffee updateFeaturedStatus(Long id, boolean featured) {
        Coffee coffee = getCoffeeById(id);
        if (coffee == null) {
            return null;
        }
        coffee.setFeatured(featured);
        return coffeeRepository.save(coffee);
    }

    @Override
     public List<Coffee> getFeaturedCoffees() {
          return coffeeRepository.findByFeaturedTrue();
     }

    

}

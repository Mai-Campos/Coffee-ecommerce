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
     ICoffeeRepository iCoffeeRepository;

    @Override
    public List<Coffee> getAllCoffees() {
         List<Coffee> coffees = new ArrayList<Coffee>();
         coffees = iCoffeeRepository.findAll();
         return coffees;  
    }

    @Override
    public Coffee getCoffeeById(Long id) {
         Coffee coffee = iCoffeeRepository.findById(id).get();
         return coffee;
    }

    @Override
    public Coffee createCoffee(Coffee coffee) {
         return iCoffeeRepository.save(coffee);
    }

    @Override
    public void deleteCoffee(Long id) {
         iCoffeeRepository.deleteById(id);
    }

    @Override
    public boolean exist(Long id) {
          return iCoffeeRepository.existsById(id);
    }

     @Override
    public Coffee updateCoffee(Long id, Coffee coffee) {
         return iCoffeeRepository.save(coffee);
    }
    

}

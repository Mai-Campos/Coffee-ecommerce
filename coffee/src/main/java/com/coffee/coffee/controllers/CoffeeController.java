package com.coffee.coffee.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.coffee.coffee.models.Coffee;
import com.coffee.coffee.services.ICoffeeService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {

    @Autowired
    ICoffeeService iCoffeeService;

    @GetMapping("/")
    public ResponseEntity<List<Coffee>> getCoffee() {
        List<Coffee> coffees = iCoffeeService.getAllCoffees();

        if (!coffees.isEmpty()) {
            return ResponseEntity.ok(coffees);
            
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }

    @GetMapping("/{coffeeId}")
    public ResponseEntity<Coffee> getCoffeeById(@PathVariable Long id) {

         Coffee coffee = iCoffeeService.getCoffeeById(id);
        if (coffee != null) {
            return ResponseEntity.ok(coffee);
     
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @PostMapping("/")
    public ResponseEntity<Coffee> saveCoffee(@RequestBody Coffee coffee) {
        return ResponseEntity.ok(iCoffeeService.createCoffee(coffee));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @DeleteMapping("/{coffeeId}")
    public ResponseEntity<Void> deleteCoffee(@PathVariable Long id) {

        if (!iCoffeeService.exist(id)) {
              return ResponseEntity.notFound().build();
        }else{
            iCoffeeService.deleteCoffee(id);
            return ResponseEntity.noContent().build();
        }
       
    }

}

package com.coffee.coffee.controllers;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.coffee.coffee.models.Coffee;
import com.coffee.coffee.services.CloudinaryService;
import com.coffee.coffee.services.ICoffeeService;
import com.coffee.util.dto.FeaturedDTO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/coffee")
public class CoffeeController {

    @Autowired
    ICoffeeService iCoffeeService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<List<Coffee>> getCoffee() {
        List<Coffee> coffees = iCoffeeService.getAllCoffees();

        if (!coffees.isEmpty()) {
            return ResponseEntity.ok(coffees);
            
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Coffee> getCoffeeById(@PathVariable Long id) {

        
         Coffee coffee = iCoffeeService.getCoffeeById(id);
        if (coffee != null) {
            return ResponseEntity.ok(coffee);
     
        }else{
            return ResponseEntity.notFound().build();
        }
        
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Coffee> saveCoffee(
        @RequestParam  String name,
        @RequestParam String description,
        @RequestParam  Double price,
        @RequestParam String recipe,
        @RequestParam MultipartFile img
    ) {
        try {
            String imageUrl = cloudinaryService.uploadFile(img);

            Coffee coffee = new Coffee();
            coffee.setName(name);
            coffee.setPrice(price);
            coffee.setRecipe(recipe);
            coffee.setDescription(description);
            coffee.setImageUrl(imageUrl); // asegúrate de tener este campo en tu entidad

            Coffee saved = iCoffeeService.createCoffee(coffee);
            return ResponseEntity.ok(saved);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoffee(@PathVariable Long id) {

        if (!iCoffeeService.exist(id)) {
              return ResponseEntity.notFound().build();
        }else{
            iCoffeeService.deleteCoffee(id);
            return ResponseEntity.noContent().build();
        }
       
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Coffee> updateCoffee(@PathVariable Long id, @RequestParam String name, @RequestParam String description, @RequestParam Double price, @RequestParam String recipe, @RequestParam(required = false) MultipartFile img) {
        if (!iCoffeeService.exist(id)) {
            return ResponseEntity.notFound().build();
        }

        try {
            Coffee existing = iCoffeeService.getCoffeeById(id); 

            existing.setName(name);
            existing.setDescription(description);
            existing.setPrice(price);
            existing.setRecipe(recipe);

            if (img != null && !img.isEmpty()) {
                String imageUrl = cloudinaryService.uploadFile(img);
                existing.setImageUrl(imageUrl);
            }

            Coffee updated = iCoffeeService.updateCoffee(id, existing);
            return ResponseEntity.ok(updated);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @PatchMapping("/{id}/featured")
    public ResponseEntity<Coffee> updateFeaturedStatus( @PathVariable Long id, @RequestBody FeaturedDTO body) {
        Coffee updated = iCoffeeService.updateFeaturedStatus(id, body.featured);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Coffee>> getFeaturedCoffees() {
        List<Coffee> featuredCoffees = iCoffeeService.getFeaturedCoffees();

        if (!featuredCoffees.isEmpty()) {
            return ResponseEntity.ok(featuredCoffees);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

}

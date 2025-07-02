package com.coffee.coffee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.coffee.coffee.models.Coffee;

@Repository
public interface ICoffeeRepository extends JpaRepository<Coffee, Long> {
    Coffee findByName(String name);
    Coffee findByDescription(String description);
    Coffee findByImageUrl(String imageUrl);
    Coffee findByPrice(double price);
    Coffee findByRecipe(String recipe);
    List<Coffee> findByFeaturedTrue();
}

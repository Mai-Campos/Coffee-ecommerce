package com.coffee.coffee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffee.coffee.models.Role;

public interface IRolRespository extends JpaRepository<Role, Long> {
   
}

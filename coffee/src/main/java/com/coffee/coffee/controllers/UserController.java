package com.coffee.coffee.controllers;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.coffee.coffee.models.User;
import com.coffee.coffee.services.IUserService;
import com.coffee.util.dto.AuthenticationRequest;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    @Qualifier("clientService")
    private IUserService clientService;

    @Autowired
    @Qualifier("employeeService")
    private IUserService employeeService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getEmployees() {
        List<User> users = employeeService.getUsers();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(users);
    }

 
   
    @PostMapping("/register")
    public ResponseEntity<?> registerClient(@RequestBody AuthenticationRequest request) {
       try {
            clientService.createUser(request.getUsername(), request.getPassword(), request.getEmail());
            return ResponseEntity.ok("Cliente registrado correctamente");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody AuthenticationRequest request) {
        employeeService.createUser(request.getUsername(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok("Empleado creado correctamente");
    }
}

package com.coffee.coffee.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.coffee.coffee.models.User;
import com.coffee.coffee.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/users")
public class UserController {
 
   @Autowired
     IUserService iUserService;


    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userID) {
       User user = iUserService.getUserById(userID);
      if(user != null){
          return ResponseEntity.notFound().build();
      }else{
        return ResponseEntity.ok(user);
      }
   }

    @PostMapping("/client")
    public ResponseEntity<User> createClient(@RequestBody User client) {
        
        return ResponseEntity.ok(iUserService.createClient(client));
    }

    @PostMapping("/employee")
    public ResponseEntity<User> createAdmin(@RequestBody User employee) {
       
        return ResponseEntity.ok(iUserService.createEmployee(employee));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
      if (iUserService.userExist(userId)) {
            iUserService.deleteUser(userId);
        return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
         
      }
        
    }
    


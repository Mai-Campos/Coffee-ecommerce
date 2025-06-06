package com.coffee.coffee.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coffee.coffee.models.Role;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IRoleRespository;
import com.coffee.coffee.repository.IUserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service("employeeService")
public class EmployeeService implements IUserService {

    @Autowired
    private IUserRepository userRepository;
    
    @Autowired
    private IRoleRespository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getUsers(){
        List<User> users = new ArrayList<User>();
        users = userRepository.findAll();
        return users;
    }


    @Override
    public User createUser(String username, String email, String password) {
        if (userRepository.existsByUserName(username)) {
            throw new RuntimeException("El usuario ya existe");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("El usuario con el email especificado ya existe");
        }
       
        Role employeeRole = roleRepository.findByName("ROLE_EMPLOYEE")
                .orElseThrow(() -> new RuntimeException("ROLE_EMPLOYEE no encontrado"));

        User user = new User();
        user.setUserName(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of(employeeRole));

        return userRepository.save(user);
    }
}

package com.coffee.coffee.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.coffee.coffee.models.Role;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IRoleRespository;
import com.coffee.coffee.repository.IUserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service("clientService")
public class ClientServiceImpl implements IUserService {

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
    public User createUser(String username, String password, String email) {
        if (userRepository.existsByUserName(username)) {
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de usuario ya existe");
        }
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El correo electrónico ya está registrado");
        }

        Role clientRole = roleRepository.findByName("ROLE_CLIENT")
                .orElseThrow(() -> new RuntimeException("ROLE_CLIENT no encontrado"));

        User user = new User();
        user.setUserName(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of(clientRole));

        return userRepository.save(user);
    }
}

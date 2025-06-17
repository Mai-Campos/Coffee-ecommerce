package com.coffee.coffee.controllers;

import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.coffee.coffee.models.Role;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IUserRepository;
import com.coffee.coffee.services.IAuthService;
import com.coffee.util.dto.AuthenticationRequest;
import com.coffee.util.dto.AuthenticationResponse;
import com.coffee.util.dto.UserDto;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication auth) {
        String username = auth.getName(); 

        User user = userRepository.findByUserName(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        Set<String> roleNames = user.getRoles().stream()
            .map(Role::getName)
            .collect(Collectors.toSet());

        UserDto dto = new UserDto(user.getId(),user.getUsername(), roleNames);

        return ResponseEntity.ok(dto);
    }
}

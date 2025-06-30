package com.coffee.coffee.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.coffee.coffee.security.CustomUserDetailService;
import com.coffee.coffee.security.JwtService;
import com.coffee.util.dto.AuthenticationRequest;
import com.coffee.util.dto.AuthenticationResponse;

@Service
public class AuthServiceImpl implements IAuthService {

    @Autowired
    private  AuthenticationManager authenticationManager;

    @Autowired
    private  JwtService jwtService;

    @Autowired
    private  CustomUserDetailService userDetailsService;

    
    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );

            UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
            String jwtToken = jwtService.generateToken(user);

            return new AuthenticationResponse(jwtToken);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }
    }
}

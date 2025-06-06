package com.coffee.util.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {

    private String username;
    private String password;
    private String email;
}

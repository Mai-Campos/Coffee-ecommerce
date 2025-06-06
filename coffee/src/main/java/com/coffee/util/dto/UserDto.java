package com.coffee.util.dto;

import java.util.Set;


public class UserDto {
    private String userName;
    private Set<String> roles;

    public UserDto(String userName, Set<String> roles) {
        this.userName = userName;
        this.roles = roles;
    }

    // Getters
    public String getUserName() {
        return userName;
    }

    public Set<String> getRoles() {
        return roles;
    }
}

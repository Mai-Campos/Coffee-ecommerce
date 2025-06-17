package com.coffee.util.dto;

import java.util.Set;


public class UserDto {
    private Long id;
    private String userName;
    private Set<String> roles;

    public UserDto(Long id, String userName, Set<String> roles) {
        this.userName = userName;
        this.roles = roles;
        this.id = id;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public Set<String> getRoles() {
        return roles;
    }
}

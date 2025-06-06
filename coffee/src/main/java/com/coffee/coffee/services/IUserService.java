package com.coffee.coffee.services;

import java.util.List;
import com.coffee.coffee.models.User;

public interface IUserService {

    User createUser(String username, String email, String password );
    List<User> getUsers();
}

package com.coffee.coffee.services;

import java.util.List;
import com.coffee.coffee.models.User;

public interface IUserService {

    List<User> getAllUsers();
    User getUserById(Long id);
    User createClient(User client);
    User createEmployee(User employee);
    void deleteUser(Long id);
    boolean userExist(Long id);
}

package com.coffee.coffee.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    IUserRepository iUserRepository;

    @Override
    public List<User> getAllUsers() {
       List<User> users = new ArrayList<User>();
       users = iUserRepository.findAll();
       return users;
    }

    @Override
    public User getUserById(Long id) {
        
        User user = iUserRepository.findById(id).get();
        return user;
    }

    @Override
    public User createClient(User client) {
        
        return iUserRepository.save(client);
    }

    @Override
    public User createEmployee(User employee) {
        
        return iUserRepository.save(employee);
    }

    @Override
    public void deleteUser(Long id) {
         iUserRepository.deleteById(id);
    }

    @Override
    public boolean userExist(Long id) {
        return iUserRepository.existsById(id);
    }
}

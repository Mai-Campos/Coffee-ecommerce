package com.coffee.coffee.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IUserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService{

    @Autowired
    private IUserRepository userRepository;

   @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return user;  
    }
}

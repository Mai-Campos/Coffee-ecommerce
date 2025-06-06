package com.coffee.coffee.config;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.coffee.coffee.models.Role;
import com.coffee.coffee.models.User;
import com.coffee.coffee.repository.IRoleRespository;
import com.coffee.coffee.repository.IUserRepository;
import jakarta.annotation.PostConstruct;


@Component
public class DataInitializer {

    @Autowired
    private  IUserRepository userRepository;

    @Autowired
    private  IRoleRespository iRoleRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    

    @PostConstruct
    public void init() {
        
        if (iRoleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            iRoleRepository.save(new Role("ROLE_ADMIN"));
        }
        if (iRoleRepository.findByName("ROLE_EMPLOYEE").isEmpty()) {
            iRoleRepository.save(new Role("ROLE_EMPLOYEE"));
        }
        if (iRoleRepository.findByName("ROLE_CLIENT").isEmpty()) {
            iRoleRepository.save(new Role("ROLE_CLIENT"));
        }

        
        if (userRepository.findByUserName("admin").isEmpty()) {
            Role adminRole = iRoleRepository.findByName("ROLE_ADMIN").get();
            User admin = new User();
            admin.setUserName("admin");
            admin.setPassword(passwordEncoder.encode("Admin.123")); 
            admin.setEmail("root@gmail.com");
            admin.setRoles(Set.of(adminRole));
            userRepository.save(admin);
        }
    }
}

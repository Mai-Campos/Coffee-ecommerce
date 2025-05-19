package com.coffee.coffee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffee.coffee.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
    User findByEmail(String email);
    User findByUserNameAndPassword(String userName, String password);
    User findByEmailAndPassword(String email, String password);

}

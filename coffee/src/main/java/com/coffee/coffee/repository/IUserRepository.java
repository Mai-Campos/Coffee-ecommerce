package com.coffee.coffee.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.coffee.coffee.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);
    Optional<User> findByEmail(String email);
    Optional<User> findByUserNameAndPassword(String userName, String password);
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByUserName(String username);
    boolean existsByEmail(String email);

}

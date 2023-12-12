package com.example.back.repository;
import com.example.back.model.NewUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<NewUser, Long> {
    NewUser findByUsername(String username);
    boolean existsNewUserByUsername(String username);
}

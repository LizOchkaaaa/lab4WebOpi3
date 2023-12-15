package com.example.back.repository;

import com.example.back.model.NewUser;
import com.example.back.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckAreaRepository extends JpaRepository<Result, Long> {
    List<Result> findAllByUser(NewUser user);

    void deleteByUser(NewUser user);
}

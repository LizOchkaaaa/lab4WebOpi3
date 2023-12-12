package com.example.back.repository;

import com.example.back.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckAreaRepository extends JpaRepository<Result, Long> {
}

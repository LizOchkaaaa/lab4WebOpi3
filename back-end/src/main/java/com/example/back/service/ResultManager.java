package com.example.back.service;

import com.example.back.dto.ResultsDto;
import com.example.back.model.NewUser;
import com.example.back.model.Result;
import com.example.back.repository.CheckAreaRepository;
import com.example.back.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
@Service
public class ResultManager {
    private final UserRepository userRepository;
    private final CheckAreaRepository checkAreaRepository;

    public ResultManager(UserRepository userRepository, CheckAreaRepository checkAreaRepository, CheckArea check) {
        this.userRepository = userRepository;
        this.checkAreaRepository = checkAreaRepository;

    }

    public Result addHit(ResultsDto resultsDto,String username , Timestamp startTime) {
        CheckArea checkArea = new CheckArea();
        Long start = System.currentTimeMillis();
        Result results = new Result();
        if(checkArea.validate(resultsDto.getX() , resultsDto.getY() , resultsDto.getR())) {
            results.setX(resultsDto.getX());
            results.setY(resultsDto.getY());
            results.setR(resultsDto.getR());
            results.setResultArea(CheckArea.check(results.getX(), results.getY(), results.getR()));
            results.setUser(userRepository.findByUsername(username));
            results.setTimeScript(System.currentTimeMillis() - start);
            results.setTime(startTime);
            checkAreaRepository.save(results);
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NO validation");
        }
        return results;
    }

    public List<Result> getHits(String name) {
        NewUser user = userRepository.findByUsername(name);
        List<Result> hits =  checkAreaRepository.findAllByUser(user);
        Collections.reverse(hits);
        return hits;
    }

}

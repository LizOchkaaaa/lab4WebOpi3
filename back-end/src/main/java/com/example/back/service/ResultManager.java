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

    public List<Result> getHits() {
        List<Result> hits =  checkAreaRepository.findAll();
        Collections.reverse(hits);
        return hits;
    }
    public String check(String authorization) {
        if (!authorization.startsWith("Basic"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization header");

        String login, password;

        try {
            String base64 = authorization.substring(6);
            String[] credentials = new String(Base64.getDecoder().decode(base64)).split(":", 2);
            if (credentials.length < 2)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization header");
            login = credentials[0];
            password = credentials[1];
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid base64");
        }

        NewUser user = userRepository.findByUsername(login);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login");
        }

        if (!getHash(password).equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        return user.getUsername();
    }

    public String getHash(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());

            StringBuilder hexBuilder = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexBuilder.append('0');
                hexBuilder.append(hex);
            }
            return hexBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}

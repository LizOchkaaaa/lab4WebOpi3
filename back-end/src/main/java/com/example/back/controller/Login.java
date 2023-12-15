package com.example.back.controller;
import com.example.back.dto.UserDto;
import com.example.back.repository.UserRepository;
import com.example.back.security.JwtTokenUtil;
import com.example.back.service.ResultManager;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class Login {
    private final ResultManager resultManager;
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public Login(ResultManager resultManager, UserService userService, UserRepository userRepository) {
        this.resultManager = resultManager;
        this.userService = userService;
        this.userRepository = userRepository;
    }
    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<List<String>> newUser(@RequestBody UserDto newUser) {
        ArrayList<String> errors = validateUsername(newUser.getUsername());
        errors.addAll(validatePassword(newUser.getPassword()));
        if (errors.isEmpty()) {
            userService.create(newUser.getUsername(), newUser.getPassword());
            return new ResponseEntity<>( HttpStatus.CREATED );
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) {

        return userService.authenticate(userDto);
    }
    @CrossOrigin
    @GetMapping("/authorization")
    public ResponseEntity<String> authorization(){
        return new ResponseEntity<>("Successful", HttpStatus.OK);
    }

    private ArrayList<String> validateUsername(String username) {
        ArrayList<String> usernameErrors = new ArrayList<>();
        if (username != null) {
            if (userRepository.existsNewUserByUsername(username)) {
                usernameErrors.add("Пользователь с таким логином уже существует");
            }
            else if (!username.matches("\\w{4,}")) {
                usernameErrors.add(username + "неправильно, попробуйте еще раз");
            }
        } else {
            usernameErrors.add("Необходим логин");
        }
        return usernameErrors;
    }

    private ArrayList<String> validatePassword(String password) {
        ArrayList<String> passErrors = new ArrayList<>();
        if (password != null) {
            if (password.length() < 4) {
                passErrors.add("Пароль должен быть более чем из 4 символов");
            }
        } else {
            passErrors.add("Необходим пароль");
        }
        return passErrors;
    }

}

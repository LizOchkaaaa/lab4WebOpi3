package com.example.back.controller;

import com.example.back.dto.ResultsDto;
import com.example.back.model.Result;
import com.example.back.service.ResultManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping( "/hits")
public class CheckAreaController {
    private final ResultManager resultManager;
    public CheckAreaController(ResultManager resultManager){

        this.resultManager = resultManager;
    }

    @PostMapping
    public Result add(@RequestBody ResultsDto resultsDto, @RequestAttribute Timestamp startTime,@RequestAttribute Authentication authorization) {
        return resultManager.addHit(resultsDto, authorization.getName() , startTime);
    }

    @GetMapping
    public List<Result> getHits(@RequestAttribute Authentication authorization) {

        return  resultManager.getHits(authorization.getName());
    }

}
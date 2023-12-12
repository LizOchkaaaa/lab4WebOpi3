package com.example.back.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "results")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Result implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Double x;
    @Column
    private Double y;
    @Column
    private Double r;
    @Column
    private boolean resultArea;
    @Column
    private Timestamp time;
    @Column
    private long timeScript;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private NewUser user;
}

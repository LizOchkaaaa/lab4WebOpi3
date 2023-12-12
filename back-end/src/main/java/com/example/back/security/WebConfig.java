package com.example.back.security;
import com.example.back.dsl.CustomDsl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebConfig  {

    private final UserDetailsService userDetails;
    private final PasswordEncoder passwordEncoder;
    private final CustomDsl dsl;

    @Autowired
    public WebConfig(UserDetailsService userDetails, PasswordEncoder passwordEncoder, CustomDsl dsl) {
        this.userDetails = userDetails;
        this.passwordEncoder = passwordEncoder;
        this.dsl = dsl;

    }

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity http) throws Exception {
        http.cors().disable().csrf().disable()
                        .authorizeHttpRequests(auth -> auth
                                .antMatchers("/",
                                        "/favicon.png",
                                        "/static/**",
                                        "/**/*.json",
                                        "/**/*.html")
                                .permitAll()
                                .antMatchers("/register").permitAll()
                                .anyRequest().authenticated()
                        )
                .httpBasic().authenticationEntryPoint((request, response, authException) -> response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase()));
        http.addFilterAfter(new TimeFilter(), BasicAuthenticationFilter.class);
        http.apply(dsl);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(final AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(userDetails).passwordEncoder(passwordEncoder);
    }
}
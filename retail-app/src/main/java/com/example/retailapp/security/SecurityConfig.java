package com.example.retailapp.security;

import com.example.retailapp.service.UserInfoService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    //used for authenticating the user from a class that inherits UserDetailsService
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserInfoService userInfoService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userInfoService); //set user service
        auth.setPasswordEncoder(passwordEncoder()); //set password encoder
        return auth;
    }
    //filter chain used for securing the endpoints depending on role
    //not all of them may have been used
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers(HttpMethod.GET, "/api/users").hasRole("DEVELOPER")
                        .requestMatchers(HttpMethod.GET, "/api/users/{username}").hasRole("DEVELOPER")
                        .requestMatchers(HttpMethod.PUT, "/api/users/{username}").hasRole("DEVELOPER")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/{username}").hasRole("DEVELOPER")
                        .requestMatchers(HttpMethod.POST, "/api/users/dev").hasRole("DEVELOPER")
                        .requestMatchers(HttpMethod.POST, "/api/users/client").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/users/manager").hasRole("DEVELOPER")
                        .requestMatchers(HttpMethod.POST,"/api/users/login").permitAll()
                        //request matchers for products
                        .requestMatchers(HttpMethod.GET, "/store/products").permitAll()
                        .requestMatchers(HttpMethod.POST, "/store/products").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "/store/products/{id}").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "/store/products/{id}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/store/products/{id}/stock/decrease/{amount}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/store/products/{id}/stock/increase/{amount}").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/store/products/{id}/name/{name}").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/store/products/{id}/price/{amount}").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/store/products/{id}/category/{category}").hasRole("MANAGER")
                        //request matchers for orders
                        .requestMatchers(HttpMethod.GET, "/orders").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.POST, "/orders").hasRole("CLIENT")
                        .requestMatchers(HttpMethod.POST, "/orders/files").hasRole("CLIENT")
                        .requestMatchers(HttpMethod.GET, "/orders/files/{user}/{filename}").permitAll()
                        .requestMatchers(HttpMethod.PUT,  "/orders/{id}/{status}").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/users/{username}/orders").hasRole("CLIENT")
                        .requestMatchers(HttpMethod.GET, "/api/users/{username}/orders").hasRole("CLIENT")
        );
        // use HTTP Basic authentication
        http.httpBasic(Customizer.withDefaults());

        // disable Cross Site Request Forgery (CSRF)
        // in general, not required for stateless REST APIs that use POST, PUT, DELETE, and/or PATCH
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

    //https://docs.spring.io/spring-security/reference/reactive/integrations/cors.html
    // and
    // https://reflectoring.io/spring-cors/
    // and
    // https://www.youtube.com/watch?v=HRwlT_etr60
    //were used for help
    //configures CORS for allowing communication between the API and localhost:4200 (Angular APP)
    //Allows for GET, POST, DELETE, and Put
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "DELETE", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

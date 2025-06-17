package com.coffee.coffee.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailService userDetailsService;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, CustomUserDetailService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable()) // Deshabilita CORS si solo accedes localmente
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/login","/users/register/**","/index.html","/cart.html","/contact-us.html","/details-coffee.html", "/create-account.html","/create-employee.html","coffees-admin.html","/add-coffee.html","orders-admin.html",  "/login.html", "/styles/**","/unauthorized.html", "/scripts/**", "/img/**", "/static/**", "/edit-coffee.html/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/coffee/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/coffee/**").hasAnyRole("EMPLOYEE", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/coffee/**").hasAnyRole("EMPLOYEE", "ADMIN")
                .requestMatchers(HttpMethod.POST ,"/employees/**").hasRole("ADMIN")
                .requestMatchers("/orders/**").hasAnyRole("EMPLOYEE", "ADMIN")
                .requestMatchers("/auth/me").authenticated()
                .anyRequest().authenticated()
            )
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .authenticationProvider(authenticationProvider());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

}

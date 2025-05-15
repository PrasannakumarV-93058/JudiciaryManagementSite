package com.fsad.JudiciaryManagementSiteBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.fsad.JudiciaryManagementSiteBackend.Repository")
public class JudiciaryManagementSiteBackendApplicationTests {
    public static void main(String[] args) {
        SpringApplication.run(JudiciaryManagementSiteBackendApplication.class, args);
    }
}
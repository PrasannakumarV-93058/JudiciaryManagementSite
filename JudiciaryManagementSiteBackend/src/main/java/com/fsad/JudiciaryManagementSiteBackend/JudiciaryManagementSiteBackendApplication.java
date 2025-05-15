package com.fsad.JudiciaryManagementSiteBackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;

@EnableMethodSecurity
@SpringBootApplication
public class JudiciaryManagementSiteBackendApplication {

	public static void main(String[] args) {
		String rawPassword = "admin123";
		String encodedPassword = "$2a$10$7ahjcVozl5iBTI.B1C5eH.FbsS5fmJRlQGmre.uzXoh.wi6t4jWyq";
		System.out.println(new BCryptPasswordEncoder().matches(rawPassword, encodedPassword));
		
		SpringApplication.run(JudiciaryManagementSiteBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.count() == 0) {
				User firstUser = User.builder()
						.username("admin")
						.password(passwordEncoder.encode("admin123")) // Encrypt the password
						.role("ROLE_CLERK")
						.build();
				userRepository.save(firstUser);
				System.out.println("First user added to the database: " + firstUser.getUsername());
			}
		};
	}
}

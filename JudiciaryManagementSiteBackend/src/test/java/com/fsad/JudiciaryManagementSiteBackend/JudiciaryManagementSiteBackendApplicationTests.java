package com.fsad.JudiciaryManagementSiteBackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

import java.io.PrintStream;
import java.io.ByteArrayOutputStream;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class JudiciaryManagementSiteBackendApplicationTests {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JudiciaryManagementSiteBackendApplication application;

    @BeforeEach
    public void setup() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = new BCryptPasswordEncoder();
        application = new JudiciaryManagementSiteBackendApplication();
    }

    @Test
    public void testPasswordEncoder_matches() {
        String rawPassword = "admin123";
        // This encoded password is from your main method example
        String encodedPassword = "$2a$10$7ahjcVozl5iBTI.B1C5eH.FbsS5fmJRlQGmre.uzXoh.wi6t4jWyq";

        assertTrue(passwordEncoder.matches(rawPassword, encodedPassword));
    }

    @Test
    public void testInitDatabase_createsUser_whenRepositoryIsEmpty() throws Exception {
        // Simulate empty repository
        when(userRepository.count()).thenReturn(0L);

        CommandLineRunner runner = application.initDatabase(userRepository, passwordEncoder);

        runner.run(); // execute CommandLineRunner

        // Verify save is called once with a User whose username is "admin"
        verify(userRepository, times(1)).save(argThat(user -> user.getUsername().equals("admin")
                && user.getRole().equals("ROLE_CLERK")
                && passwordEncoder.matches("admin123", user.getPassword())));
    }

    @Test
    public void testInitDatabase_doesNotCreateUser_whenRepositoryNotEmpty() throws Exception {
        // Simulate non-empty repository
        when(userRepository.count()).thenReturn(5L);

        CommandLineRunner runner = application.initDatabase(userRepository, passwordEncoder);

        runner.run(); // execute CommandLineRunner

        // Verify save is never called
        verify(userRepository, never()).save(any(User.class));
    }

        @Test
    public void testMain_printsPasswordMatchAndRunsApp() {
        // Capture console output
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        System.setOut(new PrintStream(outContent));

        // Mock SpringApplication.run to prevent starting Spring Boot context
        try (MockedStatic<SpringApplication> mockedSpringApp = Mockito.mockStatic(SpringApplication.class)) {
            mockedSpringApp.when(() -> SpringApplication.run(JudiciaryManagementSiteBackendApplication.class, new String[] {}))
                           .thenReturn(null);

            // Call main method
            JudiciaryManagementSiteBackendApplication.main(new String[] {});

            // Verify printed output contains "true" because password matches
            String output = outContent.toString().trim();
            assertTrue(output.contains("true"), "Expected output to contain 'true'");

            // Verify SpringApplication.run was called exactly once
            mockedSpringApp.verify(() -> SpringApplication.run(JudiciaryManagementSiteBackendApplication.class, new String[] {}), Mockito.times(1));
        } finally {
            // Restore System.out
            System.setOut(originalOut);
        }
    }
}

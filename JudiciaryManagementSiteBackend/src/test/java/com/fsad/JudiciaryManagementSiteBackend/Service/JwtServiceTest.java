package com.fsad.JudiciaryManagementSiteBackend.Service;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
    }

    @Test
    void testGenerateTokenAndValidate() {
        User user = new User();
        user.setUsername("testUser");
        user.setRole("ADMIN");

        String token = jwtService.generateToken(user);
        assertNotNull(token, "Token should not be null");

        boolean isValid = jwtService.isValidToken(token);
        assertTrue(isValid, "Token should be valid");

        String usernameFromToken = jwtService.getUsernameFromToken(token);
        assertEquals("testUser", usernameFromToken, "Username from token should match");
    }

    @Test
    void testIsValidTokenWithInvalidToken() {
        String invalidToken = "invalid.token.string";

        boolean isValid = jwtService.isValidToken(invalidToken);
        assertFalse(isValid, "Invalid token should be recognized as invalid");
    }

    @Test
    void testGetUsernameFromTokenWithInvalidToken() {
        String invalidToken = "invalid.token.string";

        // Parsing an invalid token throws an exception. We expect that behavior.
        assertThrows(Exception.class, () -> {
            jwtService.getUsernameFromToken(invalidToken);
        });
    }
}

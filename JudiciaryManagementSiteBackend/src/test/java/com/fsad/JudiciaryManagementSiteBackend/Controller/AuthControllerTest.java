package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.LoginRequest;
import com.fsad.JudiciaryManagementSiteBackend.DTO.LoginResponse;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import com.fsad.JudiciaryManagementSiteBackend.Service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_Success() {
        // Given
        LoginRequest request = new LoginRequest("testuser", "password");
        User user = new User();
        user.setUsername("testuser");

        Authentication authResult = mock(Authentication.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authResult);

        when(userRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(user));

        when(jwtService.generateToken(user))
                .thenReturn("mock-jwt-token");

        // When
        ResponseEntity<LoginResponse> response = authController.login(request);

        // Then
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("mock-jwt-token", response.getBody().getToken());
    }

    @Test
    void testLogin_InvalidCredentials() {
        // Given
        LoginRequest request = new LoginRequest("invaliduser", "wrongpassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        // When
        ResponseEntity<LoginResponse> response = authController.login(request);

        // Then
        assertEquals(401, response.getStatusCodeValue());
        assertTrue(response.getBody().getToken().contains("Login failed"));
    }

    @Test
    void testLogin_UserNotFoundAfterAuth() {
        // Given
        LoginRequest request = new LoginRequest("ghost", "validpass");

        Authentication authResult = mock(Authentication.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authResult);

        when(userRepository.findByUsername("ghost"))
                .thenReturn(Optional.empty());

        // When
        ResponseEntity<LoginResponse> response = authController.login(request);

        // Then
        assertEquals(401, response.getStatusCodeValue());
        assertTrue(response.getBody().getToken().contains("Login failed"));
    }
}

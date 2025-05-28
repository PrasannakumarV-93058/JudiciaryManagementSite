package com.fsad.JudiciaryManagementSiteBackend.Service;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        userService = new UserService();

        // Inject mock UserRepository using reflection (no setter)
        try {
            var field = UserService.class.getDeclaredField("userRepository");
            field.setAccessible(true);
            field.set(userService, userRepository);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void testAddOrUpdateJudge() {
        User judge = User.builder()
                .id(1)
                .username("judge1")
                .role("ROLE_JUDGE")
                .password("password")
                .build();

        when(userRepository.save(judge)).thenReturn(judge);

        User result = userService.addOrUpdateJudge(judge);

        assertNotNull(result);
        assertEquals("judge1", result.getUsername());
        verify(userRepository, times(1)).save(judge);
    }

    @Test
    void testAddOrUpdateLawyer() {
        User lawyer = User.builder()
                .id(2)
                .username("lawyer1")
                .role("LAWYER")
                .password("password")
                .build();

        when(userRepository.save(lawyer)).thenReturn(lawyer);

        User result = userService.addOrUpdateLawyer(lawyer);

        assertNotNull(result);
        assertEquals("lawyer1", result.getUsername());
        verify(userRepository, times(1)).save(lawyer);
    }

    @Test
    void testLoadUserByUsername_withRolePrefixed() {
        User userEntity = User.builder()
                .username("user1")
                .password("secret")
                .role("ROLE_ADMIN")
                .build();

        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(userEntity));

        UserDetails userDetails = userService.loadUserByUsername("user1");

        assertNotNull(userDetails);
        assertEquals("user1", userDetails.getUsername());
        assertEquals("secret", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")));
    }

    @Test
    void testLoadUserByUsername_withoutRolePrefix() {
        User userEntity = User.builder()
                .username("user2")
                .password("secret2")
                .role("USER")
                .build();

        when(userRepository.findByUsername("user2")).thenReturn(Optional.of(userEntity));

        UserDetails userDetails = userService.loadUserByUsername("user2");

        assertNotNull(userDetails);
        assertEquals("user2", userDetails.getUsername());
        assertEquals("secret2", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_USER")));
    }

    @Test
    void testLoadUserByUsername_userNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername("nonexistent");
        });

        assertEquals("User not found with username: nonexistent", exception.getMessage());
    }
}

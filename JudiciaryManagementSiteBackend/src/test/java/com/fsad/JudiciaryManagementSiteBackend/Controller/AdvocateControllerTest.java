package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Advocate;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.AdvocateRepository;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import com.fsad.JudiciaryManagementSiteBackend.Service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdvocateControllerTest {

    @InjectMocks
    private AdvocateController advocateController;

    @Mock
    private AdvocateRepository advocateRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllAdvocates() {
        List<Advocate> mockAdvocates = List.of(new Advocate(), new Advocate());
        when(advocateRepository.findAll()).thenReturn(mockAdvocates);

        List<Advocate> result = advocateController.getAllAdvocates();
        assertEquals(2, result.size());
    }

    @Test
    void testGetAdvocateById_Found() {
        Advocate advocate = new Advocate();
        when(advocateRepository.findById(1)).thenReturn(Optional.of(advocate));

        Advocate result = advocateController.getAdvocateById(1);
        assertEquals(advocate, result);
    }

    @Test
    void testGetAdvocateById_NotFound() {
        when(advocateRepository.findById(99)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> advocateController.getAdvocateById(99));
        assertEquals("Advocate not found with id 99", ex.getMessage());
    }

    @Test
    void testCreateAdvocate() {
        Advocate advocate = new Advocate();
        when(advocateRepository.save(advocate)).thenReturn(advocate);

        Advocate result = advocateController.createAdvocate(advocate);
        assertEquals(advocate, result);
    }

    @Test
    void testUpdateAdvocate_Found() {
        Advocate existing = new Advocate();
        Advocate updated = new Advocate();
        updated.setExperienceYears(5);
        updated.setCasesWon(10);
        updated.setResult("Won");

        when(advocateRepository.findById(1)).thenReturn(Optional.of(existing));
        when(advocateRepository.save(any(Advocate.class))).thenReturn(updated);

        Advocate result = advocateController.updateAdvocate(1, updated);
        assertEquals(5, result.getExperienceYears());
        assertEquals(10, result.getCasesWon());
        assertEquals("Won", result.getResult());
    }

    @Test
    void testUpdateAdvocate_NotFound() {
        when(advocateRepository.findById(1)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> advocateController.updateAdvocate(1, new Advocate()));
        assertEquals("Advocate not found with id 1", ex.getMessage());
    }

    @Test
    void testDeleteAdvocate() {
        doNothing().when(advocateRepository).deleteById(1);
        advocateController.deleteAdvocate(1);
        verify(advocateRepository, times(1)).deleteById(1);
    }

    @Test
    void testRegister_NewUser() {
        User user = new User();
        user.setUsername("testuser");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(userRepository.save(user)).thenReturn(user);

        ResponseEntity<User> response = advocateController.register(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(user, response.getBody());
    }

    @Test
    void testRegister_UsernameTaken() {
        User user = new User();
        user.setUsername("takenuser");

        when(userRepository.findByUsername("takenuser")).thenReturn(Optional.of(new User()));

        ResponseEntity<User> response = advocateController.register(user);
        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    void testLogin_Success() {
        User user = new User();
        user.setUsername("loginuser");

        when(userRepository.findByUsername("loginuser")).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("mock-token");

        ResponseEntity<String> response = advocateController.login("loginuser", "password");
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("Token: mock-token"));
    }

    @Test
    void testLogin_UserNotFound() {
        when(userRepository.findByUsername("nouser")).thenReturn(Optional.empty());

        ResponseEntity<String> response = advocateController.login("nouser", "password");
        assertEquals(404, response.getStatusCodeValue());
        assertEquals("User not found", response.getBody());
    }
}

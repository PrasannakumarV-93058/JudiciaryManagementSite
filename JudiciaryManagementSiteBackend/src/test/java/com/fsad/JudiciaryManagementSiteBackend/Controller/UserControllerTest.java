package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.IdFetchDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserController userController;

    private User sampleUser;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        sampleUser = new User();
        sampleUser.setId(1);
        sampleUser.setFullName("John Doe");
        sampleUser.setRole("LAWYER");
        sampleUser.setEmail("john@example.com");
        sampleUser.setPassword("password123");
    }

    // ------------------------------
    // Test getDisplayRole helper method
    // ------------------------------
    @Test
    public void testGetDisplayRole() throws Exception {
        var method = UserController.class.getDeclaredMethod("getDisplayRole", String.class);
        method.setAccessible(true);

        assertEquals("ADVOCATE", method.invoke(userController, "LAWYER"));
        assertEquals("ADVOCATE", method.invoke(userController, "prosecutor"));
        assertEquals("CLIENT", method.invoke(userController, "PLAINTIFF"));
        assertEquals("CLIENT", method.invoke(userController, "opponent"));
        assertEquals("JUDGE", method.invoke(userController, "JUDGE"));
        assertEquals("ADMIN", method.invoke(userController, "ADMIN"));
    }

    // ------------------------------
    // Test getUsersByRole
    // ------------------------------
    @Test
    public void testGetUsersByRole() {
        when(userRepository.findByRoleIgnoreCase("lawyer")).thenReturn(List.of(sampleUser));

        List<IdFetchDTO> result = userController.getUsersByRole("lawyer");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(sampleUser.getId(), result.get(0).getId());
        assertEquals(sampleUser.getFullName(), result.get(0).getFullName());
        verify(userRepository, times(1)).findByRoleIgnoreCase("lawyer");
    }

    // ------------------------------
    // Test getAllUsersForDisplay
    // ------------------------------
    @Test
    public void testGetAllUsersForDisplay() {
        when(userRepository.findAll()).thenReturn(List.of(sampleUser));

        List<UserDisplayDTO> result = userController.getAllUsersForDisplay();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(sampleUser.getId(), result.get(0).getId());
        assertEquals("ADVOCATE", result.get(0).getRole());
    }

    // ------------------------------
    // Test getUserById - found
    // ------------------------------
    @Test
    public void testGetUserById_Found() {
        when(userRepository.findById(1)).thenReturn(Optional.of(sampleUser));

        ResponseEntity<UserDisplayDTO> response = userController.getUserById(1);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("ADVOCATE", response.getBody().getRole());
        verify(userRepository, times(1)).findById(1);
    }

    // ------------------------------
    // Test getUserById - not found
    // ------------------------------
    @Test
    public void testGetUserById_NotFound() {
        when(userRepository.findById(2)).thenReturn(Optional.empty());

        ResponseEntity<UserDisplayDTO> response = userController.getUserById(2);

        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
        verify(userRepository, times(1)).findById(2);
    }

    // ------------------------------
    // Test createUser (password encoding)
    // ------------------------------
    @Test
    public void testCreateUser_EncodesPassword() {
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        User inputUser = new User();
        inputUser.setPassword("rawPassword");

        User savedUser = userController.createUser(inputUser);

        assertEquals("encodedPassword", savedUser.getPassword());
        verify(passwordEncoder, times(1)).encode("rawPassword");
        verify(userRepository, times(1)).save(savedUser);
    }

    // ------------------------------
    // Test updateUser - found
    // ------------------------------
    @Test
    public void testUpdateUser_Found() {
        User updatedUser = new User();
        updatedUser.setFullName("Updated Name");

        when(userRepository.findById(1)).thenReturn(Optional.of(sampleUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        ResponseEntity<User> response = userController.updateUser(1, updatedUser);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(updatedUser, response.getBody());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(updatedUser);
        assertEquals(1, updatedUser.getId());
    }

    // ------------------------------
    // Test updateUser - not found
    // ------------------------------
    @Test
    public void testUpdateUser_NotFound() {
        User updatedUser = new User();

        when(userRepository.findById(99)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.updateUser(99, updatedUser);

        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
        verify(userRepository, times(1)).findById(99);
        verify(userRepository, never()).save(any());
    }

    // ------------------------------
    // Test deleteUser - found
    // ------------------------------
    @Test
    public void testDeleteUser_Found() {
        when(userRepository.findById(1)).thenReturn(Optional.of(sampleUser));
        doNothing().when(userRepository).delete(sampleUser);

        ResponseEntity<Void> response = userController.deleteUser(1);

        assertEquals(204, response.getStatusCodeValue());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).delete(sampleUser);
    }

    // ------------------------------
    // Test deleteUser - not found
    // ------------------------------
    @Test
    public void testDeleteUser_NotFound() {
        when(userRepository.findById(99)).thenReturn(Optional.empty());

        ResponseEntity<Void> response = userController.deleteUser(99);

        assertEquals(404, response.getStatusCodeValue());
        verify(userRepository, times(1)).findById(99);
        verify(userRepository, never()).delete(any());
    }
}

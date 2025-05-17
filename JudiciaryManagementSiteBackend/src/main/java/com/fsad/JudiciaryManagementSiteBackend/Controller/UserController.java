package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	private String getDisplayRole(String role) {
		return switch (role.toUpperCase()) {
			case "LAWYER", "PROSECUTOR" -> "ADVOCATE";
			case "PLAINTIFF", "OPPONENT" -> "CLIENT";
			default -> role.toUpperCase();
		};
	}

	@PreAuthorize("hasRole('CLERK')")
	@Operation(summary = "Get all users for display with unified roles")
	@GetMapping("/display")
	public List<UserDisplayDTO> getAllUsersForDisplay() {
		return userRepository.findAll().stream()
				.map(user -> new UserDisplayDTO(
						user.getId(),
						user.getFullName(),
						getDisplayRole(user.getRole()),
						user.getEmail()
				))
				.collect(Collectors.toList());
	}

	@PreAuthorize("hasRole('CLERK')")
	@Operation(summary = "Get user by ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "User found"),
			@ApiResponse(responseCode = "404", description = "User not found")
	})
	@GetMapping("/{id}")
	public ResponseEntity<UserDisplayDTO> getUserById(@PathVariable Integer id) {
		return userRepository.findById(id)
				.map(user -> new UserDisplayDTO(
						user.getId(),
						user.getFullName(),
						getDisplayRole(user.getRole()),
						user.getEmail()
				))
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}



	@Operation(summary = "Create new user")
	@PostMapping("/register")
	public User createUser(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword())); // Always encode before saving
		return userRepository.save(user);
	}


	@Operation(summary = "Update user by ID")
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
		return userRepository.findById(id).map(user -> {
			updatedUser.setId(id);
			return ResponseEntity.ok(userRepository.save(updatedUser));
		}).orElse(ResponseEntity.notFound().build());
	}


	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
		return userRepository.findById(id).map(user -> {
			userRepository.delete(user);
			return ResponseEntity.noContent().<Void>build();
		}).orElse(ResponseEntity.notFound().build());
	}

}

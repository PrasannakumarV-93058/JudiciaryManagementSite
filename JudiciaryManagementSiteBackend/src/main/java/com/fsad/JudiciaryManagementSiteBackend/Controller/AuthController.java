package com.fsad.JudiciaryManagementSiteBackend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsad.JudiciaryManagementSiteBackend.DTO.LoginResponse;
import com.fsad.JudiciaryManagementSiteBackend.DTO.LoginRequest;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import com.fsad.JudiciaryManagementSiteBackend.Service.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	private final UserRepository userRepository;

	public AuthController(AuthenticationManager authenticationManager,
						  JwtService jwtService,
						  UserRepository userRepository) {
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		this.userRepository = userRepository;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
		System.out.println("Login request received: " + request.getUsername());
		System.out.println("Password: " + request.getPassword());

		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
			);

			User user = userRepository.findByUsername(request.getUsername())
					.orElseThrow(() -> new UsernameNotFoundException("User not found"));

			String token = jwtService.generateToken(user);
			return ResponseEntity.ok(new LoginResponse(token));
		} catch (Exception e) {
			e.printStackTrace(); // 🔥 This shows the actual root exception
			return ResponseEntity.status(401).body(new LoginResponse("Login failed: " + e.getMessage()));
		}
	}

}


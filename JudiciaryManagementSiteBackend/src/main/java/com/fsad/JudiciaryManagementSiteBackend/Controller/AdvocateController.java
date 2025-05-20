package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Advocate;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.AdvocateRepository;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import com.fsad.JudiciaryManagementSiteBackend.Service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/advocates")
@Tag(name = "Advocate Controller", description = "CRUD APIs for Advocate entity")
public class AdvocateController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AdvocateRepository advocateRepository;

	// @Autowired
	// private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtService jwtService;

	@GetMapping
	@Operation(summary = "Get all advocates")
	public List<Advocate> getAllAdvocates() {
		return advocateRepository.findAll();
	}

	@GetMapping("/{id}")
	@Operation(summary = "Get advocate by ID")
	public Advocate getAdvocateById(@PathVariable Integer id) {
		return advocateRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Advocate not found with id " + id));
	}

	@PostMapping
	@Operation(summary = "Create a new advocate")
	public Advocate createAdvocate(@RequestBody Advocate advocate) {
		return advocateRepository.save(advocate);
	}

	@PutMapping("/{id}")
	@Operation(summary = "Update an advocate by ID")
	public Advocate updateAdvocate(@PathVariable Integer id, @RequestBody Advocate updatedAdvocate) {
		Advocate advocate = advocateRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Advocate not found with id " + id));

	
		advocate.setCourtCase(updatedAdvocate.getCourtCase());
		advocate.setClient(updatedAdvocate.getClient());
		advocate.setExperienceYears(updatedAdvocate.getExperienceYears());
		advocate.setCasesWon(updatedAdvocate.getCasesWon());
		advocate.setResult(updatedAdvocate.getResult());
		advocate.setCurrentCaseStatus(updatedAdvocate.getCurrentCaseStatus());

		return advocateRepository.save(advocate);
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Delete an advocate by ID")
	public void deleteAdvocate(@PathVariable Integer id) {
		advocateRepository.deleteById(id);
	}

	@PostMapping("/register")
	@Operation(summary = "Register a new user")
	public ResponseEntity<User> register(@RequestBody User user) {
		if (userRepository.findByUsername(user.getUsername()).isPresent()) {
			return ResponseEntity.badRequest().body(null); // Username already taken
		}
		// user.setPassword(passwordEncoder.encode(user.getPassword()));
		return ResponseEntity.ok(userRepository.save(user));
	}

	@PostMapping("/login")
	@Operation(summary = "Login with username and password")
	public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
		return userRepository.findByUsername(username)
				.map(user -> {
					// if (passwordEncoder.matches(password, user.getPassword())) {
						// Generate a JWT token upon successful login
						String token = jwtService.generateToken(user);
						return ResponseEntity.ok("Login successful! Token: " + token);
					// } else {
					// 	return ResponseEntity.status(401).body("Invalid credentials");
					// }
				})
				.orElse(ResponseEntity.status(404).body("User not found"));
	}
}

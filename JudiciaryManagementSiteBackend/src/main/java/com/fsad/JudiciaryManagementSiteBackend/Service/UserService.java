package com.fsad.JudiciaryManagementSiteBackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;  // Spring Security User
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	// Method to add or update a judge
	public com.fsad.JudiciaryManagementSiteBackend.Entity.User addOrUpdateJudge(com.fsad.JudiciaryManagementSiteBackend.Entity.User judge) {
		return userRepository.save(judge); // Assuming save will add or update
	}

	// Method to add or update a lawyer
	public com.fsad.JudiciaryManagementSiteBackend.Entity.User addOrUpdateLawyer(com.fsad.JudiciaryManagementSiteBackend.Entity.User lawyer) {
		return userRepository.save(lawyer); // Assuming save will add or update
	}

	// Overriding loadUserByUsername to load user details for authentication
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.fsad.JudiciaryManagementSiteBackend.Entity.User userEntity = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

		// Ensure roles are not double-prefixed with 'ROLE_'
		String role = userEntity.getRole().startsWith("ROLE_") ? userEntity.getRole().substring(5) : userEntity.getRole();

		return User.builder()
				.username(userEntity.getUsername())
				.password(userEntity.getPassword()) // Ensure password matches the encoder
				.roles(role) // Correctly set roles without double prefixing
				.build();
	}

}

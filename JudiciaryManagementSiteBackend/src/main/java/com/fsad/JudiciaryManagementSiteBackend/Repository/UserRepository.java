package com.fsad.JudiciaryManagementSiteBackend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	// Custom query to find a user by username
	Optional<User> findByUsername(String username);

}

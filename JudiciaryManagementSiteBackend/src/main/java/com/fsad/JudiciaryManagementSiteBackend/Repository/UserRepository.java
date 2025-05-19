package com.fsad.JudiciaryManagementSiteBackend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fsad.JudiciaryManagementSiteBackend.DTO.IdFetchDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	// Custom query to find a user by username
	Optional<User> findByUsername(String username);

	@Query("SELECT u FROM User u WHERE UPPER(u.role) = UPPER(:role)")
	List<User> findByRoleIgnoreCase(@Param("role") String role);

}

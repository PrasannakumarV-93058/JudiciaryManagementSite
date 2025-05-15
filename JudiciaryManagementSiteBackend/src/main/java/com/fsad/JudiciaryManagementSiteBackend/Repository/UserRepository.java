package com.fsad.JudiciaryManagementSiteBackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}

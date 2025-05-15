package com.fsad.JudiciaryManagementSiteBackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping
	public User saveUser(@RequestBody User user) {
		System.out.println("Saving user: " + user.getFullName());
		return userRepository.save(user);
	}
}


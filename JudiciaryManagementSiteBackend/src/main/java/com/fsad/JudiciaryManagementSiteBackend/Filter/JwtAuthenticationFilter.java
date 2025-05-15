package com.fsad.JudiciaryManagementSiteBackend.Filter;

import com.fsad.JudiciaryManagementSiteBackend.Service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;

	public JwtAuthenticationFilter(JwtService jwtService) {
		this.jwtService = jwtService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String token = getJwtFromRequest(request);

		if (token != null && jwtService.isValidToken(token)) {
			String username = jwtService.getUsernameFromToken(token);
			// Here you can optionally fetch user details and roles if required.
			// UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					username, null, null // You can add authorities here if needed
			);
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			// Set the authentication in the SecurityContextHolder
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} else {
			// Optionally add logic to respond with an error if the token is invalid
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}

		// Always continue with the filter chain
		filterChain.doFilter(request, response);
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			return header.substring(7); // Remove "Bearer " prefix
		}
		return null;
	}
}

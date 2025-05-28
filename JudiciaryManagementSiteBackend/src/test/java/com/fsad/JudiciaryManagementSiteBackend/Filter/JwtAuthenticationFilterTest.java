package com.fsad.JudiciaryManagementSiteBackend.Filter;

import com.fsad.JudiciaryManagementSiteBackend.Service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtAuthenticationFilterTest {

    private JwtService jwtService;
    private JwtAuthenticationFilter filter;
    private FilterChain filterChain;
    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    @BeforeEach
    void setUp() {
        jwtService = mock(JwtService.class);
        filter = new JwtAuthenticationFilter(jwtService);
        filterChain = mock(FilterChain.class);
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        SecurityContextHolder.clearContext();
    }

    @Test
    void shouldBypassFilterForSwaggerAndLoginEndpoints() throws ServletException, IOException {
        String[] paths = {
                "/swagger-ui/index.html", "/v3/api-docs", "/swagger-resources", "/swagger-ui.html", "/api/auth/login"
        };

        for (String path : paths) {
            request.setServletPath(path);

            filter.doFilterInternal(request, response, filterChain);

            verify(filterChain, times(1)).doFilter(request, response);
            reset(filterChain);
        }
    }

    @Test
    void shouldAuthenticateWithValidToken() throws ServletException, IOException {
        request.setServletPath("/api/secure");
        request.addHeader("Authorization", "Bearer validToken");

        when(jwtService.isValidToken("validToken")).thenReturn(true);
        when(jwtService.getUsernameFromToken("validToken")).thenReturn("testUser");

        filter.doFilterInternal(request, response, filterChain);

        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals("testUser", SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        WebAuthenticationDetails details = (WebAuthenticationDetails) SecurityContextHolder
                .getContext().getAuthentication().getDetails();
        assertEquals(request.getRemoteAddr(), details.getRemoteAddress());

        verify(filterChain).doFilter(request, response);
    }

    @Test
    void shouldRejectInvalidToken() throws ServletException, IOException {
        request.setServletPath("/api/secure");
        request.addHeader("Authorization", "Bearer invalidToken");

        when(jwtService.isValidToken("invalidToken")).thenReturn(false);

        filter.doFilterInternal(request, response, filterChain);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());
        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain, never()).doFilter(request, response);
    }

    @Test
    void shouldHandleMissingTokenGracefully() throws ServletException, IOException {
        request.setServletPath("/api/secure");
        // No Authorization header

        filter.doFilterInternal(request, response, filterChain);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());
        assertNull(SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain, never()).doFilter(request, response);
    }
}

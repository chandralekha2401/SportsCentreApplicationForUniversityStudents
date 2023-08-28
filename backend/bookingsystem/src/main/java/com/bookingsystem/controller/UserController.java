package com.bookingsystem.controller;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bookingsystem.config.JwtTokenUtil;
import com.bookingsystem.model.CourseDto;
import com.bookingsystem.model.UserDto;
import com.bookingsystem.service.JwtUserDetailsService;
import com.bookingsystem.service.UserService;

import io.jsonwebtoken.Jwt;
@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public ResponseEntity<?> greeting(HttpServletRequest request) {
    	final String requestTokenHeader = request.getHeader("Authorization");
    	String token = requestTokenHeader.substring(7);
    	final String username = jwtTokenUtil.getUsernameFromToken(token);
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
    
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<?> getUserId(HttpServletRequest request) {
    	final String userId = request.getParameter("uid");
        return ResponseEntity.ok(userService.getUserByUserId(Long.parseLong(userId)));
    }
    
    @RequestMapping(value = "/user/email", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByEmail(HttpServletRequest request) {
    	final String email = request.getParameter("email");
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }
    
    @RequestMapping(value = "/user/password", method = RequestMethod.POST)
    public ResponseEntity<?> updatePasswordByEmail(@RequestBody UserDto user) {
    	final String email = user.getEmail();
    	final String password = user.getPassword();
        return ResponseEntity.ok(userService.updatePasswordByEmail(email,password));
    }
    
}
package com.bookingsystem.controller;

import com.bookingsystem.config.JwtTokenUtil;
import com.bookingsystem.model.JwtRequest;
import com.bookingsystem.model.JwtResponse;
import com.bookingsystem.model.ManagementDto;
import com.bookingsystem.model.UserDto;
import com.bookingsystem.service.JwtUserDetailsService;
import com.bookingsystem.service.UserService;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUserName(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserName());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDto user) throws Exception {
		user.setCreationDate(new Date());
		ManagementDto mdto = new ManagementDto();
		mdto.setUniversityId(user.getUniversityId());
		mdto.setEmail(user.getEmail());
		
		boolean isValid = userService.isCombinationValid(mdto);
		boolean isDuplicate = userService.isDuplicate(mdto);
		
		if (isValid && isDuplicate==false) {
			return ResponseEntity.ok(userDetailsService.save(user));
        } else {
            return ResponseEntity.badRequest().body("Combination is invalid or already exists.");
        }
		
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}

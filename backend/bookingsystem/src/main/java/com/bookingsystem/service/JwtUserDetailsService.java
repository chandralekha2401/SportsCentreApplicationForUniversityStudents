package com.bookingsystem.service;

import com.bookingsystem.model.UserDao;
import com.bookingsystem.model.UserDto;
import com.bookingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserDao user = userDao.findByUserName(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
				new ArrayList<>());
	}

	public UserDao save(UserDto user) {
		UserDao newUser = new UserDao();
		newUser.setUserName(user.getUserName());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		
		newUser.setEmail(user.getEmail());
		newUser.setRole(user.getRole());
		newUser.setUniversityId(user.getUniversityId());
		
		newUser.setCreatedBy(user.getCreatedBy());
		newUser.setCreationDate(user.getCreationDate());
		newUser.setUpdatedBy(user.getUpdatedBy());
		newUser.setUpdationDate(user.getUpdationDate());
		
		return userDao.save(newUser);
	}
}
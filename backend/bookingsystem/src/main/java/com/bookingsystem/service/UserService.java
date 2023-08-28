package com.bookingsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookingsystem.model.ManagementDto;
import com.bookingsystem.model.UserDao;
import com.bookingsystem.repository.ManagementRepository;
import com.bookingsystem.repository.UserRepository;

@Service
public class UserService  {
	@Autowired
	private UserRepository userDao;
	
	 @Autowired
	    private ManagementRepository managementDao;
	 
	@Autowired
		private PasswordEncoder bcryptEncoder;
	
	public UserDao getUserByUsername(String username) {
		UserDao user = userDao.findByUserName(username);
		return user;
	}

	public UserDao getUserByUserId(long uid) {
		UserDao user = userDao.findByUserId(uid);
		return user;
	}
	
	public UserDao getUserByEmail(String email) {
		UserDao user = userDao.findByEmail(email);
		return user;
	}
	
	public UserDao updatePasswordByEmail(String email,String password)  {
		UserDao user = userDao.findByEmail(email);
		user.setPassword(bcryptEncoder.encode(password));
		
		return userDao.save(user);
	}
	
	public boolean isCombinationValid(ManagementDto dto) {

        return managementDao.findByUniversityIdAndEmail(dto.getUniversityId(), dto.getEmail()) != null;
    }
	
	public boolean isDuplicate(ManagementDto dto) {

        return userDao.findByuniversityIdAndEmail(dto.getUniversityId(), dto.getEmail()) != null;
    }
	
}

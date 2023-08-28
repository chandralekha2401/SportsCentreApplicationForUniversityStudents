package com.bookingsystem.repository;
import com.bookingsystem.model.UserDao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
public interface UserRepository extends CrudRepository<UserDao, Long> {
    UserDao findByUserName(String username);
    UserDao findByUserId(long uid);
	List<UserDao> findByUserIdIn(List<Long> userIds);
	UserDao findByuniversityIdAndEmail(Integer universityId, String email);
	UserDao findByEmail(String email);
}
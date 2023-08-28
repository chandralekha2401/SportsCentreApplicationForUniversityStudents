package com.bookingsystem.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.bookingsystem.model.CourseDao;

public interface CourseRepository extends CrudRepository<CourseDao,Long>{
	
	CourseDao findByCourseName(String courseName);
	
	
}

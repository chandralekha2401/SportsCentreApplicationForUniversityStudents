package com.bookingsystem.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.bookingsystem.model.CourseInstructorMappingDao;

public interface CourseInstructorMappingRepository extends CrudRepository<CourseInstructorMappingDao,Long>{

	List<CourseInstructorMappingDao> findByUserId(long userId);
	
	@Query("SELECT cim FROM CourseInstructorMappingDao cim WHERE cim.classDateTime > :currentDate AND cim.userId = :userId ORDER BY cim.classDateTime ASC")
	List<CourseInstructorMappingDao> findByUserIdAndBookingDateGreaterThan(@Param("currentDate") Date currentDate, @Param("userId") long userId);
	
	
}
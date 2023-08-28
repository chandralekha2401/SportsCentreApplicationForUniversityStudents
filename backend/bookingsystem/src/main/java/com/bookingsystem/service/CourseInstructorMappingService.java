package com.bookingsystem.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookingsystem.model.CourseInstructorMappingDao;
import com.bookingsystem.model.CourseInstructorMappingDto;
import com.bookingsystem.repository.CourseInstructorMappingRepository;


@Service
public class CourseInstructorMappingService {

	@Autowired
	private CourseInstructorMappingRepository courseInstructorMappingDao;
	
	public Optional<CourseInstructorMappingDao> getByCInsMapId(long cInsMap)
	{
		Optional<CourseInstructorMappingDao> courseInsMapDao = courseInstructorMappingDao.findById(cInsMap);
		return courseInsMapDao;
	}
	
	public List<CourseInstructorMappingDao> getAllCInsMap()
	{
		List<CourseInstructorMappingDao> listCInsMap= (List<CourseInstructorMappingDao>) courseInstructorMappingDao.findAll();
		return listCInsMap;
	}
	
	public CourseInstructorMappingDao save(CourseInstructorMappingDto courseInstructorMapping) {
		CourseInstructorMappingDao newCourseInstructorMapping = new CourseInstructorMappingDao();
		newCourseInstructorMapping.setClassDateTime(courseInstructorMapping.getClassDateTime());
		newCourseInstructorMapping.setEffectiveDate(courseInstructorMapping.getEffectiveDate());
		newCourseInstructorMapping.setExpiryDate(courseInstructorMapping.getExpiryDate());
		newCourseInstructorMapping.setCreationDate(courseInstructorMapping.getCreationDate());
		newCourseInstructorMapping.setUpdationDate(courseInstructorMapping.getUpdationDate());
		newCourseInstructorMapping.setCreatedBy(courseInstructorMapping.getCreatedBy());
	    newCourseInstructorMapping.setUpdatedBy(courseInstructorMapping.getUpdatedBy());
		newCourseInstructorMapping.setCourseId(courseInstructorMapping.getCourseId());
		newCourseInstructorMapping.setUserId(courseInstructorMapping.getUserId());
		newCourseInstructorMapping.setVenueId(courseInstructorMapping.getVenueId());
		newCourseInstructorMapping.setClassStrength(courseInstructorMapping.getClassStrength());
		return courseInstructorMappingDao.save(newCourseInstructorMapping);
	}

	public Optional<CourseInstructorMappingDao> delete(long cInsMap ) {
		Optional<CourseInstructorMappingDao>  cIMDao= courseInstructorMappingDao.findById(cInsMap);
		courseInstructorMappingDao.deleteById(cInsMap);
		return cIMDao;
	}

	public CourseInstructorMappingDao update(CourseInstructorMappingDao cInsMapDao) {
		
		return courseInstructorMappingDao.save(cInsMapDao);
	}

	public List<CourseInstructorMappingDao> getAllCInsMapByBookingDateGreaterThanAndUserId(Date date, long userId) {
		List<CourseInstructorMappingDao> courseInsMapDao = courseInstructorMappingDao.findByUserIdAndBookingDateGreaterThan(date,userId);
		return courseInsMapDao;
	}

	public List<CourseInstructorMappingDao> getAllCInsMapByUserId(long userId) {
		List<CourseInstructorMappingDao> courseInsMapDao = courseInstructorMappingDao.findByUserId(userId);
		return courseInsMapDao;
	}
	
	
}

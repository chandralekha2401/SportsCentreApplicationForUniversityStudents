package com.bookingsystem.service;

import org.springframework.stereotype.Service;

import com.bookingsystem.model.CourseDao;
import com.bookingsystem.model.CourseDto;
import com.bookingsystem.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class CourseService {
	@Autowired
	private CourseRepository courseDao;
	
	public CourseDao getCourseByCoursename(String coursename) throws UsernameNotFoundException {
		CourseDao course = courseDao.findByCourseName(coursename);
		if(course==null)
		{
			course = new CourseDao();
		}
		return course;
	}
	
	public List<CourseDao> getAllCourses() throws UsernameNotFoundException {
		List<CourseDao> course = (List<CourseDao>) courseDao.findAll();
		
		return course;
	}
	
	public CourseDao save(CourseDto course) {
		CourseDao newCourse = new CourseDao();
		newCourse.setCourseName(course.getCourseName());
		newCourse.setCourseDesc(course.getCourseDesc());
		newCourse.setCoursePrice(course.getCoursePrice());
		newCourse.setCreatedBy(course.getCreatedBy());
		newCourse.setUpdatedBy(course.getUpdatedBy());
		newCourse.setCreationDate(course.getCreationDate());
		newCourse.setUpdationDate(course.getUpdationDate());
		return courseDao.save(newCourse);
	}
	
	public CourseDao update(CourseDao course) {
		CourseDao newCourse = new CourseDao();
		newCourse.setCourseId(course.getCourseId());
		newCourse.setCourseName(course.getCourseName());
		newCourse.setCourseDesc(course.getCourseDesc());
		newCourse.setCoursePrice(course.getCoursePrice());
		newCourse.setCreatedBy(course.getCreatedBy());
		newCourse.setUpdatedBy(course.getUpdatedBy());
		newCourse.setCreationDate(course.getCreationDate());
		newCourse.setUpdationDate(course.getUpdationDate());
		return courseDao.save(newCourse);
	}
	
	public Optional<CourseDao> delete(Long courseId) {
		Optional<CourseDao> deletedCourse = courseDao.findById(courseId);
		 courseDao.deleteById(courseId);
		 return deletedCourse;
	}

}

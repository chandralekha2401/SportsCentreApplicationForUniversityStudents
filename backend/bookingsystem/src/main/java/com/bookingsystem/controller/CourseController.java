package com.bookingsystem.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bookingsystem.model.CourseDao;
import com.bookingsystem.model.CourseDto;
import com.bookingsystem.model.UserDto;
import com.bookingsystem.service.CourseService;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class CourseController {

	@Autowired
	private CourseService courseService;
	
	@RequestMapping(value = "/course", method = RequestMethod.GET)
    public ResponseEntity<?> getCourses(HttpServletRequest request) {
		final String courseName = request.getParameter("cname");
        return ResponseEntity.ok(courseService.getCourseByCoursename(courseName));
    }
	
	@RequestMapping(value = "/course/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCourses(HttpServletRequest request) {
        return ResponseEntity.ok(courseService.getAllCourses());
    }
	
	@RequestMapping(value = "/course/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveCourse(@RequestBody CourseDto course) throws Exception {
		course.setCreationDate(new Date());
		return ResponseEntity.ok(courseService.save(course));
	}
	
	@RequestMapping(value = "/course/update", method = RequestMethod.POST)
	public ResponseEntity<?> UpdateCourse(@RequestBody CourseDao course) throws Exception {
		course.setUpdationDate(new Date());
		course.setUpdatedBy("system");
		return ResponseEntity.ok(courseService.update(course));
	}
	
	@RequestMapping(value = "/course/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteCourses(HttpServletRequest request) {
		final Long courseId = Long.parseLong(request.getParameter("cid"));
        return ResponseEntity.ok(courseService.delete(courseId));
    }
}

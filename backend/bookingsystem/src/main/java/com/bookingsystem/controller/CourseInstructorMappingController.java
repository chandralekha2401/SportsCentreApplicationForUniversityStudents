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

import com.bookingsystem.model.CourseInstructorMappingDao;
import com.bookingsystem.model.CourseInstructorMappingDto;
import com.bookingsystem.service.CourseInstructorMappingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class CourseInstructorMappingController {
	
	@Autowired
	private CourseInstructorMappingService cInsMapService;
	
	@RequestMapping(value = "/cinsmap/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCInsMaps(HttpServletRequest request) {
        return ResponseEntity.ok(cInsMapService.getAllCInsMap());
    }
	
	@RequestMapping(value = "/cinsmap/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveCInsMap(@RequestBody CourseInstructorMappingDto cInsMapDto) throws Exception {
		cInsMapDto.setCreationDate(new Date());
		cInsMapDto.setEffectiveDate(new Date());
		cInsMapDto.setExpiryDate(cInsMapDto.getClassDateTime());
		cInsMapDto.setIsCancel(false);
		return ResponseEntity.ok(cInsMapService.save(cInsMapDto));
	}
	
	@RequestMapping(value = "/cinsmap", method = RequestMethod.GET)
    public ResponseEntity<?> getCInsMap(HttpServletRequest request) {
		final String cimid = request.getParameter("cimid");
        return ResponseEntity.ok(cInsMapService.getByCInsMapId(Long.parseLong(cimid)));
    }
	
	@RequestMapping(value = "/cinsmap/userid/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCInsMapsByUserId(HttpServletRequest request) {
		final String userId = request.getParameter("userid");
		final String greaterThanCurrentDate = request.getParameter("currentdate");
		if(greaterThanCurrentDate!=null && greaterThanCurrentDate.equalsIgnoreCase("true"))
		{
			return ResponseEntity.ok(cInsMapService.getAllCInsMapByBookingDateGreaterThanAndUserId(new Date(),Long.parseLong(userId)));
		}
		else
		{
			return ResponseEntity.ok(cInsMapService.getAllCInsMapByUserId(Long.parseLong(userId)));
		}
        
    }

	
	@RequestMapping(value = "/cinsmap/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteCInsMap(HttpServletRequest request) {
		final String cimid = request.getParameter("cimid");
		return ResponseEntity.ok(cInsMapService.delete(Long.parseLong(cimid)));
	}
	
	@RequestMapping(value = "/cinsmap/update", method = RequestMethod.POST)
	public ResponseEntity<?> updateCInsMap(@RequestBody CourseInstructorMappingDao cInsMapDto) throws Exception {
		cInsMapDto.setUpdationDate(new Date());
		return ResponseEntity.ok(cInsMapService.update(cInsMapDto));
	}
}

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

import com.bookingsystem.model.CourseInstructorMappingDto;
import com.bookingsystem.model.StudentCourseMappingDao;
import com.bookingsystem.model.StudentCourseMappingDto;
import com.bookingsystem.service.CourseInstructorMappingService;
import com.bookingsystem.service.StudentCourseMappingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class StudentCourseMappingController {
	
	@Autowired
	private StudentCourseMappingService sCMapService;
	
	@RequestMapping(value = "/scmap/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCInsMaps(HttpServletRequest request) {
        return ResponseEntity.ok(sCMapService.getAllSCMap());
    }
	
	@RequestMapping(value = "/scmap/userid/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCInsMapsByUserId(HttpServletRequest request) {
		final String userId = request.getParameter("userid");
		final String greaterThanCurrentDate = request.getParameter("currentdate");
		if(greaterThanCurrentDate!=null && greaterThanCurrentDate.equalsIgnoreCase("true"))
		{
			return ResponseEntity.ok(sCMapService.getAllSCMapByBookingDateGreaterThanAndUserId(new Date(),Long.parseLong(userId)));
		}
		else
		{
			return ResponseEntity.ok(sCMapService.getAllSCMapByUserId(Long.parseLong(userId)));
		}
        
    }
	
	@RequestMapping(value = "/scmap/insname/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCInsMapsByInsName(HttpServletRequest request) {
		final String insname = request.getParameter("insname");
		final String greaterThanCurrentDate = request.getParameter("currentdate");
		if(greaterThanCurrentDate!=null && greaterThanCurrentDate.equalsIgnoreCase("true"))
		{
			return ResponseEntity.ok(sCMapService.getAllSCMapByBookingDateGreaterThanAndInsName(new Date(),insname));
		}
		else
		{
			return ResponseEntity.ok(sCMapService.getAllSCMapByInsName(insname));
		}
        
    }
	
	@RequestMapping(value = "/scmap/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveCInsMap(@RequestBody StudentCourseMappingDto sCMapDto) throws Exception {
		sCMapDto.setCreationDate(new Date());
		return ResponseEntity.ok(sCMapService.save(sCMapDto));
	}
	
	@RequestMapping(value = "/scmap", method = RequestMethod.GET)
    public ResponseEntity<?> getCInsMap(HttpServletRequest request) {
		final String scmid = request.getParameter("scmid");
        return ResponseEntity.ok(sCMapService.getBySCMapId(Long.parseLong(scmid)));
    }
	
	@RequestMapping(value = "/scmap/cimid", method = RequestMethod.GET)
    public ResponseEntity<?> getSCMap(HttpServletRequest request) {
		final String cimid = request.getParameter("cimid");
        return ResponseEntity.ok(sCMapService.getAllSCMapByCimId(Long.parseLong(cimid)));
    }
	
	@RequestMapping(value = "/scmap/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteCInsMap(HttpServletRequest request) {
		final String scmid = request.getParameter("scmid");
		return ResponseEntity.ok(sCMapService.delete(Long.parseLong(scmid)));
	}
	
	@RequestMapping(value = "/scmap/update", method = RequestMethod.POST)
    public ResponseEntity<?> updateCInsMap(@RequestBody StudentCourseMappingDao sCMapDao) {
		sCMapDao.setUpdationDate(new Date());
		return ResponseEntity.ok(sCMapService.update(sCMapDao));
	}
	
	@RequestMapping(value = "/scmap/report", method = RequestMethod.GET)
    public ResponseEntity<?> getAvgRatingsByMonth(HttpServletRequest request) {
		final String month = request.getParameter("month");
		final String year = request.getParameter("year");
        return ResponseEntity.ok(sCMapService.getAvgRatingsByMonth(Long.parseLong(month),Long.parseLong(year)));
    }
	
	@RequestMapping(value = "/scmap/notify/cimid", method = RequestMethod.GET)
    public ResponseEntity<?> getNotifyEmailsByCimId(HttpServletRequest request) {
		final String cimid = request.getParameter("cimid");
        return ResponseEntity.ok(sCMapService.getNotifyEmailsByCimId(Long.parseLong(cimid)));
    }
}

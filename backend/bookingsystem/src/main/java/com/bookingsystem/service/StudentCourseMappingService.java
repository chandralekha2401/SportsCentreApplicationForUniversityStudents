package com.bookingsystem.service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookingsystem.model.StudentCourseMappingDao;
import com.bookingsystem.model.StudentCourseMappingDto;
import com.bookingsystem.model.UserDao;
import com.bookingsystem.repository.StudentCourseMappingRepository;
import com.bookingsystem.repository.UserRepository;


@Service
public class StudentCourseMappingService {

	@Autowired
	private StudentCourseMappingRepository studentCourseMappingDao;
	
	@Autowired
	private UserRepository userDao;
	
	public Optional<StudentCourseMappingDao> getBySCMapId(long sCMap)
	{
		Optional<StudentCourseMappingDao> sCMapDao = studentCourseMappingDao.findById(sCMap);
		return sCMapDao;
	}
	
	public List<StudentCourseMappingDao> getAllSCMap()
	{
		List<StudentCourseMappingDao> listSCMap= (List<StudentCourseMappingDao>) studentCourseMappingDao.findAll();
		return listSCMap;
	}
	
	public StudentCourseMappingDao save(StudentCourseMappingDto studentCourseMapping) {
		StudentCourseMappingDao newStudentCourseMapping = new StudentCourseMappingDao();
		newStudentCourseMapping.setBookingDate(studentCourseMapping.getBookingDate());
		newStudentCourseMapping.setCreationDate(studentCourseMapping.getCreationDate());
		newStudentCourseMapping.setUpdationDate(studentCourseMapping.getUpdationDate());
		newStudentCourseMapping.setCreatedBy(studentCourseMapping.getCreatedBy());
	    newStudentCourseMapping.setUpdatedBy(studentCourseMapping.getUpdatedBy());
		newStudentCourseMapping.setCimId(studentCourseMapping.getCimId());
		newStudentCourseMapping.setUserId(studentCourseMapping.getUserId());
		newStudentCourseMapping.setMarkAttendence(studentCourseMapping.getMarkAttendence());
		newStudentCourseMapping.setRating(studentCourseMapping.getRating());
		newStudentCourseMapping.setComments(studentCourseMapping.getComments());
		newStudentCourseMapping.setcPrice(studentCourseMapping.getcPrice());
		newStudentCourseMapping.setInsName(studentCourseMapping.getInsName());
		newStudentCourseMapping.setCourseName(studentCourseMapping.getCourseName());
		return studentCourseMappingDao.save(newStudentCourseMapping);
	}

	public Optional<StudentCourseMappingDao> delete(long scMap ) {
		Optional<StudentCourseMappingDao>  scMapDao= studentCourseMappingDao.findById(scMap);
		studentCourseMappingDao.deleteById(scMap);
		return scMapDao;
	}

	public List<StudentCourseMappingDao> getAllSCMapByUserId(long userId) {
		
		List<StudentCourseMappingDao> listSCMap= (List<StudentCourseMappingDao>) studentCourseMappingDao.findAllByUserId(userId);
		return listSCMap;
		
	}

	public List<StudentCourseMappingDao> getAllSCMapByInsName(String insname) {
		List<StudentCourseMappingDao> listSCMap= (List<StudentCourseMappingDao>) studentCourseMappingDao.findAllByInsName(insname);
		return listSCMap;
	}

	public StudentCourseMappingDao update(StudentCourseMappingDao sCMapDao) {
		
		return studentCourseMappingDao.save(sCMapDao); 
	}

	public List<StudentCourseMappingDao> getAllSCMapByBookingDateGreaterThanAndUserId(Date date, long userId) {
		List<StudentCourseMappingDao> listSCMap= (List<StudentCourseMappingDao>) studentCourseMappingDao.findByBookingDateGreaterThanAndUserId(date,userId);
		return listSCMap;
	}
	
	public List<StudentCourseMappingDao> getAllSCMapByBookingDateGreaterThanAndInsName(Date date, String insname) {
		List<StudentCourseMappingDao> listSCMap= (List<StudentCourseMappingDao>) studentCourseMappingDao.findByBookingDateGreaterThanAndInsName(date,insname);
		return listSCMap;
	}
	
	public List<StudentCourseMappingDao> getAllSCMapByCimId(long cimId) {
		List<StudentCourseMappingDao> listSCMap= (List<StudentCourseMappingDao>) studentCourseMappingDao.findAllByCimId(cimId);
		return listSCMap;
	}
	
	public String getNotifyEmailsByCimId(long cimId) {
	    List<StudentCourseMappingDao> listSCMap = (List<StudentCourseMappingDao>) studentCourseMappingDao.findAllByCimId(cimId);

	    List<Long> userIds = listSCMap.stream()
	            .map(StudentCourseMappingDao::getUserId)
	            .collect(Collectors.toList());

	    List<UserDao> users = userDao.findByUserIdIn(userIds);

	    String concatenatedEmails = users.stream()
	            .map(UserDao::getEmail)
	            .collect(Collectors.joining(", "));

	    return concatenatedEmails;
	}
	

    public List<StudentCourseMappingDao> getAvgRatingsByMonth(long month, long year) {
    	int intMonth = (int) month;
        int intYear = (int) year;
        
        List<Object[]> resultList = studentCourseMappingDao.findAverageRatingsAndAverageCPriceUsingGroupByMonthAndCourseName(intMonth, intYear);
        List<StudentCourseMappingDao> scMapList = new ArrayList<>();

        for (Object[] result : resultList) {
            StudentCourseMappingDao scMap = new StudentCourseMappingDao();

            System.out.println(result[0]);
            System.out.println(result[1]);
            System.out.println(result[2]);
            System.out.println(result[3]);
            System.out.println(result[4]);
            String courseName = (String) result[0];
            Double averageRating = (Double) result[3];
            Double averageCPrice = (Double) result[4];

            // Set the averageRating and averageCPrice in the scMap object
            scMap.setRating(averageRating.intValue()); // Rounding the averageRating to an integer
            scMap.setcPrice(averageCPrice.intValue());
            scMap.setCourseName(courseName);

            // Add the scMap object to the list
            scMapList.add(scMap);
        }

        return scMapList;
	}
    
	
    
}

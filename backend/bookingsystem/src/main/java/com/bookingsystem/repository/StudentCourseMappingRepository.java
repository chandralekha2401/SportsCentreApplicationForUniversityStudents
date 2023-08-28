package com.bookingsystem.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.bookingsystem.model.StudentCourseMappingDao;
import org.springframework.data.jpa.repository.Query;

public interface StudentCourseMappingRepository extends CrudRepository<StudentCourseMappingDao,Long>{

	List<StudentCourseMappingDao> findAllByUserId(long userId);

	List<StudentCourseMappingDao> findAllByInsName(String insname);
	
	List<StudentCourseMappingDao> findAllByCimId(long cimId);
	
    @Query("SELECT scm FROM StudentCourseMappingDao scm WHERE scm.bookingDate > :currentDate AND scm.userId = :userId ORDER BY scm.bookingDate ASC")
    List<StudentCourseMappingDao> findByBookingDateGreaterThanAndUserId(@Param("currentDate") Date currentDate, @Param("userId") Long userId);
    
    @Query("SELECT scm FROM StudentCourseMappingDao scm WHERE scm.bookingDate > :currentDate AND scm.insName = :insName ORDER BY scm.bookingDate ASC")
    List<StudentCourseMappingDao> findByBookingDateGreaterThanAndInsName(@Param("currentDate") Date currentDate, @Param("insName") String insName);
    
    @Query("SELECT scm.courseName, MONTH(scm.bookingDate) as month, YEAR(scm.bookingDate) as year, "
            + "AVG(COALESCE(scm.rating, 0)) as avgRating, AVG(scm.cPrice) as avgCPrice "
            + "FROM StudentCourseMappingDao scm "
            + "WHERE MONTH(scm.bookingDate) = :month AND YEAR(scm.bookingDate) = :year "
            + "GROUP BY scm.courseName, MONTH(scm.bookingDate), YEAR(scm.bookingDate)")
    List<Object[]> findAverageRatingsAndAverageCPriceUsingGroupByMonthAndCourseName(@Param("month") int month, @Param("year") int year);


	
}
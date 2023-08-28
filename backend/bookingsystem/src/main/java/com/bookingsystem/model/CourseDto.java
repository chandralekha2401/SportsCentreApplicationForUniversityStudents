package com.bookingsystem.model;

import java.util.Date;

public class CourseDto {

	
    private String courseName;
	
	
    private String courseDesc;
	
	
    private Integer coursePrice;
	
    
    private Date creationDate;
    
    
    private Date updationDate;

    
    private String createdBy;
    
    
    private String updatedBy;


	public String getCourseName() {
		return courseName;
	}


	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}


	public String getCourseDesc() {
		return courseDesc;
	}


	public void setCourseDesc(String courseDesc) {
		this.courseDesc = courseDesc;
	}


	public Integer getCoursePrice() {
		return coursePrice;
	}


	public void setCoursePrice(Integer coursePrice) {
		this.coursePrice = coursePrice;
	}


	public Date getCreationDate() {
		return creationDate;
	}


	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}


	public Date getUpdationDate() {
		return updationDate;
	}


	public void setUpdationDate(Date updationDate) {
		this.updationDate = updationDate;
	}


	public String getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	public String getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

    
	
}

package com.bookingsystem.model;

import java.util.Date;




public class StudentCourseMappingDto {
	
	private long cimId;
	
	private long userId;
	
	
    private Date bookingDate;
	
	
    private String markAttendence;
	
	
    private String comments;
	
	
    private Integer rating;
    
	
    private String insName;
	
    
    private String courseName;
	
    private Integer cPrice;
	
    
    private Date creationDate;
    
    
    private Date updationDate;

    
    private String createdBy;
    
    
    private String updatedBy;


	

	public long getCimId() {
		return cimId;
	}

	
	public void setCimId(long cimId) {
		this.cimId = cimId;
	}
	
	public String getCourseName() {
		return courseName;
	}



	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}



	public String getInsName() {
		return insName;
	}


	public void setInsName(String insName) {
		this.insName = insName;
	}


	public Integer getcPrice() {
		return cPrice;
	}


	public void setcPrice(Integer cPrice) {
		this.cPrice = cPrice;
	}


	public long getUserId() {
		return userId;
	}


	public void setUserId(long userId) {
		this.userId = userId;
	}


	public Date getBookingDate() {
		return bookingDate;
	}


	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}


	public String getMarkAttendence() {
		return markAttendence;
	}


	public void setMarkAttendence(String markAttendence) {
		this.markAttendence = markAttendence;
	}


	public String getComments() {
		return comments;
	}


	public void setComments(String comments) {
		this.comments = comments;
	}


	public Integer getRating() {
		return rating;
	}


	public void setRating(Integer rating) {
		this.rating = rating;
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

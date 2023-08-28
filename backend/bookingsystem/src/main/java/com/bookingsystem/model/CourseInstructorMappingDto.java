package com.bookingsystem.model;

import java.util.Date;




public class CourseInstructorMappingDto {

	
	private long courseId;
	
	private long userId;
	
	private long venueId;
	
    private Date classDateTime;
	
    
    private Date effectiveDate;
    
    
    private Date expiryDate;
	
    
    private Date creationDate;
    
    
    private Date updationDate;

    
    private String createdBy;
    
    
    private String updatedBy;

  
   	private long classStrength;

   	private boolean isCancel;


	public long getCourseId() {
		return courseId;
	}


	public void setCourseId(long courseId) {
		this.courseId = courseId;
	}


	public long getUserId() {
		return userId;
	}


	public void setUserId(long userId) {
		this.userId = userId;
	}

	
	public long getVenueId() {
		return venueId;
	}


	public void setVenueId(long venueId) {
		this.venueId = venueId;
	}


	public Date getClassDateTime() {
		return classDateTime;
	}


	public void setClassDateTime(Date classDateTime) {
		this.classDateTime = classDateTime;
	}


	public Date getEffectiveDate() {
		return effectiveDate;
	}


	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}


	public Date getExpiryDate() {
		return expiryDate;
	}


	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
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


	public long getClassStrength() {
		return classStrength;
	}


	public void setClassStrength(long classStrength) {
		this.classStrength = classStrength;
	}


	public boolean getIsCancel() {
		return isCancel;
	}

	public void setIsCancel(boolean isCancel) {
		this.isCancel = isCancel;
	}
    
    

}

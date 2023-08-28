package com.bookingsystem.model;

import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "course_instructor_mapping")
public class CourseInstructorMappingDao {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cimId;
	
	@Column
	private long courseId;
	
	@Column
	private long userId;
	
	@Column
	private long venueId;
	
	@Column
    private Date classDateTime;
	
    @Column
    private Date effectiveDate;
    
    @Column
    private Date expiryDate;
	
    @Column
    private Date creationDate;
    
    @Column
    private Date updationDate;

    @Column
    private String createdBy;
    
    @Column
    private String updatedBy;
    
    @Column
	private long classStrength;
    
    @Column
    private boolean isCancel;

	public long getCimId() {
		return cimId;
	}

	public void setCimId(long cimId) {
		this.cimId = cimId;
	}


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

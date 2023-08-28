package com.bookingsystem.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "student_course_mapping")
public class StudentCourseMappingDao {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long scmId;
	
	@Column
    private long cimId;
	
	@Column
	private long userId;
	
	@Column
    private Date bookingDate;
	
	@Column
    private String markAttendence;
	
	@Column
    private String insName;
	
	@Column
    private String courseName;
	
	@Column
    private Integer cPrice;
	
	@Column
    private String comments;
	
	@Column
    private Integer rating;
	
    @Column
    private Date creationDate;
    
    @Column
    private Date updationDate;

    @Column
    private String createdBy;
    
    @Column
    private String updatedBy;

	public long getScmId() {
		return scmId;
	}

	public void setScmId(long scmId) {
		this.scmId = scmId;
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

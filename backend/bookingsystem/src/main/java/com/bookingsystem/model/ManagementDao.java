package com.bookingsystem.model;

import javax.persistence.*;

@Entity
@Table(name = "management")
public class ManagementDao {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long managementId;
	
    @Column
    private Integer universityId;
    @Column
    private String email;
    
    
	public long getManagementId() {
		return managementId;
	}
	public void setManagementId(long managementId) {
		this.managementId = managementId;
	}
	public Integer getUniversityId() {
		return universityId;
	}
	public void setUniversityId(Integer universityId) {
		this.universityId = universityId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

    
}


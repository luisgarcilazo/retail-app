package com.example.retailapp.DAO;

import com.example.retailapp.entity.Role;
import com.example.retailapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends JpaRepository<Role,Long> {
}

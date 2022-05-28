import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  /**
   * Department Table Api Urls
   */
  getAllDepartments='api/v1/department';
  getDepartmentByName='api/v1/department';
  insertNewDepartment='api/v1/department';
  updateDepartmentByName='api/v1/department';
  deleteDepartmentByName='api/v1/department';

  /**
   * Instructor Table Api Urls
   */
   getAllInstructors='api/v1/instructor';
   getInstructorById='api/v1/instructor';
   insertNewInstructor='api/v1/instructor';
   updateInstructorById='api/v1/instructor';
   deleteInstructorById='api/v1/instructor';


   /**
   * Course Table Api Urls
   */
    getAllCourses='api/v1/course';
    getCourseById='api/v1/course';
    insertNewCourse='api/v1/course';
    updateCourseById='api/v1/course';
    deleteCourseById='api/v1/course';
}



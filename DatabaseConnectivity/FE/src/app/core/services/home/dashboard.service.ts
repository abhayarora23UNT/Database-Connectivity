import { Injectable } from '@angular/core';
import { Observable, timeout, map, catchError } from 'rxjs';
import { ModuleConstants } from '../../constants/constants';
import { BaseHttpService } from '../../http/base-http.service';
import { EndPointService } from '../../http/end-point.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {


    constructor(private baseHttp: BaseHttpService,
        private endpoint: EndPointService,
        private commonUtilsProvider: CommonUtilsService) {

    }

    // #region 'Department'

    /**
    * Function will get all department list
    */
    getAllDepartments(): Observable<any> {
        return this.baseHttp.get(this.endpoint.getAllDepartments)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will get all department list
    */
       getDepartmentByName(deptName:any): Observable<any> {
        return this.baseHttp.get(this.endpoint.getDepartmentByName+'/'+deptName)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Function will add new department
     * @param requestData request data
     */
    insertNewDepartment(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.insertNewDepartment, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will update department budget
    * @param requestData request data
    */
    updateDepartmentBudget(deptName:any,budgetData:any): Observable<any> {
        return this.baseHttp.put(this.endpoint.updateDepartmentByName+'/'+deptName, budgetData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will delete department
    * @param requestData request data
    */
    deleteDepartmentByName(requestData: any): Observable<any> {
        return this.baseHttp.delete(this.endpoint.deleteDepartmentByName+'/'+requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    // #endregion 'Department'


     // #region 'Instructor'

    /**
    * Function will get all instructor list
    */
     getAllInstructor(): Observable<any> {
        return this.baseHttp.get(this.endpoint.getAllInstructors)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Function will add new instructor
     * @param requestData request data
     */
    insertNewInstructor(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.insertNewInstructor, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will update instructor salary
    * @param requestData request data
    */
    updateInstructorSalary(requestData: any): Observable<any> {
        return this.baseHttp.put(this.endpoint.updateInstructorById, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will delete instructor
    * @param requestData request data
    */
    deleteInstructorById(requestData: any): Observable<any> {
        return this.baseHttp.put(this.endpoint.deleteInstructorById, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    // #endregion 'Instructor'


     // #region 'Course'

    /**
    * Function will get all Course list
    */
     getAllCourse(): Observable<any> {
        return this.baseHttp.get(this.endpoint.getAllCourses)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    /**
     * Function will add new Course
     * @param requestData request data
     */
    insertNewCourse(requestData: any): Observable<any> {
        return this.baseHttp.post(this.endpoint.insertNewCourse, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will update Course credits
    * @param requestData request data
    */
    updateInstructorCredits(requestData: any): Observable<any> {
        return this.baseHttp.put(this.endpoint.updateCourseById, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

   /**
    * Function will delete Course
    * @param requestData request data
    */
    deleteCourserById(requestData: any): Observable<any> {
        return this.baseHttp.put(this.endpoint.deleteCourseById, requestData)
            .pipe(
                timeout(ModuleConstants.apiTimeout),
                map((res) => this.commonUtilsProvider.extractData(res)),
                catchError((err) => this.commonUtilsProvider.catchError(err))
            );
    }

    // #endregion 'Instructor'
}

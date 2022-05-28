import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Constants } from 'src/app/core/constants/constants';
import { DashboardService } from 'src/app/core/services/home/dashboard.service';
import { Messages } from 'src/app/core/messages/messages';
import { ToastMessageService } from 'src/app/core/services/utils/toast-message.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  fgDepartment!: FormGroup;
  private onDestroy$: Subject<void> = new Subject<void>();
  isDataLoading = false;

  /** List of columns for different tables */

  departmentTableColumns: string[] = ['dept_name', 'building', 'budget'];
  instructorTableColumns: string[] = ['ID', 'name', 'dept_name', 'salary'];
  courseTableColumns: string[] = ['course_id', 'title', 'dept_name', 'credits'];

  dataSource = [];            // list source for tables
  tupleDataSource = [];       // row data source
  selectedTableOption = '';   // value denotes which table selected from dropdown

  public userDepartmentInput = ''; // user input to retrieve records for update
  public departmentToDelete = '';  // user input to retrieve records for delete
  public userDeptBudgetInput = ''; // new value for budget column to delete

  recordsPresentForUpdate = false; // flag denotes whether records retrieve for update
  recordsPresentForDelete = false; // flag denotes whether records retrieve for delete
 
  currentTabIndex = 0; // selected tab from tab group

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private toastService: ToastMessageService, private dialog: MatDialog) {
    this.createDepartmentFormGroup();
  }



  /**
   * Method called on page Init
   */
  ngOnInit(): void {

  }

  /**
   * Method called on page destroy
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  /**
  * Method to create initial form group
  */
  createDepartmentFormGroup() {
    this.fgDepartment = this.formBuilder.group({
      dept_name: ['', Validators.required],
      building: ['', Validators.required],
      budget: ['', Validators.required],
    });
  }


  /**
   * Method to fetch table data
   * @param tableName user selects table name from dropdown
   */
  fetchData(tableName: any) {
    switch (tableName.value) {
      case 'department':
        this.getAllDepartments();
        break;
      case 'instructor':
        this.getAllInstructor();
        break;
      case 'course':
        this.getAllCourse();
        break;
    }
  }

  /**
  * Method called to get all departments list
  */
  getAllDepartments() {
    this.isDataLoading = true;
    this.dashboardService.getAllDepartments()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.dataSource = retData.data;
          } else {
            this.toastService.errorMessage(retData.message);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }

  /**
   * Method to called to get all instructor list
   */
  getAllInstructor() {
    this.isDataLoading = true;
    this.dashboardService.getAllInstructor()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.dataSource = retData.data;
          } else {
            this.toastService.errorMessage(retData.message);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }

  /**
* Method to called to get all course list
*/
  getAllCourse() {
    this.isDataLoading = true;
    this.dashboardService.getAllCourse()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.dataSource = retData.data;
          } else {
            this.toastService.errorMessage(retData.message);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }


  /**
   * Method to insert new department record
   */
  insertDepartmentRecord() {
    if (this.fgDepartment.status == Constants.FormInvalid) {
      this.toastService.errorMessage(Messages.Mandatory_Fields_Validation);
    } else {
      const formData = this.fgDepartment.value;
      if (formData.budget == '0') {
        this.toastService.errorMessage(Messages.Budget_Min_Validation);
      } else {
        formData.budget = +formData.budget;
        const dataObj={
          "dept_name":formData.dept_name,
          "building":formData.building,
          "budget":+formData.budget,
        }
        this.callInsertDepartmentApi(dataObj);
      }

    }
  }


  /**
  * Method to called to insert new department record in database
  */
  callInsertDepartmentApi(requestData: any) {
    this.isDataLoading = true;
    this.dashboardService.insertNewDepartment(requestData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.toastService.successMessage(retData.message);
            this.fgDepartment.reset(); // clear form after submission
          } else {
            this.toastService.errorMessage(retData.message.sqlMessage);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }


  /**
   * Method to retrieve existing department record
   * @param deptInput 
   */
  retrieveDepartmentRecord(deptInput: any) {
    if (deptInput == null || deptInput == '') {
      this.toastService.errorMessage(Messages.Department_Required_Message);
    } else {
      this.getDepartmentByName(deptInput);
    }
  }

  /**
  * Method to called to get details of specific department
  */
  getDepartmentByName(deptName: any) {
    this.isDataLoading = true;
    this.updateFlag(this.currentTabIndex,false);
    this.dashboardService.getDepartmentByName(deptName)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.tupleDataSource = retData.data;
            if (retData.data!=null && retData.data.length==0) {
              this.updateFlag(this.currentTabIndex,false);
              this.toastService.infoMessage(Messages.No_Records_Message);
            } else {
              this.updateFlag(this.currentTabIndex,true);
            }
          } else {
            this.toastService.errorMessage(retData.message);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
          this.updateFlag(this.currentTabIndex,false);
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }

  /**
   * Method to update flage related to visibility of content
   * @param tabIndex current tabIndex
   * @param flagValue flag to update
   */
  updateFlag(tabIndex: any, flagValue: boolean) {
    if (tabIndex == 2) {
      this.recordsPresentForUpdate = flagValue;
    } else {
      this.recordsPresentForDelete = flagValue;
    }
  }

  /**
   * Method to update department budget
   */
  updateDepartmentRecord() {
    if (this.userDeptBudgetInput == null || this.userDeptBudgetInput == '') {
      this.toastService.errorMessage(Messages.Budget_New_Val_Validation);
    } else {
      if (this.userDeptBudgetInput == '0') {
        this.toastService.errorMessage(Messages.Budget_Min_Validation);
      } else {
        const dataObj = {
          budget: +this.userDeptBudgetInput
        }
        this.callUpdateDepartmentApi(this.userDepartmentInput, dataObj);
      }

    }
  }

  /**
  * Method called to update department budget record
  */
  callUpdateDepartmentApi(deptName: any, budgetData: any) {
    this.isDataLoading = true;
    this.dashboardService.updateDepartmentBudget(deptName, budgetData)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.toastService.successMessage(retData.message);
            this.updateFlag(this.currentTabIndex,false);
            this.userDeptBudgetInput=''; // clear previous input value
          } else {
            this.toastService.errorMessage(retData.message.sqlMessage);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }

  /**
   * Method to show delete conifirmation dialog
   */
  appDeleteConfirm() {
    const message = Messages.Dialog_Confirmation_Delete_Message;

    const dialogData = {
      title: "Confirm",
      message: message
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteDepartmentRecord(this.departmentToDelete);
      }else{
        this.departmentToDelete=''; // clear previous input value
        this.updateFlag(this.currentTabIndex,false);
        this.goToHome(); // navigate to first tab
      }
    });

  }

  /**
   * Method to delete department record
   */
  deleteDepartmentRecord(departmentName:any) {
    this.isDataLoading = true;
    this.dashboardService.deleteDepartmentByName(departmentName)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (retData: any) => {
          if (retData.status) {
            this.toastService.successMessage(retData.message);
            this.updateFlag(this.currentTabIndex,false);
          } else {
            this.toastService.errorMessage(retData.message.sqlMessage);
          }
          this.isDataLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isDataLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isDataLoading = false;
        }
      });
  }

  /**
   * Method to navigate to first tab
   */
  goToHome() {
    this.resetFlags();
    this.currentTabIndex = 0;

  }

  /**
   * Method called when user changes the tab
   * @param event 
   */
  onTabChanged(event: any) {
    console.log('++event is ' + event.index);
    this.resetFlags();
  }

  /**
   * Method to reset the flags to initial values
   */
  resetFlags() {
    this.userDepartmentInput = '';
    this.userDeptBudgetInput = '';
    this.departmentToDelete = '';
    this.recordsPresentForDelete = false;
    this.recordsPresentForUpdate = false;
    this.selectedTableOption = '';
    this.dataSource = [];
    this.tupleDataSource = [];
    this.fgDepartment.reset();
  }

}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  dialogRefConnectionTimeout: any;
  private onDestroy$: Subject<void> = new Subject<void>();


  private subscriptionRoute!: Subscription;
  constructor() {

  }

  /**
   * Desc: Method called on page initialization.
   */
  ngOnInit() {
    

  }

  /**
   * Desc:Method called on page destroy.
   */
  ngOnDestroy(): void {
    this.onDestroy$.next();

  }

  // appLogoutConfirm() {
  //   const message = `Do you want to logout?`;

  //   const dialogData = {
  //     title:"Confirm",
  //     message:message
  //   };

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: "400px",
  //     data: dialogData
  //   });

  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if(dialogResult){
  //       this.storageService.removeKeys('userName');
  //       this.storageService.removeKeys('userRole');
  //       this.router.navigate(['login']);
  //     }
  //   });
  //   // if (window.confirm('Do you want to logout?')) {
     
  //   // }
  // }

}

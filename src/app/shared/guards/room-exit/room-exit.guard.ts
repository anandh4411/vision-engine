import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RoomComponent } from 'src/app/modules/room/room.component';

@Injectable({
  providedIn: 'root',
})
export class RoomExitGuard implements CanDeactivate<RoomComponent> {
  canDeactivate(
    component: RoomComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let subject = new Subject<boolean>();
    component.open(component.exit);
    subject = component.subject;
    return subject.asObservable();
  }
}

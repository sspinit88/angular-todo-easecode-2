import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskModel} from '../models/task.model';
import {map} from 'rxjs/operators';


@Injectable()
export class JsonplaceholderService {

  private configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(
      public http: HttpClient
  ) {
  }

  addTask(task: TaskModel): Observable<any> {
    return this.http.post(this.configUrl, {
      body: task
    });
  }

  getTasks(): Observable<any> {
    return this.http.get(this.configUrl);
  }

  editTask(task): Observable<any> {
    return this.http.put(this.configUrl + task.id, {
      body: task
    });
  }

  deleteTask(id): Observable<any> {
    return this.http.delete(this.configUrl + id);
  }

  doneTask(task): Observable<any> {
    return this.http.put(this.configUrl + task.id, {
      body: task
    });
  }

  private taskSourse = new BehaviorSubject<TaskModel>({
    id: 0,
    title: '',
    userId: 0,
    completed: false
  });

  private editTaskSourse = new BehaviorSubject<TaskModel>({
    id: 0,
    title: '',
    userId: 0,
    completed: false
  });

  private updateTaskSourse = new BehaviorSubject<TaskModel>({
    id: 0,
    title: '',
    userId: 0,
    completed: false
  });

  public newTask = this.taskSourse.asObservable();

  public editTasks = this.editTaskSourse.asObservable();

  public updatingTask = this.updateTaskSourse.asObservable();

  emitNewTask(task: TaskModel) {
    this.taskSourse.next(task);
  }

  emitEditTask(task: TaskModel) {
    this.editTaskSourse.next(task);
  }

  emitUpdateTask(task: TaskModel) {
    this.updateTaskSourse.next(task);
  }

}

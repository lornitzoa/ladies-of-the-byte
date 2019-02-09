const app = angular.module('PlanApp', [])

app.controller('PlanController', ['$http', function($http){

  // create event
  this.createEvent = () => {
    $http({
      method: 'POST',
      url: '/plan',
      data: {
        title: this.title,
        date: this.date,
        location: this.location,
        image: this.image,
        tasks: this.createTaskList()
      }
    }).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  this.createTaskList = () => {
    $http({
      method: 'POST',
      url: '/todo',
      data: {
        taskName: this.taskName,
        dueDate: this.dueDate,
        notes: this.notes
      }
    })
  }

  // get event


  // update event


  // delete event


}]) // this closes PlanController

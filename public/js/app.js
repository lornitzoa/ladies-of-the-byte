const app = angular.module('PlanApp', [])

app.controller('PlanController', ['$http', function ($http) {
    const controller = this;
    this.indexOfUpdateFormToShow = null;

    this.showPlanOpts = false
    this.planID = ''
    this.todoList = []

    // create event
    this.createEvent = () => {
      $http({
        method: "POST",
        url: "/plan",
        data: {
          title: this.title,
          date: this.date,
          location: this.location,
          image: this.image
        }
      }).then(
        (res) => {
          this.plan = res.data
          this.planID = res.data._id
        },
        (err) => {
          console.log(err);
        }
      );
    };

    this.createTodo = () => {
      $http({
        method: "POST",
        url: `/todo`,
        data: {
          taskName: this.taskName,
          dueDate: this.dueDate,
          notes: this.notes
        }
      }).then(
        (res) => {
          this.todoItem = res.data
          this.addEventTodos(this.planID)
          this.todoList.push(res.data)
          console.log(this.todoList);

        },
        (err) => {
          console.log(err);
        }
      )
    }

    // add todo list items via update
    this.addEventTodos = (eventID) => {
      $http({
        method: 'PUT',
        url: '/plan/' + eventID,
        data: {
          todos: this.todoItem
        }
      }).then(
        (res) => {
          // console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      )
    },

    // update event
    this.updateEvent = function(event) {
      $http({
        method: "PUT",
        url: "/plan/" + event._id,
        data: {
          title: this.updatedTitle,
          date: this.updatedDate,
          location: this.updatedLocation,
          image: this.updatedImage
        }
      });
    };
    // delete event
    this.deleteEvent = function(event) {
      $http({
        method: "DELETE",
        url: "/plan/" + event._id
      }).then(
        function(response) {
          controller.getEvent();
        },
        function() {}
      );
    };
    // get event
    this.getEvent = function() {
      $http({
        method: "GET",
        url: "/plan"
      }).then(function(response) {
        controller.events = response.data;
      });
    };
    this.getEvent();

    // this.getTodos();

  // create user
  this.createUser = function() {
    $http({
      method: 'POST',
      url: '/users',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {
      console.log(response);
    }, function() {
      console.log('error');
    });
  }
  // user log in
  this.logIn = function() {
    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {
      console.log(response);
    }, function() {
      console.log('error');
    });
  }
  this.goApp = function() {
    $http({
      method:'GET',
      url: '/plan'
    }).then(function (response) {
        controller.loggedInUsername = response.data.username;
      }, function () {
        console.log('error');
      });
  }
}]); // this closes PlanController

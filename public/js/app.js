const app = angular.module("PlanApp", []);

app.controller("PlanController", [
  "$http",
  function($http) {
    const controller = this;

    this.showAddEventForm = false;
    this.showAddTask = false;
    this.showUpdateForm = false;
    this.showModal = false;
    this.planID = "";
    this.todoList = [];
    this.indexOfFormToShow = null;
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
        res => {
          this.plan = res.data;
          this.planID = res.data._id;
          this.title = "";
          this.date = "";
          this.location = "";
          this.image = "";
          controller.events.push(res.data);
        },
        err => {
          console.log(err);
        }
      );
    };

    this.createTodo = () => {
      $http({
        method: "POST",
        url: "/todo",
        data: {
          taskName: this.taskName,
          dueDate: this.dueDate,
          notes: this.notes
        }
      }).then(
        res => {
          this.todoItem = res.data;
          this.addEventTodos(this.planID);
          this.todoList.push(res.data);
          // clear form inputs, this is a total hack way of doing this but its the only way I found that actually worked for me
          this.taskName = "";
          this.dueDate = "";
          this.notes = "";
          // console.log(this.todoList);
        },
        err => {
          console.log(err);
        }
      );
    };

    // add todo list items via update
    this.addEventTodos = eventID => {
      $http({
        method: "PUT",
        url: "/plan/" + eventID,
        data: {
          todos: this.todoItem
        }
      }).then(
        res => {
          // console.log(res.data);
        },
        err => {
          console.log(err);
        }
      );
    };

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
        method: "POST",
        url: "/users",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(
        function(response) {
          console.log(response);
        },
        function() {
          console.log("error");
        }
      );
    };
    // user log in
    this.logIn = function() {
      $http({
        method: "POST",
        url: "/sessions",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(
        function(response) {
          console.log(response);
        },
        function() {
          console.log("error");
        }
      );
    };
  }
]); // this closes PlanController

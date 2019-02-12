const app = angular.module("PlanApp", []);

app.controller("PlanController", [
  "$http",
  function($http) {
    const controller = this;
    this.showAddEventForm = false;
    this.showAddTask = false;
    this.showUpdateForm = false;
    // global variable for planID for adding todos to plan
    this.planID = "";
    // array for todoList
    this.todoList = [];

    this.showCreateUser = false;
    this.showLogInUser = false;

    // variable to hold icon url
    this.iconURL = ''


    // allows for show/hide of icon search iconModal
    this.showIconSearch = (image) => {
      this.openIconSearchModal = true
    }

    // search icons API
    this.searchIcons = () => {
      // clears search results before repopulating
      this.iconSearchResults = []
      // console.log(this.txtSearchIcons);
      $http({
        method: 'GET',
        url: `/iconapi/${this.txtSearchIcons}`
      }).then(
        (res) => {
          // set variable for icons array for view to show
          this.icons = res.data.icons
        },
        (err) => {
          console.log(err);
        }
      )
    }

    this.sendIconToDB = (icon) => {
      // set global iconURL variable to clicked icon url
      this.iconURL = icon
      // close icon search modal
      this.openIconSearchModal = false
      // set image input to selected icon url
      this.image = this.iconURL
    }

    this.indexOfFormToShow = null;
    // create event
    this.createEvent = () => {
      // this.image = this.iconURL
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
          // set global planID variable for adding todos
          this.planID = res.data._id
          // push event into array to display
          this.events.push(res.data);
          // clear input boxes
          this.title = ''
          this.date = ''
          this.location = ''
          this.image = ''
        },
        err => {
          console.log(err);
        }
      );
    };

    // add todo item to plan todo array
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
        username: this.usernameLogIn,
        password: this.passwordLogIn
      }
    }).then(function(response) {
      console.log(response);
      controller.goApp();
    }, function() {
      console.log('error');
    });
  }
  this.goApp = function() {
    $http({
      method: 'GET',
      url: '/users'
    }).then(function (response) {
      controller.loggedInUsername = response.data.username;
      console.log(response.data);
    }, function () {
      console.log('error');
    });
  }
  this.goApp()

  this.logOut = function () {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function (response)  {
      controller.loggedInUsername = undefined;
      console.log(response);
    })
  }
}]); // this closes PlanController


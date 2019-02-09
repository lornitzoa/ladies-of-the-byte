const app = angular.module("PlanApp", []);

app.controller("PlanController", [
  "$http",
  function($http) {
    const controller = this;
    this.indexOfUpdateFormToShow = null;


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
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    };

    this.createTodo = () => {

    }


    // update event
    this.updateEvent = function(event) {
      $http({
        method: "PUT",
        url: "/plan/",
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
  }
]); // this closes PlanController

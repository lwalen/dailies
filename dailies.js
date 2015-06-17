
function save_tasks(tasks) {
   localStorage.setItem('tasks', JSON.stringify(data));
}

function load_tasks() {
   return JSON.parse(localStorage.getItem('tasks'));
}

$(function() {

   var Dailies = React.createClass({displayName: 'Dailies',
      render: function() {
         return (
            React.createElement("div", null, this.props.children)
         );
      }
   });

   var Task = React.createClass({displayName: 'Task',
      render: function() {
         return (
            React.createElement(
               "div",
               {className: "task"},
               React.createElement("div", {className: "title"}, this.props.name),
               this.props.children)
         );
      }
   });

   var Completion = React.createClass({displayName: 'Completion',
      render: function() {
         return React.createElement("div", {className: "completion " + this.props.completeness});
      }
   });


   var stored_tasks = load_tasks();

   tasks = _.map(stored_tasks, function(task, i) {

      var completions = _.map(task.completions, function(completion, j) {
         return React.createElement(Completion, {key: j, completeness: completion.complete ? "complete" : "incomplete"});
      });

      return React.createElement(Task, {name: task.name, key: i}, completions);
   });

   React.render(
      React.createElement(Dailies, {}, tasks),
      document.getElementById('dailies')
   );

});

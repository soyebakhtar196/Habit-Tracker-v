console.log('Static file is loaded');

let weeksContainer = document.querySelectorAll(".weekly__container");

function showWeeklyData() {
    for( letsingleClass of weeksContainer){
        letsingleClass.style.display = "flex";
    }
}

function showDailyData() {
    for (letsingleClass of weeksContainer) {
        letsingleClass.style.display = "none";
    }
}


function hideFlash() {
    document.getElementById('flash-msg').style.display = 'none'
}

//--------------autocomplete--------------//

var search_terms = ['Exercise', 'Meditation', 'Reading', 'Writing', 'Learning', 'Cooking', 'Gardening', 'Painting', 'Drawing', 'Playing an Instrument', 'Listening to Music', 'Dancing', 'Yoga', 'Running', 'Walking', 'Swimming', 'Cycling', 'Hiking', 'Photography', 'Traveling', 'Volunteering', 'Helping Others', 'Problem Solving', 'Critical Thinking', 'Time Management', 'Organization', 'Cleanliness', 'Mindfulness', 'Journaling', 'Goal-Setting', 'Networking', 'Reflecting', 'Gym','Cricket', 'Establishing Work-Life Balance'];

function autocompleteMatch(input) {
  if (input == '') {
    return [];
  }
  var reg = new RegExp(input)
  return search_terms.filter(function(term) {
	  if (term.match(reg)) {
  	  return term;
	  }
  });
}

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = '';
  let list = '';
  let terms = autocompleteMatch(val);
  for (i=0; i<terms.length; i++) {
    list += '<li>' + terms[i] + '</li>';
  }
  res.innerHTML = '<ul>' + list + '</ul>';
}

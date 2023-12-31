const Habit = require('../models/habit');
const User = require('../models/user')


// date to string function 
function getTodayDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let today = day + "/" + month + "/" + year;
    return today
}

// create habit controller
module.exports.createHabit = async (req, res) => {
    req.flash('success', 'well ! A new Habit');
    try {
        let habit
        let user
        try {
            // find logged in user 
            user = await User.findById(req.user._id).populate();
            // if habit exesists find it 
            habit = await Habit.findOne({ content: req.body.habit, userRef: req.user._id }).populate();
        } catch (err) {
            console.log(err)
        }

        // if habit exesist
        if (habit) {
            // dont create it 
            console.log("already exesist");
        } else {
            // if habit nor exesist | create it
            let habits = await Habit.create({
                content: req.body.habit,
                userRef: req.user._id,
                dates: { date: await getTodayDate(), complete: "none" }
            })
            // add new habit to user-> habits array
            habits.save();
        }

        // // redirect home
        return res.redirect('/');


    } catch (err) {
        console.log(err)
    }
}


//---------Dashboard Add/Remove Habit to/from Favorites----------//
module.exports.favoriteHabit = (req, res) => {
    req.flash('success', 'yeah favorite habit');
    let id = req.query.id;
    let userId = req.user._id
    Habit.findOne({
        _id: {
            $in: [
                id
            ]
        },
        userRef:userId
    })
        .then(habit => {
            habit.favorite = habit.favorite ? false : true;
            habit.save()
                .then(habit => {
                    return res.redirect('back');
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log("Error adding to favorites!");
            return;
        })
};



//---------Deleting a habit----------//
module.exports.destroyHabit = (req, res) => {
    req.flash('success', 'Deleted habit SuccessFully !');
    let id = req.query.id;
    let userId = req.user._id
    Habit.deleteMany({
        _id: {
            $in: [
                id
            ]
        },
    userRef:userId
    }, (err) => {
        if (err) {
            console.log("Error in deleting record(s)!");
        }
        else {
            return res.redirect('back');
        }
    })
};




//-------------Update status of habit completion--------------//
module.exports.statusUpdate = (req, res) => {
    req.flash('success', 'updated habit successfully!');
    var d = req.query.date;
    var id = req.query.id;
    Habit.findById(id, (err, habit) => {
        if (err) {
            console.log("Error updating status!")
        }
        else {
            let dates = habit.dates;
            let found = false;
            dates.find((item, index) => {
                if (item.date === d) {
                    if (item.complete === 'yes') {
                        item.complete = 'no';
                    }
                    else if (item.complete === 'no') {
                        item.complete = 'none'
                    }
                    else if (item.complete === 'none') {
                        item.complete = 'yes'
                    }
                    found = true;
                }
            })
            if (!found) {
                dates.push({ date: d, complete: 'yes' })
            }
            habit.dates = dates;
            habit.save()
                .then(habit => {
                    // console.log(habit);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
    })

}

//--------------autocomplete--------------//



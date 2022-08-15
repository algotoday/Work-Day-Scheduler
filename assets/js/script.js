var currentDayEl = $("#currentDay")
$(currentDayEl).text((moment().format('dddd MMMM Do')))

// checks the current time with moment and loops through each time block and checks to see if its before, the same, or after the time set to each timeblock
function auditTimeBlocks(){
    for(var i=9; i<=17; i++) {
        var timeBlock = $('#time-block-' + JSON.stringify(i))
        if (moment().isBefore(moment().hour(i))){
            $(timeBlock).removeClass("^='bg-'").addClass('bg-success')
        }
        else if (moment().isSame(moment().hour(i))){
            $(timeBlock).removeClass("^='bg-'").addClass('bg-danger')
        }
        else if (moment().isAfter(moment().hour(i))){
            $(timeBlock).removeClass("^='bg-'").addClass('bg-secondary')
        }
    }
};
// calls the auditTimeBlocks every 30 minutes
setInterval(function () {
    auditTimeBlocks();
}, (1000 * 60) * 30);


$('.time-block-div').on('click', 'button', function(){
    // Gets the value of the textarea that matches the button
    var textAreaEl = ($(this)
    .closest('.time-block-div')
    .children('textarea')
    .val())

    //gets the ID of the textarea that matches the button then calls the saveTimeBLocks function with the two variables as the parameters   
    var timeBlockId = ($(this)
    .closest('.time-block-div')
    .children('textarea')
    .attr('id'))
    saveTimeBLocks(timeBlockId, textAreaEl)
})

function saveTimeBLocks(TBI, TAE){
    var timeBlocks = JSON.parse(localStorage.getItem("timeblocks"))
    if (!timeBlocks) {
        timeBlocks = {
            timeBlocksId: [],
            textAreaVal: [] 
        }
        var TBID = timeBlocks.timeBlocksId
        var TEAEl = timeBlocks.textAreaVal
        TBID.push(TBI)
        TEAEl.push(TAE)
    }
    else{
        timeBlocks.timeBlocksId.push(TBI)
        timeBlocks.textAreaVal.push(TAE)
    }
    localStorage.setItem('timeblocks', JSON.stringify(timeBlocks));
    updateTimeBLocks();
}

function updateTimeBLocks(){
    var timeBlocks = JSON.parse(localStorage.getItem('timeblocks'))
        for(var i=0; i<timeBlocks.timeBlocksId.length; i++){
            $('#' + timeBlocks.timeBlocksId[i]).text(timeBlocks.textAreaVal[i])
        }
}

auditTimeBlocks();
updateTimeBLocks();